"use client";

import { isSmsChatVisible, smsChatConfig } from "@/lib/sms-chat";
import { useEffect, useState, type ReactNode } from "react";

type SmsChatAvailabilityProps = {
  children: ReactNode;
};

/** Renders children only when SMS chat is enabled (and during business hours when configured). */
export function SmsChatAvailability({ children }: SmsChatAvailabilityProps) {
  const [visible, setVisible] = useState(() => isSmsChatVisible());

  useEffect(() => {
    if (!smsChatConfig.businessHoursOnly) return;

    const interval = window.setInterval(() => {
      setVisible(isSmsChatVisible());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  if (!visible) return null;
  return children;
}
