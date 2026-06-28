"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { consumeThankYouAccess } from "@/lib/contact/thank-you";

export function ThankYouGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (consumeThankYouAccess()) {
      setAllowed(true);
      return;
    }

    router.replace("/#contact");
  }, [router]);

  useEffect(() => {
    if (!allowed) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [allowed]);

  if (!allowed) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" aria-label="Loading" />
      </div>
    );
  }

  return children;
}
