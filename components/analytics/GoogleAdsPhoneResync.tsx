"use client";

import { useEffect } from "react";

const adsId = "AW-16454489422";
const conversionId = "AW-16454489422/IvjYCILq5O0bEM6qjqY9";
const phoneConversionNumber = "512-947-2023";
const originalPhoneHref = "tel:+15129472023";

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

function hasUnswappedPhoneLinks(): boolean {
  return Array.from(document.querySelectorAll('a[href^="tel:"]')).some(
    (link) => link.getAttribute("href") === originalPhoneHref,
  );
}

/** Re-run Google Ads phone swap after React hydration for ad traffic. */
export function GoogleAdsPhoneResync() {
  useEffect(() => {
    if (!isGoogleAdsClick()) return;

    const resyncIfNeeded = () => {
      if (hasUnswappedPhoneLinks()) {
        resyncPhoneSwap();
      }
    };

    resyncIfNeeded();

    let gtagAttempts = 0;
    const gtagInterval = window.setInterval(() => {
      gtagAttempts += 1;
      resyncIfNeeded();
      if (typeof window.gtag === "function" || gtagAttempts >= 120) {
        window.clearInterval(gtagInterval);
      }
    }, 250);

    let keepAliveTicks = 0;
    const keepAliveInterval = window.setInterval(() => {
      keepAliveTicks += 1;
      resyncIfNeeded();
      if (keepAliveTicks >= 30) {
        window.clearInterval(keepAliveInterval);
      }
    }, 2000);

    const observer = new MutationObserver(() => {
      resyncIfNeeded();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    return () => {
      window.clearInterval(gtagInterval);
      window.clearInterval(keepAliveInterval);
      observer.disconnect();
    };
  }, []);

  return null;
}
