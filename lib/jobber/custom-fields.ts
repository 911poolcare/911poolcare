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

export type ResolvedCustomFieldIds = {
  servicesRequestedId: string | null;
  referralSourceId: string | null;
};

export type CustomFieldLookupDiagnostics = {
  fieldIds: ResolvedCustomFieldIds;
  ready: boolean;
  lookupError: string | null;
  clientTextFields: Array<{ name: string; appliesTo: string }>;
  nearMatches: string[];
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

function resolveIdsFromFields(
  fields: Array<{ id: string; name: string }>,
): ResolvedCustomFieldIds {
  const byName = new Map(fields.map((field) => [field.name.trim(), field.id]));

  return {
    servicesRequestedId: byName.get(JOBBER_CF_SERVICES_NAME) ?? null,
    referralSourceId: byName.get(JOBBER_CF_REFERRAL_NAME) ?? null,
  };
}

async function loadClientTextFields(): Promise<{
  fields: Array<{ id: string; name: string; appliesTo: string }>;
  error: string | null;
}> {
  try {
    const result = await jobberGraphql<CustomFieldConfigResult>(
      LIST_CUSTOM_FIELD_CONFIGS,
    );

    return {
      fields: result.customFieldConfigurations.nodes.filter((field) =>
        appliesToClients(field.appliesTo),
      ),
      error: null,
    };
  } catch (error) {
    return {
      fields: [],
      error: error instanceof Error ? error.message : "Unknown Jobber API error",
    };
  }
}

export async function inspectJobberClientCustomFields(
  options: { refresh?: boolean } = {},
): Promise<CustomFieldLookupDiagnostics> {
  if (options.refresh) {
    cachedFieldIds = null;
  }

  const fromEnv = resolveFromEnv();
  const { fields, error } = await loadClientTextFields();
  const fromJobber = resolveIdsFromFields(fields);

  const fieldIds: ResolvedCustomFieldIds = {
    servicesRequestedId:
      fromEnv.servicesRequestedId ?? fromJobber.servicesRequestedId,
    referralSourceId: fromEnv.referralSourceId ?? fromJobber.referralSourceId,
  };

  const ready = Boolean(fieldIds.servicesRequestedId && fieldIds.referralSourceId);
  if (ready) {
    cachedFieldIds = fieldIds;
  }

  const nearMatches = fields
    .map((field) => field.name)
    .filter((name) => /website|services|referral|referred/i.test(name));

  return {
    fieldIds,
    ready,
    lookupError: error,
    clientTextFields: fields.map((field) => ({
      name: field.name,
      appliesTo: field.appliesTo,
    })),
    nearMatches,
  };
}

export async function getJobberClientCustomFieldIds(
  options: { refresh?: boolean } = {},
): Promise<ResolvedCustomFieldIds> {
  if (!options.refresh && cachedFieldIds) {
    return cachedFieldIds;
  }

  const fromEnv = resolveFromEnv();
  if (fromEnv.servicesRequestedId || fromEnv.referralSourceId) {
    cachedFieldIds = fromEnv;
    return fromEnv;
  }

  // Skip slow/failing API discovery on form submit unless explicitly enabled.
  if (process.env.JOBBER_CF_DISCOVERY !== "1") {
    cachedFieldIds = fromEnv;
    return fromEnv;
  }

  const diagnostics = await inspectJobberClientCustomFields(options);
  return diagnostics.fieldIds;
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
