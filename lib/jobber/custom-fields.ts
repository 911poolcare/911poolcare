import { jobberGraphql } from "@/lib/jobber/graphql";

/** Create these text fields on Clients in Jobber → Settings → Custom Fields. */
export const JOBBER_CF_SERVICES_NAME = "Website - Services Requested";
export const JOBBER_CF_REFERRAL_NAME = "Website - Referral Source";

const LIST_CUSTOM_FIELD_CONFIGS = `
  query ListClientCustomFieldConfigs {
    customFieldConfigurations(first: 100) {
      nodes {
        ... on CustomFieldConfigurationText {
          id
          name
          appliesTo
        }
      }
    }
  }
`;

type CustomFieldConfigResult = {
  customFieldConfigurations: {
    nodes: Array<{
      id: string;
      name: string;
      appliesTo: string;
    }>;
  };
};

type ResolvedCustomFieldIds = {
  servicesRequestedId: string | null;
  referralSourceId: string | null;
};

let cachedFieldIds: ResolvedCustomFieldIds | null = null;

function appliesToClients(appliesTo: string) {
  return appliesTo === "ALL_CLIENTS" || appliesTo.includes("CLIENT");
}

function resolveFromEnv(): ResolvedCustomFieldIds {
  return {
    servicesRequestedId: process.env.JOBBER_CF_SERVICES_REQUESTED_ID?.trim() || null,
    referralSourceId: process.env.JOBBER_CF_REFERRAL_SOURCE_ID?.trim() || null,
  };
}

async function resolveFromJobber(): Promise<ResolvedCustomFieldIds> {
  try {
    const result = await jobberGraphql<CustomFieldConfigResult>(
      LIST_CUSTOM_FIELD_CONFIGS,
    );

    const clientTextFields = result.customFieldConfigurations.nodes.filter(
      (field) => appliesToClients(field.appliesTo),
    );

    const byName = new Map(
      clientTextFields.map((field) => [field.name.trim(), field.id]),
    );

    return {
      servicesRequestedId: byName.get(JOBBER_CF_SERVICES_NAME) ?? null,
      referralSourceId: byName.get(JOBBER_CF_REFERRAL_NAME) ?? null,
    };
  } catch (error) {
    console.warn("[Jobber] Could not load custom field configurations:", error);
    return { servicesRequestedId: null, referralSourceId: null };
  }
}

export async function getJobberClientCustomFieldIds(): Promise<ResolvedCustomFieldIds> {
  if (cachedFieldIds) return cachedFieldIds;

  const fromEnv = resolveFromEnv();
  const fromJobber = await resolveFromJobber();

  cachedFieldIds = {
    servicesRequestedId:
      fromEnv.servicesRequestedId ?? fromJobber.servicesRequestedId,
    referralSourceId: fromEnv.referralSourceId ?? fromJobber.referralSourceId,
  };

  return cachedFieldIds;
}

export function buildClientCustomFieldInputs(
  fieldIds: ResolvedCustomFieldIds,
  serviceLabels: string[],
  referralLabel: string | null,
): Array<{ id: string; valueText: string }> {
  const fields: Array<{ id: string; valueText: string }> = [];

  if (fieldIds.servicesRequestedId && serviceLabels.length) {
    fields.push({
      id: fieldIds.servicesRequestedId,
      valueText: serviceLabels.join(", "),
    });
  }

  if (fieldIds.referralSourceId) {
    fields.push({
      id: fieldIds.referralSourceId,
      valueText: referralLabel ?? "Not specified",
    });
  }

  return fields;
}

export function logMissingCustomFieldSetup(fieldIds: ResolvedCustomFieldIds) {
  const missing: string[] = [];
  if (!fieldIds.servicesRequestedId) {
    missing.push(JOBBER_CF_SERVICES_NAME);
  }
  if (!fieldIds.referralSourceId) {
    missing.push(JOBBER_CF_REFERRAL_NAME);
  }

  if (missing.length) {
    console.warn(
      `[Jobber] Client custom fields not configured (${missing.join(", ")}). ` +
        "Create them in Jobber or set JOBBER_CF_* env vars.",
    );
  }
}
