import { track } from "@vercel/analytics";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function getPhonePlacement(link: HTMLAnchorElement): string {
  if (link.closest("[data-sticky-mobile-cta]")) return "sticky_cta";
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";

  return link.dataset.phonePlacement ?? "inline";
}

/** Fire GA4 + Vercel events when a visitor taps a phone link. */
export function trackPhoneClick(link: HTMLAnchorElement) {
  const placement = getPhonePlacement(link);
  const page = window.location.pathname;

  track("phone_call_click", { placement, page });

  if (!gaId || typeof window.gtag !== "function") return;

  window.gtag("event", "phone_call_click", {
    method: "click_to_call",
    placement,
    page_path: page,
    transport_type: "beacon",
  });
}
