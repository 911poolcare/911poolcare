import { Phone, MessageSquare } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <Button href={site.phoneHref} variant="secondary" size="lg" className="w-full">
          <Phone className="h-5 w-5" aria-hidden />
          Call Now
        </Button>
        <Button href="/#contact" size="lg" className="w-full">
          <MessageSquare className="h-5 w-5" aria-hidden />
          Request Service
        </Button>
      </div>
    </div>
  );
}
