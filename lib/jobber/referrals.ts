import {
  getLeadSourceOptionLabel,
  isNamedLeadSource,
} from "@/content/contact-form";
import {
  createReferringClient,
  editClient,
  findClientByName,
} from "@/lib/jobber/clients";
import { jobberGraphql } from "@/lib/jobber/graphql";
import type { ContactFormData } from "@/lib/validations/contact";

/** RequestCreateInput field — introspect via GET /api/jobber/request-forms */
export const REQUEST_REFERRING_CLIENT_FIELD = "referringClientId";

const CLIENT_REFERRAL_FIELD_CANDIDATES = [
  "referringClientId",
  "referredById",
  "referredByClientId",
  "referredBy",
] as const;

const CLIENT_REFERRAL_SCHEMA_QUERY = `
  query ClientReferralSchema {
    create: __type(name: "ClientCreateInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    edit: __type(name: "ClientEditInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    sourceAttribution: __type(name: "SourceAttributionAttributes") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
  }
`;

type GraphqlTypeRef = {
  name: string | null;
  kind: string;
  ofType?: GraphqlTypeRef | null;
};

type ClientReferralWrite = {
  path: "create" | "edit";
  field: string;
  valueKind: "id" | "string";
  nestedField?: string;
  sourceField?: string;
};

let cachedClientReferralWrite: ClientReferralWrite | null | undefined;

function unwrapTypeName(type: GraphqlTypeRef | null | undefined): string | null {
  let current = type ?? null;
  while (current) {
    if (current.name) return current.name;
    current = current.ofType ?? null;
  }
  return null;
}

function valueKindFromType(typeName: string | null): "id" | "string" | null {
  if (typeName === "EncodedId" || typeName === "ID") return "id";
  if (typeName === "String") return "string";
  return null;
}

function pickReferralField(
  fields: Array<{ name: string; type: GraphqlTypeRef }> | null | undefined,
): { field: string; valueKind: "id" | "string" } | null {
  if (!fields?.length) return null;

  for (const candidate of CLIENT_REFERRAL_FIELD_CANDIDATES) {
    const match = fields.find((field) => field.name === candidate);
    const valueKind = valueKindFromType(unwrapTypeName(match?.type));
    if (match && valueKind) {
      return { field: match.name, valueKind };
    }
  }

  const fallback = fields.find((field) => /refer/i.test(field.name));
  const valueKind = valueKindFromType(unwrapTypeName(fallback?.type));
  if (fallback && valueKind) {
    return { field: fallback.name, valueKind };
  }

  return null;
}

function nativeLeadSourceLabel(data: ContactFormData): string | null {
  if (data.referralSource === "partner" || data.referralSource === "referral") {
    return "Referral";
  }
  return getLeadSourceOptionLabel(data.referralSource);
}

export async function getClientReferredByWrite(): Promise<ClientReferralWrite | null> {
  if (cachedClientReferralWrite !== undefined) {
    return cachedClientReferralWrite;
  }

  try {
    const result = await jobberGraphql<{
      create: {
        inputFields: Array<{ name: string; type: GraphqlTypeRef }>;
      } | null;
      edit: {
        inputFields: Array<{ name: string; type: GraphqlTypeRef }>;
      } | null;
      sourceAttribution: {
        inputFields: Array<{ name: string; type: GraphqlTypeRef }>;
      } | null;
    }>(CLIENT_REFERRAL_SCHEMA_QUERY);

    const attributionFields = result.sourceAttribution?.inputFields;
    const nestedReferral = pickReferralField(attributionFields);
    const sourceField =
      attributionFields?.find((field) => field.name === "source")?.name ??
      attributionFields?.find((field) => field.name === "leadSource")?.name ??
      attributionFields?.find((field) => field.name === "sourceText")?.name;
    const createHasAttribution = Boolean(
      result.create?.inputFields.some((field) => field.name === "sourceAttribution"),
    );
    const createField = pickReferralField(result.create?.inputFields);
    const editField = pickReferralField(result.edit?.inputFields);

    if (createHasAttribution && (nestedReferral || sourceField)) {
      cachedClientReferralWrite = {
        path: "create",
        field: "sourceAttribution",
        valueKind: nestedReferral?.valueKind ?? "string",
        nestedField: nestedReferral?.field,
        sourceField,
      };
    } else {
      cachedClientReferralWrite = createField
        ? { path: "create", ...createField }
        : editField
          ? { path: "edit", ...editField }
          : null;
    }

    if (!cachedClientReferralWrite) {
      console.warn(
        "[Jobber] Client create/edit has no Referred By field. " +
          "The client Referred By box cannot be set from the website form.",
      );
    } else {
      console.info("[Jobber] Client Referred By write path", cachedClientReferralWrite);
    }
  } catch (error) {
    console.warn("[Jobber] Could not inspect client Referred By fields:", error);
    cachedClientReferralWrite = null;
  }

  return cachedClientReferralWrite;
}

export function getReferrerName(data: ContactFormData): string | null {
  if (!data.referralSource || !isNamedLeadSource(data.referralSource)) {
    return null;
  }

  const name = data.referrerName?.trim();
  return name || null;
}

export async function resolveReferringClientId(
  data: ContactFormData,
): Promise<string | null> {
  const referrerName = getReferrerName(data);
  if (!referrerName) {
    return null;
  }

  const existing = await findClientByName(referrerName);
  if (existing) {
    console.info("[Jobber] Linked referring client", {
      referrerName,
      referringClientId: existing.id,
      referringClientName: existing.name,
    });
    return existing.id;
  }

  const created = await createReferringClient({
    name: referrerName,
    isCompany: data.referralSource === "partner",
  });

  if (!created) {
    console.info("[Jobber] No matching referring client in Jobber", {
      referrerName,
    });
    return null;
  }

  console.info("[Jobber] Created referring client", {
    referrerName,
    referringClientId: created.id,
    referringClientName: created.name,
  });

  return created.id;
}

function referredByPayload(
  write: ClientReferralWrite,
  data: ContactFormData,
  referringClientId: string | null,
): unknown | null {
  if (write.field === "sourceAttribution") {
    const attribution: Record<string, unknown> = {};
    const referrerValue =
      write.valueKind === "id" ? referringClientId : getReferrerName(data);
    if (write.nestedField && referrerValue) {
      attribution[write.nestedField] = referrerValue;
    }
    if (write.sourceField) {
      const sourceValue =
        write.sourceField === "sourceText"
          ? getReferrerName(data) ?? nativeLeadSourceLabel(data)
          : nativeLeadSourceLabel(data);
      if (sourceValue) {
        attribution[write.sourceField] = sourceValue;
      }
    }
    return Object.keys(attribution).length ? attribution : null;
  }

  const value =
    write.valueKind === "id" ? referringClientId : getReferrerName(data);
  return value;
}

export async function applyReferredByOnCreateInput(
  clientInput: Record<string, unknown>,
  data: ContactFormData,
  referringClientId: string | null,
): Promise<void> {
  const write = await getClientReferredByWrite();
  if (write?.path !== "create") {
    return;
  }

  const value = referredByPayload(write, data, referringClientId);
  if (!value) {
    return;
  }

  clientInput[write.field] = value;
}

export async function applyReferredByAfterCreate(
  created: boolean,
  clientId: string,
  data: ContactFormData,
  referringClientId: string | null,
): Promise<void> {
  if (!created) {
    return;
  }

  const write = await getClientReferredByWrite();
  if (write?.path !== "edit") {
    return;
  }

  const value = referredByPayload(write, data, referringClientId);
  if (!value) {
    return;
  }

  const updated = await editClient(clientId, {
    [write.field]: value,
  });
  if (updated) {
    console.info("[Jobber] Set client Referred By", {
      clientId,
      field: write.field,
      value,
    });
  }
}
