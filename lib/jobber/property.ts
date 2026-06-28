import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";

export type JobberAddressInput = {
  street1: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

const PROPERTY_CREATE_MUTATION = `
  mutation CreateWebsiteLeadProperty(
    $clientId: EncodedId!
    $input: PropertyCreateInput!
  ) {
    propertyCreate(clientId: $clientId, input: $input) {
      properties {
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
    properties: Array<{ id: string }> | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

/** Creates a service property on the client. Returns the first property id or null. */
export async function createClientProperty(
  clientId: string,
  address: JobberAddressInput,
): Promise<string | null> {
  const propertyVariants = [{ address }, { addressAttributes: address }];

  for (const property of propertyVariants) {
    try {
      const result = await jobberGraphql<PropertyCreateResult>(
        PROPERTY_CREATE_MUTATION,
        {
          clientId,
          input: {
            properties: [property],
          },
        },
      );

      const errors = formatUserErrors(result.propertyCreate.userErrors);
      if (errors) {
        console.warn("[Jobber] propertyCreate:", errors);
        continue;
      }

      const propertyId = result.propertyCreate.properties?.[0]?.id ?? null;
      if (propertyId) {
        return propertyId;
      }
    } catch (error) {
      console.warn("[Jobber] propertyCreate:", error);
    }
  }

  return null;
}
