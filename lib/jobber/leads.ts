import { referralSourceOptions } from "@/content/contact-form";
import { serviceOptions } from "@/content/services";
import type { ContactFormData } from "@/lib/validations/contact";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";

const CREATE_CLIENT_MUTATION = `
  mutation CreateWebsiteLeadClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client {
        id
        name
        jobberWebUri
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const CREATE_PROPERTY_MUTATION = `
  mutation CreateWebsiteLeadProperty($input: PropertyCreateInput!) {
    propertyCreate(input: $input) {
      property {
        id
        jobberWebUri
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const CREATE_REQUEST_MUTATION = `
  mutation CreateWebsiteLeadRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request {
        id
        title
        jobberWebUri
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const EDIT_REQUEST_MUTATION = `
  mutation EditWebsiteLeadRequest($input: RequestEditInput!) {
    requestEdit(input: $input) {
      request {
        id
        property {
          id
        }
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const EDIT_REQUEST_NOTE_MUTATION = `
  mutation EditWebsiteLeadRequestNote($input: RequestEditNoteInput!) {
    requestEditNote(input: $input) {
      request {
        id
      }
      userErrors {
        message
        path
      }
    }
  }
`;

type ClientCreateResult = {
  clientCreate: {
    client: { id: string; name: string; jobberWebUri: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type PropertyCreateResult = {
  propertyCreate: {
    property: { id: string; jobberWebUri: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type RequestCreateResult = {
  requestCreate: {
    request: { id: string; title: string; jobberWebUri: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type RequestEditResult = {
  requestEdit: {
    request: { id: string; property: { id: string } | null } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type RequestEditNoteResult = {
  requestEditNote: {
    request: { id: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type AddressInput = {
  street1: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "Website",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "Lead",
  };
}

function getServiceLabels(serviceValues: string[]) {
  return serviceValues.map((value) => {
    return (
      serviceOptions.find((option) => option.value === value)?.label ??
      "Pool service request"
    );
  });
}

function getReferralLabel(data: ContactFormData) {
  if (!data.referralSource) return null;
  if (data.referralSource === "other") {
    return data.referralSourceOther?.trim() || "Other";
  }
  return (
    referralSourceOptions.find((option) => option.value === data.referralSource)
      ?.label ?? data.referralSource
  );
}

function buildAddress(data: ContactFormData): AddressInput {
  return {
    street1: data.street.trim(),
    city: data.city.trim(),
    province: data.state.trim().toUpperCase(),
    postalCode: data.zip.trim(),
    country: "United States",
  };
}

function formatAddressLine(address: AddressInput) {
  return `${address.street1}, ${address.city}, ${address.province} ${address.postalCode}`;
}

function buildRequestTitle(data: ContactFormData, serviceLabels: string[]) {
  const address = buildAddress(data);
  const services =
    serviceLabels.length <= 2
      ? serviceLabels.join(" + ")
      : `${serviceLabels.length} services requested`;
  return `${services} | ${formatAddressLine(address)}`.slice(0, 255);
}

function buildRequestNote(data: ContactFormData, serviceLabels: string[]) {
  const lines = [
    "Website contact form submission",
    "",
    "Services requested:",
    ...serviceLabels.map((label) => `- ${label}`),
    "",
    `Service address: ${formatAddressLine(buildAddress(data))}`,
  ];

  const referral = getReferralLabel(data);
  if (referral) {
    lines.push("", `How they found us: ${referral}`);
  }

  if (data.message?.trim()) {
    lines.push("", "Customer message:", data.message.trim());
  }

  if (data.attachments?.length) {
    lines.push("", "Photos / videos:");
    for (const attachment of data.attachments) {
      lines.push(`- ${attachment.name}: ${attachment.url}`);
    }
  }

  return lines.join("\n");
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^1(\d{10})$/, "$1");
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone.trim();
}

async function tryJobberStep(label: string, action: () => Promise<void>) {
  try {
    await action();
  } catch (error) {
    console.error(`[Jobber] ${label}:`, error);
  }
}

export async function createJobberLeadFromContact(data: ContactFormData) {
  const { firstName, lastName } = splitName(data.name);
  const serviceLabels = getServiceLabels(data.services);
  const address = buildAddress(data);
  const requestTitle = buildRequestTitle(data, serviceLabels);
  const requestNote = buildRequestNote(data, serviceLabels);
  const phone = normalizePhone(data.phone);

  const clientInput: Record<string, unknown> = {
    firstName,
    lastName,
    emails: [{ address: data.email, primary: true, description: "MAIN" }],
    phones: [{ number: phone, primary: true, description: "MAIN" }],
    billingAddress: address,
  };

  const clientResult = await jobberGraphql<ClientCreateResult>(
    CREATE_CLIENT_MUTATION,
    { input: clientInput },
  );

  const clientErrors = formatUserErrors(clientResult.clientCreate.userErrors);
  if (clientErrors) {
    throw new Error(`Jobber clientCreate failed: ${clientErrors}`);
  }

  const client = clientResult.clientCreate.client;
  if (!client) {
    throw new Error("Jobber clientCreate returned no client");
  }

  let propertyId: string | null = null;

  await tryJobberStep("propertyCreate", async () => {
    const propertyResult = await jobberGraphql<PropertyCreateResult>(
      CREATE_PROPERTY_MUTATION,
      {
        input: {
          clientId: client.id,
          address,
        },
      },
    );

    const propertyErrors = formatUserErrors(
      propertyResult.propertyCreate.userErrors,
    );
    if (propertyErrors) {
      throw new Error(propertyErrors);
    }

    propertyId = propertyResult.propertyCreate.property?.id ?? null;
  });

  const requestResult = await jobberGraphql<RequestCreateResult>(
    CREATE_REQUEST_MUTATION,
    {
      input: {
        clientId: client.id,
        title: requestTitle,
      },
    },
  );

  const requestErrors = formatUserErrors(requestResult.requestCreate.userErrors);
  if (requestErrors) {
    throw new Error(`Jobber requestCreate failed: ${requestErrors}`);
  }

  const request = requestResult.requestCreate.request;
  if (!request) {
    throw new Error("Jobber requestCreate returned no request");
  }

  if (propertyId) {
    await tryJobberStep("requestEdit property", async () => {
      const editResult = await jobberGraphql<RequestEditResult>(
        EDIT_REQUEST_MUTATION,
        {
          input: {
            requestId: request.id,
            propertyId,
          },
        },
      );

      const editErrors = formatUserErrors(editResult.requestEdit.userErrors);
      if (editErrors) {
        throw new Error(editErrors);
      }
    });
  }

  await tryJobberStep("requestEditNote", async () => {
    const noteResult = await jobberGraphql<RequestEditNoteResult>(
      EDIT_REQUEST_NOTE_MUTATION,
      {
        input: {
          requestId: request.id,
          message: requestNote,
        },
      },
    );

    const noteErrors = formatUserErrors(noteResult.requestEditNote.userErrors);
    if (noteErrors) {
      throw new Error(noteErrors);
    }
  });

  return {
    clientId: client.id,
    clientUri: client.jobberWebUri,
    requestId: request.id,
    requestUri: request.jobberWebUri,
    propertyId,
  };
}
