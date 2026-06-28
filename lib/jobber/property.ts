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

/** Creates a service property on the client — best-effort, returns null on failure. */
export async function createClientProperty(
  clientId: string,
  address: JobberAddressInput,
): Promise<string | null> {
  try {
    const result = await jobberGraphql<PropertyCreateResult>(
      PROPERTY_CREATE_MUTATION,
      {
        input: {
          clientId,
          address,
        },
      },
    );

    const errors = formatUserErrors(result.propertyCreate.userErrors);
    if (errors) {
      console.warn("[Jobber] propertyCreate:", errors);
      return null;
    }

    return result.propertyCreate.property?.id ?? null;
  } catch (error) {
    console.warn("[Jobber] propertyCreate:", error);
    return null;
  }
}
