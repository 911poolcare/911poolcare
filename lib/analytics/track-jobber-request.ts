import { track } from "@vercel/analytics/server";

/** Vercel Web Analytics custom event for a successful Jobber service request. */
export async function trackJobberRequest() {
  try {
    await track("jobber_request", { method: "contact_form" });
  } catch (error) {
    console.error("[analytics] jobber_request", error);
  }
}
