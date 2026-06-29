import { referralSourceOptions } from "@/content/contact-form";
import { serviceOptions } from "@/content/services";
import type { ContactFormData } from "@/lib/validations/contact";
import {
  findOrCreateWebsiteClient,
  resolveServicePropertyId,
} from "@/lib/jobber/clients";
import {
  buildClientCustomFieldInputs,
  getJobberClientCustomFieldIds,
  logMissingCustomFieldSetup,
} from "@/lib/jobber/custom-fields";
import { JOBBER_LEAD_SOURCE } from "@/lib/jobber/config";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import { attachLeadNotes } from "@/lib/jobber/notes";
import type { JobberAddressInput } from "@/lib/jobber/property";
import { buildRequestDetailsInput } from "@/lib/jobber/request-form";

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
      }
      userErrors {
        message
        path
      }
    }
  }
`;

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
  data: ContactFormData,
) {
  const baseInput: Record<string, unknown> = { clientId, title };
  if (propertyId) {
    baseInput.propertyId = propertyId;
  }

  const requestDetails = buildRequestDetailsInput(data);
  const inputs: Record<string, unknown>[] = requestDetails
    ? [{ ...baseInput, requestDetails }, baseInput]
    : [baseInput];

  let lastErrors: string | null = null;

  for (const input of inputs) {
    const result = await jobberGraphql<RequestCreateResult>(CREATE_REQUEST_MUTATION, {
      input,
    });

    const errors = formatUserErrors(result.requestCreate.userErrors);
    if (!errors) {
      const request = result.requestCreate.request;
      if (!request) {
        throw new Error("Jobber requestCreate returned no request");
      }
      if (input !== inputs[0]) {
        console.warn(
          "[Jobber] requestCreate succeeded without requestDetails — Service Details will be empty",
          { lastErrors },
        );
      } else if (input.requestDetails) {
        console.info("[Jobber] requestCreate included requestDetails + propertyId");
      }
      return request;
    }

    lastErrors = errors;
    if (!input.requestDetails) {
      break;
    }
    console.warn("[Jobber] requestCreate with requestDetails failed:", errors);
  }

  throw new Error(`Jobber requestCreate failed: ${lastErrors ?? "unknown error"}`);
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

  const { client, created } = await findOrCreateWebsiteClient({
    email: data.email,
    clientInput,
    address,
  });

  const propertyId = await resolveServicePropertyId(client, address, created);

  const request = await createRequest(
    client.id,
    propertyId,
    requestTitle,
    data,
  );

  void attachLeadNotes({
    clientId: client.id,
    requestId: request.id,
    message: requestNote,
  }).catch((error) => {
    console.warn("[Jobber] attachLeadNotes:", error);
  });

  console.info("[Jobber] Lead created", {
    clientId: client.id,
    requestId: request.id,
    propertyId: request.property?.id ?? propertyId,
    reusedClient: !created,
  });

  return {
    clientId: client.id,
    clientUri: client.jobberWebUri,
    requestId: request.id,
    requestUri: request.jobberWebUri,
    propertyId: request.property?.id ?? propertyId,
  };
}
