"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Fires GA4 conversion signals after a successful form redirect (client navigation). */
export function TrackLeadConversion() {
  useEffect(() => {
    if (!gaId || typeof window.gtag !== "function") return;

    window.gtag("config", gaId, { page_path: "/thank-you" });
    window.gtag("event", "generate_lead", {
      event_category: "contact",
      event_label: "service_request",
    });
  }, []);

  return null;
}
