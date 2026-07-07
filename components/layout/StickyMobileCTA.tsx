"use client";

import { MessageSquare } from "lucide-react";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { TextLink } from "@/components/layout/TextLink";
import { Button } from "@/components/ui/Button";
import { isSmsChatVisible, smsChatConfig } from "@/lib/sms-chat";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [showText, setShowText] = useState(() => isSmsChatVisible());

  useEffect(() => {
    if (!smsChatConfig.businessHoursOnly) return;

    const interval = window.setInterval(() => {
      setShowText(isSmsChatVisible());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      data-sticky-mobile-cta
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden"
    >
      <div
        className={cn(
          "mx-auto grid max-w-lg gap-2",
          showText ? "grid-cols-3" : "grid-cols-2",
        )}
      >
        <PhoneLink
          variant="secondary"
          size="lg"
          className="min-w-0 gap-1.5 whitespace-nowrap px-2.5 text-sm"
          showIcon
          compact
          label="Call"
          ariaLabel="Call 911 Pool Care"
        />
        {showText ? (
          <TextLink
            variant="secondary"
            size="lg"
            className="min-w-0 gap-1.5 whitespace-nowrap bg-brand-700 px-2.5 text-sm text-white hover:bg-brand-800"
            showIcon
            label="Text"
            ariaLabel="Text 911 Pool Care"
          />
        ) : null}
        <Button href="/#contact" size="lg" className="min-w-0 px-2.5 text-sm">
          <MessageSquare className="h-5 w-5 shrink-0" aria-hidden />
          Request
        </Button>
      </div>
    </div>
  );
}
