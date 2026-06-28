import type { ContactFormData } from "@/lib/validations/contact";
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
): Promise<JobberLeadResult> {
  if (!isJobberConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Jobber integration is not configured");
    }

    console.info("[Jobber] Lead received (credentials not configured):", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      city: data.city,
    });

    return {
      clientId: "dev-stub",
      clientUri: "",
      requestId: null,
      requestUri: null,
    };
  }

  return createJobberLeadFromContact(data);
}
