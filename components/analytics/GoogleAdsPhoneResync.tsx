"use client";

import { useEffect } from "react";

const adsId = "AW-16454489422";
const conversionId = "AW-16454489422/IvjYCILq5O0bEM6qjqY9";
const phoneConversionNumber = "512-947-2023";

function isGoogleAdsClick(): boolean {
  const params = new URLSearchParams(window.location.search);
  return (
    params.has("gclid") ||
    params.has("gclsrc") ||
    params.has("gbraid") ||
    params.has("wbraid") ||
    params.has("gad_source")
  );
}

function resyncPhoneSwap(): boolean {
  if (typeof window.gtag !== "function") return false;

  window.gtag("config", adsId, {
    phone_conversion_number: phoneConversionNumber,
  });
  window.gtag("config", conversionId, {
    phone_conversion_number: phoneConversionNumber,
  });
  return true;
}

/** Re-run Google Ads phone swap after React hydration for ad traffic. */
export function GoogleAdsPhoneResync() {
  useEffect(() => {
    if (!isGoogleAdsClick()) return;

    if (resyncPhoneSwap()) return;

    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      if (resyncPhoneSwap() || attempts >= 20) {
        window.clearInterval(interval);
      }
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  return null;
}
