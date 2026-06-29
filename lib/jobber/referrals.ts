import { findClientByName } from "@/lib/jobber/clients";
import type { ContactFormData } from "@/lib/validations/contact";

/** RequestCreateInput field — introspect via GET /api/jobber/request-forms */
export const REQUEST_REFERRING_CLIENT_FIELD = "referringClientId";

const REFERRER_SOURCES = new Set(["pool-company", "word-of-mouth"]);

export function getReferrerName(data: ContactFormData): string | null {
  if (!data.referralSource || !REFERRER_SOURCES.has(data.referralSource)) {
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

  const client = await findClientByName(referrerName);
  if (!client) {
    console.info("[Jobber] No matching referring client in Jobber", {
      referrerName,
    });
    return null;
  }

  console.info("[Jobber] Linked referring client on request", {
    referrerName,
    referringClientId: client.id,
    referringClientName: client.name,
  });

  return client.id;
}
