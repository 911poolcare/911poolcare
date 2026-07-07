import { track } from "@vercel/analytics";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function getSmsPlacement(link: HTMLAnchorElement): string {
  if (link.closest("[data-sticky-mobile-cta]")) return "sticky_cta";
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";

  return link.dataset.smsPlacement ?? "inline";
}

/** Fire GA4 + Vercel events when a visitor taps a text link. */
export function trackSmsClick(link: HTMLAnchorElement) {
  const placement = getSmsPlacement(link);
  const page = window.location.pathname;

  track("sms_click", { placement, page });

  if (!gaId || typeof window.gtag !== "function") return;

  window.gtag("event", "sms_click", {
    method: "click_to_text",
    placement,
    page_path: page,
    transport_type: "beacon",
  });
}
