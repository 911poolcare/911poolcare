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

  if (!allowed) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" aria-label="Loading" />
      </div>
    );
  }

  return children;
}
