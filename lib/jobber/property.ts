import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";

export type JobberAddressInput = {
  street1: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

const PROPERTY_CREATE_MUTATION = `
  mutation CreateWebsiteLeadProperty($input: PropertyCreateInput!) {
    propertyCreate(input: $input) {
      property {
        id
        address {
          street1
          city
          province
          postalCode
        }
      }
      userErrors {
        message
        path
      }
    }
  }
`;

type PropertyCreateResult = {
  propertyCreate: {
    property: { id: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

export type PropertyCreateAttempt = {
  label: string;
  propertyId: string | null;
  error: string | null;
};

/** Creates a service property on the client. Tries common input shapes. */
export async function createClientProperty(
  clientId: string,
  address: JobberAddressInput,
): Promise<{ propertyId: string | null; attempts: PropertyCreateAttempt[] }> {
  const variants: Array<{ label: string; input: Record<string, unknown> }> = [
    { label: "address", input: { clientId, address } },
    {
      label: "properties",
      input: { clientId, properties: [{ address }] },
    },
  ];

  const attempts: PropertyCreateAttempt[] = [];

  for (const { label, input } of variants) {
    try {
      const result = await jobberGraphql<PropertyCreateResult>(
        PROPERTY_CREATE_MUTATION,
        { input },
      );

      const errors = formatUserErrors(result.propertyCreate.userErrors);
      const propertyId = result.propertyCreate.property?.id ?? null;

      attempts.push({
        label,
        propertyId,
        error: errors,
      });

      if (propertyId) {
        return { propertyId, attempts };
      }
    } catch (error) {
      attempts.push({
        label,
        propertyId: null,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { propertyId: null, attempts };
}
