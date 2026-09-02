import type { ContactFormData } from "@/lib/validations/contact";
import type { AdClickId } from "@/lib/ads/click-id";
import { isJobberConfigured } from "@/lib/jobber/config";
import { createJobberLeadFromContact } from "@/lib/jobber/leads";

export type JobberLeadResult = {
  clientId: string;
  clientUri: string;
  requestId: string | null;
  requestUri: string | null;
};

/**
 * Creates a Jobber lead client + work request from the website contact form.
 * Requires JOBBER_CLIENT_ID, JOBBER_CLIENT_SECRET, and JOBBER_REFRESH_TOKEN.
 */
export async function submitLeadToJobber(
  data: ContactFormData,
  adClick?: AdClickId | null,
): Promise<JobberLeadResult> {
  if (!isJobberConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Jobber integration is not configured");
    }

    console.info("[Jobber] Lead received (credentials not configured):", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      services: data.services,
      address: `${data.street}, ${data.city}, ${data.state} ${data.zip}`,
      adClick: adClick ?? null,
    });

    return {
      clientId: "dev-stub",
      clientUri: "",
      requestId: null,
      requestUri: null,
    };
  }

  return createJobberLeadFromContact(data, adClick);
}
