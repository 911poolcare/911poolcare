import Image from "next/image";
import type { JobProgressSet } from "@/content/media";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type JobProgressGalleryProps = {
  sets: JobProgressSet[];
  title?: string;
  description?: string;
};

function StageCard({
  label,
  image,
}: {
  label: string;
  image: { src: string; alt: string };
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <p className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-brand-700">
        {label}
      </p>
    </div>
  );
}

export function JobProgressGallery({
  sets,
  title = "Before, during & after",
  description = "Photos from the same pool job — how we diagnose, repair, and finish the work.",
}: JobProgressGalleryProps) {
  if (sets.length === 0) return null;

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Same job, start to finish" title={title} description={description} />
        <ul className="space-y-8">
          {sets.map((set) => (
            <li
              key={set.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-6"
            >
              <p className="mb-4 text-sm font-semibold text-slate-900">{set.label}</p>
              <div
                className={`grid gap-3 ${
                  set.during ? "sm:grid-cols-3" : "sm:grid-cols-2"
                }`}
              >
                {set.before ? <StageCard label="Before" image={set.before} /> : null}
                {set.during ? <StageCard label="During" image={set.during} /> : null}
                {set.after ? <StageCard label="After" image={set.after} /> : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
