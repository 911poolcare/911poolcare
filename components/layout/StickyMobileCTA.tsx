import { MessageSquare } from "lucide-react";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export function StickyMobileCTA() {
  return (
    <div
      data-sticky-mobile-cta
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-2">
        <PhoneLink
          variant="secondary"
          size="lg"
          className="min-w-0 gap-1.5 whitespace-nowrap px-2.5 text-sm"
          showIcon
          ariaLabel={`Call ${site.phone}`}
        />
        <Button href="/#contact" size="lg" className="w-full">
          <MessageSquare className="h-5 w-5" aria-hidden />
          Request Service
        </Button>
      </div>
    </div>
  );
}
