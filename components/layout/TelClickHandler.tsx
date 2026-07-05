"use client";

import { useEffect, useState } from "react";

function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function formatPhoneFromLink(link: HTMLAnchorElement): string {
  const text = link.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const digits = text.replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return text || link.href.replace(/^tel:/, "");
}

/** Ensures tel: links dial reliably (iOS fixed footers, swapped Google numbers) without re-rendering anchors. */
export function TelClickHandler() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a[href^='tel:']");
      if (!(link instanceof HTMLAnchorElement)) return;

      const tel = link.getAttribute("href");
      if (!tel?.startsWith("tel:")) return;

      event.preventDefault();

      window.location.href = tel;

      if (!isMobileDevice()) {
        const display = formatPhoneFromLink(link);
        void navigator.clipboard?.writeText(display).then(() => {
          setToast(`Copied ${display} — paste into your phone or open Phone Link`);
          window.setTimeout(() => setToast(null), 4000);
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
