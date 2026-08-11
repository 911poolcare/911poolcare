import { teamMembers, type TeamMember } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TeamSectionProps = {
  members?: TeamMember[];
  eyebrow?: string;
  title?: string;
  description?: string;
  muted?: boolean;
};

export function TeamSection({
  members = teamMembers,
  eyebrow = "Our team",
  title = "Real specialists — not an anonymous crew",
  description = "You know who you're working with: named technicians, a dedicated renovation project manager, and an office lead who answers the phone.",
  muted = false,
}: TeamSectionProps) {
  return (
    <Section muted={muted}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ul className="grid gap-5 sm:grid-cols-2">
          {members.map((member) => (
            <li
              key={member.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xl font-bold text-slate-900">{member.name}</p>
              <p className="mt-1 text-sm font-semibold text-brand-700">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.focus}</p>
              {member.credentials && member.credentials.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {member.credentials.map((credential) => (
                    <li
                      key={credential}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 ring-1 ring-brand-200"
                    >
                      {credential}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
