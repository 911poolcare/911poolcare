import { referralSourceOptions } from "@/content/contact-form";
import { serviceOptions } from "@/content/services";
import type { ContactFormData } from "@/lib/validations/contact";
import {
  buildClientCustomFieldInputs,
  getJobberClientCustomFieldIds,
  logMissingCustomFieldSetup,
} from "@/lib/jobber/custom-fields";
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
    request: {
      id: string;
      title: string;
      jobberWebUri: string;
      property: { id: string } | null;
    } | null;
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

const SERVICE_SHORT_LABELS: Record<string, string> = {
  "leak-detection": "Leak",
  renovation: "Renovation",
  "equipment-repair": "Equipment",
  inspection: "Inspection",
  "pool-company-partner": "Partner",
  other: "Other",
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

function buildRequestTitle(data: ContactFormData, serviceValues: string[]) {
  const shortLabels = serviceValues.map(
    (value) => SERVICE_SHORT_LABELS[value] ?? value,
  );
  const services =
    shortLabels.length <= 3
      ? shortLabels.join(" + ")
      : `${shortLabels.length} services`;
  const cityState = `${data.city.trim()}, ${data.state.trim().toUpperCase()}`;
  const partner = data.referringPartnerCompany?.trim();
  const base = `${services} — ${cityState}`;
  const title = partner ? `[${partner}] ${base}` : base;
  return title.slice(0, 120);
}

function buildRequestNote(data: ContactFormData, serviceLabels: string[]) {
  const lines = [
    "Website lead — submitted via 911poolcare.com",
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

  const partner = data.referringPartnerCompany?.trim();
  if (partner) {
    lines.push("", `Referring partner: ${partner}`);
  }

  if (data.message.trim()) {
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

async function createServiceProperty(clientId: string, address: AddressInput) {
  const propertyResult = await jobberGraphql<PropertyCreateResult>(
    CREATE_PROPERTY_MUTATION,
    {
      input: {
        clientId,
        address,
      },
    },
  );

  const propertyErrors = formatUserErrors(
    propertyResult.propertyCreate.userErrors,
  );
  if (propertyErrors) {
    throw new Error(`Jobber propertyCreate failed: ${propertyErrors}`);
  }

  const property = propertyResult.propertyCreate.property;
  if (!property) {
    throw new Error("Jobber propertyCreate returned no property");
  }

  return property;
}

async function linkRequestProperty(requestId: string, propertyId: string) {
  const editResult = await jobberGraphql<RequestEditResult>(EDIT_REQUEST_MUTATION, {
    input: {
      requestId,
      propertyId,
    },
  });

  const editErrors = formatUserErrors(editResult.requestEdit.userErrors);
  if (editErrors) {
    throw new Error(`Jobber requestEdit failed: ${editErrors}`);
  }

  return editResult.requestEdit.request?.property?.id ?? null;
}

export async function createJobberLeadFromContact(data: ContactFormData) {
  const { firstName, lastName } = splitName(data.name);
  const serviceLabels = getServiceLabels(data.services);
  const referralLabel = getReferralLabel(data);
  const address = buildAddress(data);
  const requestTitle = buildRequestTitle(data, data.services);
  const requestNote = buildRequestNote(data, serviceLabels);
  const phone = normalizePhone(data.phone);

  const customFieldIds = await getJobberClientCustomFieldIds();
  logMissingCustomFieldSetup(customFieldIds);

  const customFields = buildClientCustomFieldInputs(
    customFieldIds,
    serviceLabels,
    referralLabel,
  );

  const clientInput: Record<string, unknown> = {
    firstName,
    lastName,
    emails: [{ address: data.email, primary: true, description: "MAIN" }],
    phones: [{ number: phone, primary: true, description: "MAIN" }],
    billingAddress: address,
  };

  if (customFields.length) {
    clientInput.customFields = customFields;
  }

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

  const property = await createServiceProperty(client.id, address);

  const requestInput: Record<string, unknown> = {
    clientId: client.id,
    title: requestTitle,
    propertyId: property.id,
  };

  let requestResult = await jobberGraphql<RequestCreateResult>(
    CREATE_REQUEST_MUTATION,
    { input: requestInput },
  );

  let requestErrors = formatUserErrors(requestResult.requestCreate.userErrors);
  if (requestErrors?.toLowerCase().includes("property")) {
    requestResult = await jobberGraphql<RequestCreateResult>(
      CREATE_REQUEST_MUTATION,
      {
        input: {
          clientId: client.id,
          title: requestTitle,
        },
      },
    );
    requestErrors = formatUserErrors(requestResult.requestCreate.userErrors);
  }

  if (requestErrors) {
    throw new Error(`Jobber requestCreate failed: ${requestErrors}`);
  }

  const request = requestResult.requestCreate.request;
  if (!request) {
    throw new Error("Jobber requestCreate returned no request");
  }

  let linkedPropertyId = request.property?.id ?? null;
  if (!linkedPropertyId) {
    linkedPropertyId = await linkRequestProperty(request.id, property.id);
  }

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
    throw new Error(`Jobber requestEditNote failed: ${noteErrors}`);
  }

  return {
    clientId: client.id,
    clientUri: client.jobberWebUri,
    requestId: request.id,
    requestUri: request.jobberWebUri,
    propertyId: linkedPropertyId ?? property.id,
  };
}
