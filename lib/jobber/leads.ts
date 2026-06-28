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
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const REQUEST_EDIT_MUTATION = `
  mutation LinkWebsiteLeadRequestProperty($input: RequestEditInput!) {
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

type ClientCreateResult = {
  clientCreate: {
    client: { id: string; name: string; jobberWebUri: string } | null;
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

type CreatedRequest = NonNullable<RequestCreateResult["requestCreate"]["request"]>;

const SERVICE_SHORT_LABELS: Record<string, string> = {
  "leak-detection": "Leak",
  renovation: "Renovation",
  "equipment-repair": "Equipment",
  inspection: "Inspection",
  "pool-company-partner": "Partner",
  other: "Other",
};

const REQUEST_SOURCE = "911 Pool Care Website";

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

function buildRequestInputBase(clientId: string, title: string) {
  return { clientId, title };
}

function buildRequestInputWithDetails(
  clientId: string,
  title: string,
  instructions: string,
) {
  return {
    clientId,
    title,
    source: REQUEST_SOURCE,
    assessment: { instructions },
  };
}

async function tryCreateRequest(
  input: Record<string, unknown>,
  label: string,
): Promise<CreatedRequest | null> {
  try {
    const result = await jobberGraphql<RequestCreateResult>(
      CREATE_REQUEST_MUTATION,
      { input },
    );

    const errors = formatUserErrors(result.requestCreate.userErrors);
    if (errors) {
      console.warn(`[Jobber] requestCreate (${label}):`, errors);
      return null;
    }

    return result.requestCreate.request;
  } catch (error) {
    console.warn(`[Jobber] requestCreate (${label}):`, error);
    return null;
  }
}

async function linkRequestProperty(requestId: string, propertyId: string) {
  const variants: Record<string, unknown>[] = [
    { requestId, propertyId },
    { id: requestId, propertyId },
    { requestId, property: { id: propertyId } },
  ];

  for (const input of variants) {
    try {
      const result = await jobberGraphql<RequestEditResult>(
        REQUEST_EDIT_MUTATION,
        { input },
      );

      const errors = formatUserErrors(result.requestEdit.userErrors);
      if (errors) {
        console.warn("[Jobber] requestEdit (link property):", errors);
        continue;
      }

      if (result.requestEdit.request?.property?.id) {
        return true;
      }
    } catch (error) {
      console.warn("[Jobber] requestEdit (link property):", error);
    }
  }

  return false;
}

async function createRequestWithProperty(
  clientId: string,
  title: string,
  address: JobberAddressInput,
  instructions: string,
  propertyId: string | null,
) {
  const bases = [
    {
      input: buildRequestInputWithDetails(clientId, title, instructions),
      label: "detailed",
    },
    {
      input: buildRequestInputBase(clientId, title),
      label: "minimal",
    },
  ];

  for (const { input: base, label: baseLabel } of bases) {
    if (propertyId) {
      const withPropertyId = await tryCreateRequest(
        { ...base, propertyId },
        `${baseLabel}/propertyId`,
      );
      if (withPropertyId?.property?.id) return withPropertyId;

      const withPropertyRef = await tryCreateRequest(
        { ...base, property: { id: propertyId } },
        `${baseLabel}/property.id`,
      );
      if (withPropertyRef) {
        if (!withPropertyRef.property?.id) {
          await linkRequestProperty(withPropertyRef.id, propertyId);
        }
        return withPropertyRef;
      }
    }

    const withAddressAttributes = await tryCreateRequest(
      { ...base, property: { addressAttributes: address } },
      `${baseLabel}/property.addressAttributes`,
    );
    if (withAddressAttributes?.property?.id) return withAddressAttributes;

    const withInlineAddress = await tryCreateRequest(
      { ...base, property: { address } },
      `${baseLabel}/property.address`,
    );
    if (withInlineAddress?.property?.id) return withInlineAddress;

    const fallback = await tryCreateRequest(base, `${baseLabel}/title only`);
    if (fallback) {
      if (propertyId && !fallback.property?.id) {
        await linkRequestProperty(fallback.id, propertyId);
      }
      return fallback;
    }
  }

  throw new Error("Jobber requestCreate failed for all property strategies");
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

  const propertyId = await createClientProperty(client.id, address);

  const request = await createRequestWithProperty(
    client.id,
    requestTitle,
    address,
    requestNote,
    propertyId,
  );

  if (!request) {
    throw new Error("Jobber requestCreate returned no request");
  }

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
