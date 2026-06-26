import { Medal, ShieldCheck, Sparkles, Wrench, Zap } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

const items = [
  { icon: Wrench, label: "Leak Detection & Repair" },
  { icon: ShieldCheck, label: "Equipment Repair" },
  { icon: Sparkles, label: "Renovations & Replaster" },
  { icon: Zap, label: site.railCertified.label },
];

export function TrustBar() {
  return (
    <div className="border-t border-white/10 bg-brand-950/30">
      <Container className="grid grid-cols-2 gap-4 py-5 sm:grid-cols-4 sm:gap-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 text-sm text-brand-50">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-medium leading-snug">{label}</span>
          </div>
        ))}
      </Container>
    </div>
  );
}
