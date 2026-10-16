import { site } from "@/content/site";

export const poolStartupGuide = {
  href: "/pool-startup-guide",
  slug: "pool-startup-guide",
  metaTitle: "New Pool Plaster Startup Guide",
  metaDescription:
    "What to expect after your pool replaster: filling, brushing, our 6 startup visits, and what to avoid for the first 30 days.",
  headline: "Your New Pool Surface: Startup Guide",
  eyebrow: "What to expect after your replaster",
  renovationBlurb:
    "Filling, brushing twice a day for 14 days, our 6 startup visits, and what to avoid through Day 30.",
  faq: {
    question: "What happens after the new plaster is installed?",
    answer:
      "We start filling the same day. You watch the fill and turn the water off when it reaches halfway up the waterline tile, then text us. We balance the water across 6 visits over 2 weeks. You brush the entire pool at least twice a day for 14 days. Swim only after we've sanitized it, and wait until Day 30 for a robot, heater, or salt system. The full schedule is in our new pool plaster startup guide.",
  },
  image: {
    src: "/images/renovations/pool-startup-fill.jpg",
    alt: "Fresh white plaster on fill day, with hoses in the deep end and cloth wraps softening the water flow.",
  },
  dayCountNote:
    "All day counts below start from the day your plaster is installed, once the pool is completely filled up.",
  phone: site.phone,
} as const;

export const startupBeforeFill = [
  {
    title: "Clear access",
    body: "Keep gates unlocked and the path to the pool clear.",
  },
  {
    title: "Pets stay inside",
    body: "Paw prints in fresh plaster are permanent.",
  },
  {
    title: "Turn off sprinklers near the pool",
    body: "Overspray carries dirt and minerals that can stain new plaster.",
  },
  {
    title: "Expect a higher water bill",
    body: "Filling a pool takes thousands of gallons.",
  },
] as const;

export const startupFillRules = [
  {
    lead: "Never turn off or move the hoses",
    body: "until the pool is full. The fill has to run without stopping, overnight if needed. A pause leaves a permanent ring in the plaster.",
    continued: true,
  },
  {
    lead: "All hoses should stay in the deep end",
    body: "Water must never run down the plaster walls. It leaves streaks that don't come out. If a hose shifts or water starts running down a wall, fix it right away and call us.",
  },
  {
    lead: "Leave the cloth wraps and float bottle on the hose ends",
    body: "They soften the water flow and keep the hoses from resting on the plaster and leaving marks.",
  },
  {
    lead: "Don't touch the bucket",
    body: "The Orenda bucket near the pool holds our startup treatment, which balances the water as the pool fills.",
  },
  {
    lead: "Stop the water when it reaches halfway up the waterline tile",
    textWhenFull: true,
  },
  {
    lead: "Stay off the surface",
    body: "No walking on the plaster, and nothing tossed in the pool.",
  },
] as const;

export const startupVisits = [
  {
    visit: "1",
    detail: "Start up the equipment, balance the water, add startup treatment, brush, and net the pool",
  },
  {
    visit: "2",
    detail: "Install return fittings, add stabilizer, balance the water, brush",
  },
  {
    visit: "3",
    detail: "Start punch list items, add chlorine, balance the water, brush",
  },
  {
    visit: "4",
    detail: "Finish punch list items, balance the water, brush",
  },
  {
    visit: "5",
    detail: "Balance the water, brush, and schedule your final walkthrough",
  },
  {
    visit: "6",
    detail: "Final walkthrough with you and our General Manager, balance the water, brush, clean the filter",
  },
] as const;

export const startupDonts = [
  {
    action: "Swim",
    until: "We've sanitized the pool, about 1 week after fill. We'll tell you when.",
  },
  {
    action: "Add any chemicals (including chlorine tabs or shock)",
    until: "We handle all chemistry during startup",
  },
  {
    action: "Change the pump schedule or settings",
    until: "Our final walkthrough",
  },
  {
    action: "Run a robot or automatic pool cleaner",
    until: "Day 30",
    emphasis: true,
  },
  {
    action: "Turn on the heater",
    until: "Day 30",
    emphasis: true,
  },
  {
    action: "Add salt or turn on the salt system",
    until: "Day 30",
    emphasis: true,
  },
  {
    action: "Use metal tools, stiff brushes, or metal leaf rakes",
    until: "Ever. They scratch and stain plaster.",
    emphasis: true,
  },
] as const;

export const startupNormal = [
  {
    title: "Light dust and construction debris",
    body: "This clears with brushing and filtering.",
    warning: "Heavy or lasting plaster dust is not normal. Call us.",
  },
  {
    title: "Uneven color or mottling",
    body: "This is natural in plaster, especially colored and quartz finishes. Color usually evens out over the first several months.",
  },
  {
    title: "Missing return fittings at first",
    body: "We install them on Visit 2.",
  },
  {
    title: "Slight greenish water",
    body: "Fill water may turn a slight greenish color until it is chlorinated. We add chlorine on Visit 3, and the color clears after that.",
  },
] as const;

export const startupCallIf = [
  "The water level dropping noticeably",
  "The pump not running after Visit 1",
  "Heavy or lasting plaster dust",
  "Stains, spots, or rough patches appearing",
  "Anything that doesn't look right",
] as const;

export const startupToc = [
  { href: "#before-fill", label: "Before fill" },
  { href: "#fill-day", label: "Fill day" },
  { href: "#brushing", label: "Brushing" },
  { href: "#visits", label: "Our visits" },
  { href: "#please-dont", label: "Please don't" },
  { href: "#whats-normal", label: "What's normal" },
  { href: "#call-us", label: "Call us" },
  { href: "#after-walkthrough", label: "After walkthrough" },
] as const;
