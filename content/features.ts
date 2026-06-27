import { Building2, Layers, MessageCircle, ShieldCheck, Wrench, Zap } from "lucide-react";
import { poolEquipment } from "@/content/equipment";
import { poolCareOffering } from "@/content/service-offering";
import { site } from "@/content/site";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    title: "Repair & Renovation Experts",
    description: `Leak detection technicians and pool repair specialists for ${poolCareOffering.inlineList}.`,
    icon: Layers,
  },
  {
    title: "Veteran-Owned & Accountable",
    description:
      "Discipline, clear communication, and a do-it-right mentality on every leak, equipment, and renovation project.",
    icon: ShieldCheck,
  },
  {
    title: poolEquipment.label,
    description: `Repair and replacement for ${poolEquipment.inlineList}. RAIL certified for Texas pool electrical work.`,
    icon: Wrench,
  },
  {
    title: "Free Renovation Consultation",
    description:
      "Complimentary on-site assessments for pool renovation and replaster projects — so you know your options before you commit.",
    icon: MessageCircle,
  },
  {
    title: site.railCertified.label,
    description: site.railCertified.description,
    icon: Zap,
  },
  {
    title: site.serviceScope.label,
    description: site.serviceScope.description,
    icon: Building2,
  },
];
