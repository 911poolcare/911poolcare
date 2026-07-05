"use client";

import { useEffect } from "react";
import { trackGenerateLead } from "@/lib/analytics/track-lead";

/** Fires GA4 conversion signals after a successful form redirect (client navigation). */
export function TrackLeadConversion() {
  useEffect(() => {
    trackGenerateLead();
  }, []);

  return null;
}
