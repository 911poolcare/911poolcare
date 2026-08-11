export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  credentials?: readonly string[];
  /** Service page contexts where this person should be featured */
  services: readonly (
    | "pool-leak-detection"
    | "pool-equipment-repair"
    | "pool-renovations"
    | "pool-inspections"
    | "office"
  )[];
};

export const teamMembers: TeamMember[] = [
  {
    id: "chris",
    name: "Chris",
    role: "General Manager & Renovation Project Manager",
    focus:
      "Owns renovation projects from consultation through walkthrough, and performs certified pool inspections for buyers, sellers, and realtors.",
    credentials: ["Certified Pool Inspector (CPI)", "Renovation project management"],
    services: ["pool-renovations", "pool-inspections"],
  },
  {
    id: "danielle",
    name: "Danielle",
    role: "Head Technician",
    focus:
      "Leads pool electrical work, equipment repair, leak detection, and quality control on repair jobs across Central Texas.",
    credentials: ["RAIL certified"],
    services: ["pool-leak-detection", "pool-equipment-repair"],
  },
  {
    id: "steven",
    name: "Steven",
    role: "Field Technician",
    focus:
      "Handles leak detection, pool repairs, and general field repair work with clear communication on every job.",
    services: ["pool-leak-detection"],
  },
  {
    id: "breanna",
    name: "Breanna",
    role: "Office Manager",
    focus:
      "Handles inbound calls, emails, and client requests — quotes, scheduling, and keeping projects coordinated from first contact.",
    services: ["office"],
  },
] as const;

export function getTeamForService(
  serviceSlug: TeamMember["services"][number] | string,
): TeamMember[] {
  return teamMembers.filter((member) =>
    member.services.includes(serviceSlug as TeamMember["services"][number]),
  );
}
