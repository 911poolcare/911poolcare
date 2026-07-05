const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const LEAD_TRACKED_KEY = "911poolcare_lead_tracked";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function fireGenerateLead(): boolean {
  if (!gaId || typeof window.gtag !== "function") return false;
  if (sessionStorage.getItem(LEAD_TRACKED_KEY)) return true;

  window.gtag("event", "generate_lead", {
    method: "contact_form",
    event_category: "contact",
    event_label: "service_request",
  });
  window.gtag("config", gaId, { page_path: "/thank-you" });
  sessionStorage.setItem(LEAD_TRACKED_KEY, String(Date.now()));
  return true;
}

/** Fire GA4 generate_lead once per form submission; retries until gtag is ready. */
export function trackGenerateLead() {
  if (!gaId) return;

  if (fireGenerateLead()) return;

  let attempts = 0;
  const interval = window.setInterval(() => {
    attempts += 1;
    if (fireGenerateLead() || attempts >= 15) {
      window.clearInterval(interval);
    }
  }, 200);
}
