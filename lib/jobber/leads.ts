import { referralSourceOptions } from "@/content/contact-form";
import { serviceOptions } from "@/content/services";
import type { ContactFormData } from "@/lib/validations/contact";
import {
  buildClientCustomFieldInputs,
  getJobberClientCustomFieldIds,
  logMissingCustomFieldSetup,
} from "@/lib/jobber/custom-fields";
import { JOBBER_LEAD_SOURCE } from "@/lib/jobber/config";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import { attachLeadNotes } from "@/lib/jobber/notes";
import {
  createClientProperty,
  type JobberAddressInput,
} from "@/lib/jobber/property";

const CREATE_CLIENT_MUTATION = `
  mutation CreateWebsiteLeadClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client {
        id
        name
        jobberWebUri
        properties(first: 1) {
          nodes {
            id
          }
        }
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
          address {
            street1
            city
            province
            postalCode
          }
        }
        assessment {
          instructions
        }
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
    client: {
      id: string;
      name: string;
      jobberWebUri: string;
      properties: { nodes: Array<{ id: string }> };
    } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type RequestCreateResult = {
  requestCreate: {
    request: {
      id: string;
      title: string;
      jobberWebUri: string;
      property: {
        id: string;
        address: {
          street1: string;
          city: string;
          province: string;
          postalCode: string;
        };
      } | null;
      assessment: { instructions: string | null } | null;
    } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
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

function buildAddress(data: ContactFormData): JobberAddressInput {
  return {
    street1: data.street.trim(),
    city: data.city.trim(),
    province: data.state.trim().toUpperCase(),
    postalCode: data.zip.trim(),
    country: "United States",
  };
}

function formatAddressLine(address: JobberAddressInput) {
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
  const address = buildAddress(data);
  const location = `${address.city}, ${address.province}`;
  const partner = data.referringPartnerCompany?.trim();
  const base = `${services} — ${location}`;
  const title = partner ? `[${partner}] ${base}` : base;
  return title.slice(0, 255);
}

function buildRequestNote(data: ContactFormData, serviceLabels: string[]) {
  const lines = [
    `Website lead — submitted via ${JOBBER_LEAD_SOURCE}`,
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

async function createRequest(
  clientId: string,
  propertyId: string | null,
  title: string,
  instructions: string,
) {
  const input: Record<string, unknown> = {
    clientId,
    title,
    assessment: { instructions },
  };

  if (propertyId) {
    input.propertyId = propertyId;
  }

  const result = await jobberGraphql<RequestCreateResult>(CREATE_REQUEST_MUTATION, {
    input,
  });

  const errors = formatUserErrors(result.requestCreate.userErrors);
  if (errors) {
    throw new Error(`Jobber requestCreate failed: ${errors}`);
  }

  const request = result.requestCreate.request;
  if (!request) {
    throw new Error("Jobber requestCreate returned no request");
  }

  return request;
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
    properties: [{ address }],
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

  let propertyId: string | null = client.properties.nodes[0]?.id ?? null;
  if (!propertyId) {
    propertyId = await createClientProperty(client.id, address);
  }

  const request = await createRequest(
    client.id,
    propertyId,
    requestTitle,
    requestNote,
  );

  await attachLeadNotes({
    clientId: client.id,
    requestId: request.id,
    message: requestNote,
  });

  return {
    clientId: client.id,
    clientUri: client.jobberWebUri,
    requestId: request.id,
    requestUri: request.jobberWebUri,
    propertyId: request.property?.id ?? propertyId,
  };
}
