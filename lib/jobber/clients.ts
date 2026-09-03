import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import type { JobberAddressInput } from "@/lib/jobber/property";
import { createClientProperty } from "@/lib/jobber/property";

const FIND_CLIENTS_BY_SEARCH = `
  query FindWebsiteLeadClient($search: String!) {
    clients(first: 10, filter: { search: $search }) {
      nodes {
        id
        name
        companyName
        jobberWebUri
        emails {
          address
          primary
        }
        clientProperties(first: 10) {
          nodes {
            id
            address {
              street1
              city
              province
              postalCode
            }
          }
        }
      }
    }
  }
`;

const CREATE_CLIENT_MUTATION = `
  mutation CreateWebsiteLeadClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client {
        id
        name
        jobberWebUri
        properties {
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

const EDIT_CLIENT_MUTATION = `
  mutation EditWebsiteLeadClient($clientId: EncodedId!, $input: ClientEditInput!) {
    clientEdit(clientId: $clientId, input: $input) {
      client {
        id
      }
      userErrors {
        message
        path
      }
    }
  }
`;

type ClientRecord = {
  id: string;
  name: string;
  jobberWebUri: string;
  properties: Array<{
    id: string;
    address: {
      street1: string;
      city: string;
      province: string;
      postalCode: string;
    };
  }>;
};

function toClientRecord(client: {
  id: string;
  name: string;
  jobberWebUri: string;
  properties?: Array<{
    id: string;
    address: {
      street1: string;
      city: string;
      province: string;
      postalCode: string;
    };
  }>;
  clientProperties?: {
    nodes: Array<{
      id: string;
      address: {
        street1: string;
        city: string;
        province: string;
        postalCode: string;
      };
    }>;
  };
}): ClientRecord {
  const properties =
    client.properties ??
    client.clientProperties?.nodes ??
    [];

  return {
    id: client.id,
    name: client.name,
    jobberWebUri: client.jobberWebUri,
    properties,
  };
}

type FindClientResult = {
  clients: {
    nodes: Array<{
      id: string;
      name: string;
      companyName: string | null;
      jobberWebUri: string;
      emails: Array<{ address: string; primary: boolean }>;
      clientProperties: {
        nodes: Array<{
          id: string;
          address: {
            street1: string;
            city: string;
            province: string;
            postalCode: string;
          };
        }>;
      };
    }>;
  };
};

type ClientCreateResult = {
  clientCreate: {
    client: {
      id: string;
      name: string;
      jobberWebUri: string;
      properties: Array<{
        id: string;
        address: {
          street1: string;
          city: string;
          province: string;
          postalCode: string;
        };
      }>;
    } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type ClientEditResult = {
  clientEdit: {
    client: { id: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

function clientMatchesName(
  client: { name: string; companyName: string | null },
  search: string,
) {
  const normalized = normalizeName(search);
  if (normalizeName(client.name) === normalized) {
    return true;
  }
  const company = client.companyName?.trim();
  return company ? normalizeName(company) === normalized : false;
}

function addressesMatch(
  left: JobberAddressInput,
  right: {
    street1: string;
    city: string;
    province: string;
    postalCode: string;
  },
) {
  return (
    left.street1.trim().toLowerCase() === right.street1.trim().toLowerCase() &&
    left.city.trim().toLowerCase() === right.city.trim().toLowerCase() &&
    left.province.trim().toUpperCase() === right.province.trim().toUpperCase() &&
    left.postalCode.trim() === right.postalCode.trim()
  );
}

function pickPropertyId(
  properties: Array<{
    id: string;
    address: {
      street1: string;
      city: string;
      province: string;
      postalCode: string;
    };
  }>,
  address: JobberAddressInput,
) {
  const exact = properties.find((property) => addressesMatch(address, property.address));
  return exact?.id ?? properties[0]?.id ?? null;
}

export async function findClientByEmail(email: string): Promise<ClientRecord | null> {
  const normalized = normalizeEmail(email);

  try {
    const result = await jobberGraphql<FindClientResult>(FIND_CLIENTS_BY_SEARCH, {
      search: normalized,
    });

    const match = result.clients.nodes.find((client) =>
      client.emails.some(
        (entry) => normalizeEmail(entry.address) === normalized,
      ),
    );

    if (!match) {
      return null;
    }

    return toClientRecord(match);
  } catch (error) {
    console.warn("[Jobber] findClientByEmail:", error);
    return null;
  }
}

function splitReferringName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(" "),
    };
  }
  return {
    firstName: name.trim(),
    lastName: "Referral",
  };
}

/** Creates a Jobber client so Referred By can link to a partner or person. */
export async function createReferringClient(options: {
  name: string;
  isCompany: boolean;
}): Promise<ClientRecord | null> {
  const name = options.name.trim();
  if (!name) {
    return null;
  }

  const { firstName, lastName } = splitReferringName(name);
  const input: Record<string, unknown> = options.isCompany
    ? {
        firstName,
        lastName,
        companyName: name,
        isCompany: true,
      }
    : {
        firstName,
        lastName,
      };

  try {
    const result = await jobberGraphql<ClientCreateResult>(CREATE_CLIENT_MUTATION, {
      input,
    });
    const errors = formatUserErrors(result.clientCreate.userErrors);
    if (errors || !result.clientCreate.client) {
      console.warn("[Jobber] createReferringClient:", errors ?? "no client");
      return null;
    }
    return toClientRecord(result.clientCreate.client);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (options.isCompany && /isCompany/i.test(message)) {
      delete input.isCompany;
      try {
        const retry = await jobberGraphql<ClientCreateResult>(CREATE_CLIENT_MUTATION, {
          input,
        });
        const retryErrors = formatUserErrors(retry.clientCreate.userErrors);
        if (retryErrors || !retry.clientCreate.client) {
          console.warn("[Jobber] createReferringClient:", retryErrors ?? "no client");
          return null;
        }
        return toClientRecord(retry.clientCreate.client);
      } catch (retryError) {
        console.warn("[Jobber] createReferringClient:", retryError);
        return null;
      }
    }
    console.warn("[Jobber] createReferringClient:", error);
    return null;
  }
}

export async function findClientByName(name: string): Promise<ClientRecord | null> {
  const trimmed = name.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const result = await jobberGraphql<FindClientResult>(FIND_CLIENTS_BY_SEARCH, {
      search: trimmed,
    });

    const match = result.clients.nodes.find((client) =>
      clientMatchesName(client, trimmed),
    );

    if (!match) {
      return null;
    }

    return toClientRecord(match);
  } catch (error) {
    console.warn("[Jobber] findClientByName:", error);
    return null;
  }
}

export async function findOrCreateWebsiteClient(options: {
  email: string;
  clientInput: Record<string, unknown>;
  address: JobberAddressInput;
}): Promise<{ client: ClientRecord; created: boolean }> {
  const existing = await findClientByEmail(options.email);
  if (existing) {
    return { client: existing, created: false };
  }

  const clientResult = await jobberGraphql<ClientCreateResult>(
    CREATE_CLIENT_MUTATION,
    { input: options.clientInput },
  );

  const clientErrors = formatUserErrors(clientResult.clientCreate.userErrors);
  if (clientErrors) {
    throw new Error(`Jobber clientCreate failed: ${clientErrors}`);
  }

  const client = clientResult.clientCreate.client;
  if (!client) {
    throw new Error("Jobber clientCreate returned no client");
  }

  return {
    client: toClientRecord(client),
    created: true,
  };
}

/** Best-effort client edit — does not fail the lead if Jobber rejects the change. */
export async function editClient(
  clientId: string,
  input: Record<string, unknown>,
): Promise<boolean> {
  try {
    const result = await jobberGraphql<ClientEditResult>(EDIT_CLIENT_MUTATION, {
      clientId,
      input,
    });
    const errors = formatUserErrors(result.clientEdit.userErrors);
    if (errors || !result.clientEdit.client) {
      console.warn("[Jobber] clientEdit:", errors ?? "no client returned");
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Jobber] clientEdit:", error);
    return false;
  }
}

/** Best-effort custom field write — does not fail the lead if Jobber rejects the edit. */
export async function editClientCustomFields(
  clientId: string,
  fields: Array<{ id: string; valueText: string }>,
): Promise<boolean> {
  if (!fields.length) return true;

  const attempts = [
    fields.map((field) => ({
      customFieldConfigurationId: field.id,
      valueText: field.valueText,
    })),
    fields.map((field) => ({
      id: field.id,
      valueText: field.valueText,
    })),
  ];

  let lastErrors: string | null = null;

  for (const customFields of attempts) {
    try {
      const result = await jobberGraphql<ClientEditResult>(EDIT_CLIENT_MUTATION, {
        clientId,
        input: { customFields },
      });

      const errors = formatUserErrors(result.clientEdit.userErrors);
      if (!errors && result.clientEdit.client) {
        return true;
      }
      lastErrors = errors ?? "no client returned";
    } catch (error) {
      lastErrors = error instanceof Error ? error.message : "unknown error";
    }
  }

  console.warn("[Jobber] clientEdit custom fields failed:", lastErrors);
  return false;
}

export async function resolveServicePropertyId(
  client: ClientRecord,
  address: JobberAddressInput,
  createdClient: boolean,
): Promise<string | null> {
  const existingMatch = pickPropertyId(client.properties, address);
  if (existingMatch) {
    return existingMatch;
  }

  if (createdClient && client.properties[0]?.id) {
    return client.properties[0].id;
  }

  return createClientProperty(client.id, address);
}
