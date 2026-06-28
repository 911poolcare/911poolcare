import { poolEquipment } from "@/content/equipment";

export const partnerProgram = {
  metaTitle: "Pool Company Partners",
  metaDescription:
    "Partner with 911 Pool Care — competitive pricing to resell specialist services, priority scheduling, and direct support for pool service companies in Central Texas.",
  headline: "Help your customers more. Grow your business.",
  intro:
    "Pool service companies partner with us for leak detection technicians, pool repair experts, and renovation specialists — leak detection and repair, equipment repair and replacement, pool renovations and replaster, and inspections — without competing for weekly cleaning routes. Partners get competitive pricing, priority scheduling, and direct support.",
  benefits: [
    {
      title: "No leak detection deposit for partners",
      description:
        "Partner referrals are not charged the $120 residential leak detection deposit — so you can send specialist jobs our way without extra friction for your customer or your business.",
    },
    {
      title: "Competitive partner pricing",
      description:
        "Discounted rates on leak detection, pool equipment repair, renovations, and inspections — so you can resell our services to your customers with confidence and protect your margins.",
    },
    {
      title: "Priority scheduling",
      description:
        "Your referred jobs get priority on our schedule. Your customers get faster service, and you look good for making the right call.",
    },
    {
      title: "Partner support when you need it",
      description:
        "Questions before a referral? Issue after a job? We're here to help you answer your customers and resolve problems quickly — so you can keep serving your route with less hassle.",
    },
    {
      title: "Your customer stays yours",
      description:
        "We don't compete for weekly cleaning. We're the specialist behind you — you keep the relationship, we handle the technical work.",
    },
  ],
  services: [
    "Pool leak detection & repair",
    `Pool equipment repair & replacement — ${poolEquipment.inlineList}`,
    "Pool renovations & replastering",
    "Pool inspections (buyers, sellers & realtors)",
  ],
  howItWorks: [
    {
      step: "1",
      title: "Set up as a partner",
      description:
        "Tell us about your company and service area. We'll walk you through partner pricing, how referrals work, and what to expect.",
    },
    {
      step: "2",
      title: "Refer specialist jobs",
      description:
        "When a customer needs leak detection, equipment work, a renovation quote, or an inspection — send them our way at your partner rate.",
    },
    {
      step: "3",
      title: "We deliver — you stay in control",
      description:
        "Priority scheduling, professional execution, and direct support if anything comes up. Clear updates so you can keep your customer informed.",
    },
  ],
  ctaLabel: "Become a Partner",
} as const;
