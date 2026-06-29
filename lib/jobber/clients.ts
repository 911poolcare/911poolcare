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
