import type { ContactFormData } from "@/lib/validations/contact";

/**
 * Jobber GraphQL integration stub.
 * Wire up OAuth + clientCreate / request mutations once credentials are in .env.local.
 * Docs: https://developer.getjobber.com/docs/
 */
export async function submitLeadToJobber(data: ContactFormData): Promise<void> {
  const hasCredentials =
    process.env.JOBBER_CLIENT_ID &&
    process.env.JOBBER_CLIENT_SECRET &&
    process.env.JOBBER_REFRESH_TOKEN;

  if (!hasCredentials) {
    console.info("[Jobber] Lead received (credentials not configured):", {
      name: data.name,
      phone: data.phone,
      service: data.service,
      city: data.city,
    });
    return;
  }

  // TODO: refresh OAuth token, then POST to https://api.getjobber.com/api/graphql
  throw new Error("Jobber integration not yet configured");
}
