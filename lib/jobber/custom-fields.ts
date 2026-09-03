import { jobberGraphql } from "@/lib/jobber/graphql";

/** Create these text fields on Clients in Jobber → Settings → Custom Fields. */
export const JOBBER_CF_SERVICES_NAME = "Website - Services Requested";
export const JOBBER_CF_LEAD_SOURCE_NAME = "Lead Source";
export const JOBBER_CF_REFERRAL_NAME = "Website - Referral Source";
export const JOBBER_CF_GOOGLE_CLICK_ID_NAME = "Google Click ID";

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
  googleClickId: string | null;
};

export type CustomFieldLookupDiagnostics = {
  fieldIds: ResolvedCustomFieldIds;
  ready: boolean;
  lookupError: string | null;
  clientTextFields: Array<{ id: string; name: string; appliesTo: string }>;
  nearMatches: string[];
};

let cachedFieldIds: ResolvedCustomFieldIds | null = null;

function appliesToClients(appliesTo: string | undefined) {
  if (!appliesTo) return false;
  return appliesTo === "ALL_CLIENTS" || appliesTo.includes("CLIENT");
}

function resolveFromEnv(): ResolvedCustomFieldIds {
  return {
    servicesRequestedId: process.env.JOBBER_CF_SERVICES_REQUESTED_ID?.trim() || null,
    referralSourceId: process.env.JOBBER_CF_REFERRAL_SOURCE_ID?.trim() || null,
    googleClickId: process.env.JOBBER_CF_GOOGLE_CLICK_ID?.trim() || null,
  };
}

function resolveIdsFromFields(
  fields: Array<{ id: string; name: string }>,
): ResolvedCustomFieldIds {
  const byName = new Map(fields.map((field) => [field.name.trim(), field.id]));

  return {
    servicesRequestedId: byName.get(JOBBER_CF_SERVICES_NAME) ?? null,
    referralSourceId:
      byName.get(JOBBER_CF_LEAD_SOURCE_NAME) ??
      byName.get(JOBBER_CF_REFERRAL_NAME) ??
      null,
    googleClickId: byName.get(JOBBER_CF_GOOGLE_CLICK_ID_NAME) ?? null,
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
      fields: result.customFieldConfigurations.nodes.filter(
        (field) => field?.id && field.name && appliesToClients(field.appliesTo),
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
    googleClickId: fromEnv.googleClickId ?? fromJobber.googleClickId,
  };

  const ready = Boolean(fieldIds.servicesRequestedId && fieldIds.referralSourceId);
  cachedFieldIds = fieldIds;

  const nearMatches = fields
    .map((field) => field.name)
    .filter((name) => /website|services|referral|referred|lead.?source|click|gclid|google/i.test(name));

  return {
    fieldIds,
    ready,
    lookupError: error,
    clientTextFields: fields.map((field) => ({
      id: field.id,
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
  const hasLegacyIds = Boolean(
    fromEnv.servicesRequestedId || fromEnv.referralSourceId,
  );
  const hasAllIds = Boolean(
    fromEnv.servicesRequestedId &&
      fromEnv.referralSourceId &&
      fromEnv.googleClickId,
  );

  if (hasAllIds) {
    cachedFieldIds = fromEnv;
    return fromEnv;
  }

  // Skip slow/failing API discovery on form submit unless explicitly enabled,
  // except when the Google Click ID field still needs a name lookup.
  if (process.env.JOBBER_CF_DISCOVERY !== "1" && hasLegacyIds && fromEnv.googleClickId) {
    cachedFieldIds = fromEnv;
    return fromEnv;
  }

  if (process.env.JOBBER_CF_DISCOVERY !== "1" && hasLegacyIds && !fromEnv.googleClickId) {
    const diagnostics = await inspectJobberClientCustomFields(options);
    return diagnostics.fieldIds;
  }

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
  googleClickId?: string | null,
): Array<{ id: string; valueText: string }> {
  const fields: Array<{ id: string; valueText: string }> = [];

  if (fieldIds.servicesRequestedId && serviceLabels.length) {
    fields.push({
      id: fieldIds.servicesRequestedId,
      valueText: serviceLabels.join(", "),
    });
  }

  if (fieldIds.referralSourceId && referralLabel) {
    fields.push({
      id: fieldIds.referralSourceId,
      valueText: referralLabel,
    });
  }

  if (fieldIds.googleClickId && googleClickId) {
    fields.push({
      id: fieldIds.googleClickId,
      valueText: googleClickId,
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
    missing.push(`${JOBBER_CF_LEAD_SOURCE_NAME} (or ${JOBBER_CF_REFERRAL_NAME})`);
  }
  if (!fieldIds.googleClickId) {
    missing.push(JOBBER_CF_GOOGLE_CLICK_ID_NAME);
  }

  if (missing.length) {
    console.warn(
      `[Jobber] Client custom fields not configured (${missing.join(", ")}). ` +
        "Create them in Jobber or set JOBBER_CF_* env vars.",
    );
  }
}

const CLIENT_TEXT_CUSTOM_FIELDS_QUERY = `
  query WebsiteLeadClientCustomFields($clientId: EncodedId!) {
    client(id: $clientId) {
      customFields {
        ... on CustomFieldText {
          id
          label
          valueText
        }
      }
    }
  }
`;

type ClientTextCustomFieldsResult = {
  client: {
    customFields: Array<{
      id?: string;
      label?: string | null;
      valueText?: string | null;
    } | null>;
  } | null;
};

export async function findClientTextCustomField(
  clientId: string,
  fieldName: string,
): Promise<{ id: string; label: string } | null> {
  const wanted = fieldName.trim().toLowerCase();

  try {
    const result = await jobberGraphql<ClientTextCustomFieldsResult>(
      CLIENT_TEXT_CUSTOM_FIELDS_QUERY,
      { clientId },
    );

    const match = result.client?.customFields.find(
      (field) => field?.id && field.label?.trim().toLowerCase() === wanted,
    );

    if (!match?.id || !match.label) {
      return null;
    }

    return { id: match.id, label: match.label };
  } catch (error) {
    console.warn("[Jobber] findClientTextCustomField:", error);
    return null;
  }
}
