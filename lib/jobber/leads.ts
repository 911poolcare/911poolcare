import { serviceOptions } from "@/content/services";
import type { ContactFormData } from "@/lib/validations/contact";
import { JOBBER_LEAD_SOURCE } from "@/lib/jobber/config";
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

type ClientCreateResult = {
  clientCreate: {
    client: { id: string; name: string; jobberWebUri: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type RequestCreateResult = {
  requestCreate: {
    request: { id: string; title: string; jobberWebUri: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "Website",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "Lead",
  };
}

function getServiceLabel(serviceValue: string) {
  return (
    serviceOptions.find((option) => option.value === serviceValue)?.label ??
    "Pool service request"
  );
}

function parseLocation(cityOrZip: string) {
  const trimmed = cityOrZip.trim();
  const zipMatch = trimmed.match(/\b(\d{5})(?:-\d{4})?\b/);
  const postalCode = zipMatch?.[1];
  const city = trimmed
    .replace(/\b\d{5}(?:-\d{4})?\b/g, "")
    .replace(/,/g, " ")
    .trim();

  return {
    city: city || "Central Texas",
    province: "TX",
    country: "United States",
    postalCode,
  };
}

function buildRequestTitle(data: ContactFormData, serviceLabel: string, city: string) {
  const base = `${serviceLabel} — ${city}`;
  const message = data.message?.trim();
  if (!message) return base;
  return `${base}: ${message.slice(0, 120)}`;
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^1(\d{10})$/, "$1");
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone.trim();
}

export async function createJobberLeadFromContact(data: ContactFormData) {
  const { firstName, lastName } = splitName(data.name);
  const serviceLabel = getServiceLabel(data.service);
  const location = parseLocation(data.city);
  const requestTitle = buildRequestTitle(data, serviceLabel, location.city);
  const phone = normalizePhone(data.phone);

  const clientInput: Record<string, unknown> = {
    firstName,
    lastName,
    emails: data.email
      ? [{ address: data.email, primary: true, description: "MAIN" }]
      : undefined,
    phones: [{ number: phone, primary: true, description: "MAIN" }],
    billingAddress: {
      street1: "Address to be confirmed",
      city: location.city,
      province: location.province,
      country: location.country,
      ...(location.postalCode ? { postalCode: location.postalCode } : {}),
    },
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

  const requestInput: Record<string, unknown> = {
    clientId: client.id,
    title: requestTitle,
    source: JOBBER_LEAD_SOURCE,
    phone,
    ...(data.email ? { email: data.email } : {}),
    property: {
      addressAttributes: {
        street1: "Address to be confirmed",
        city: location.city,
        province: location.province,
        country: location.country,
        ...(location.postalCode ? { postalCode: location.postalCode } : {}),
      },
    },
  };

  const requestResult = await jobberGraphql<RequestCreateResult>(
    CREATE_REQUEST_MUTATION,
    { input: requestInput },
  );

  const requestErrors = formatUserErrors(requestResult.requestCreate.userErrors);
  if (requestErrors) {
    // Client was created — log but don't fail the form submission entirely.
    console.error("[Jobber] requestCreate userErrors:", requestErrors);
  }

  return {
    clientId: client.id,
    clientUri: client.jobberWebUri,
    requestId: requestResult.requestCreate.request?.id ?? null,
    requestUri: requestResult.requestCreate.request?.jobberWebUri ?? null,
  };
}
