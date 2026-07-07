"use client";

import { useEffect, useState } from "react";
import { trackSmsClick } from "@/lib/analytics/track-sms-click";
import { parseSmsBodyFromHref } from "@/lib/sms-chat";
import { site } from "@/content/site";

function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function parseSmsHref(href: string): { phone: string; body: string } {
  const match = href.match(/^sms:([^?]+)/i);
  const phone = match?.[1] ?? site.smsNumber;
  const body = parseSmsBodyFromHref(href);

  return { phone, body };
}

function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return site.phone;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Ensures sms: links open reliably on mobile and gives desktop visitors copy-to-text fallback. */
export function SmsClickHandler() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a[href^='sms:']");
      if (!(link instanceof HTMLAnchorElement)) return;

      const sms = link.getAttribute("href");
      if (!sms?.startsWith("sms:")) return;

      event.preventDefault();

      trackSmsClick(link);
      window.location.href = sms;

      if (!isMobileDevice()) {
        const { phone, body } = parseSmsHref(sms);
        const display = formatPhoneDisplay(phone);
        const copyText = `${display}\n\n${body}`;

        void navigator.clipboard?.writeText(copyText).then(() => {
          setToast(`Copied ${display} and a starter message — paste into your texting app`);
          window.setTimeout(() => setToast(null), 5000);
        });
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 left-1/2 z-[60] max-w-sm -translate-x-1/2 rounded-xl bg-brand-900 px-4 py-3 text-center text-sm font-medium text-white shadow-lg md:bottom-6"
    >
      {toast}
    </div>
  );
}
