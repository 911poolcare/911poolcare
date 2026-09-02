import Image from "next/image";
import type { JobProgressSet } from "@/content/media";
import { renovationCollageCopy } from "@/content/renovations";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Stage = {
  key: "before" | "during" | "after";
  label: string;
  image: { src: string; alt: string };
};

type RenovationCollageProps = {
  sets: JobProgressSet[];
  cityName?: string;
};

const STAGE_FRAME: Record<Stage["key"], string> = {
  before: "lg:-rotate-2 lg:translate-y-8 lg:z-0",
  during: "lg:z-10 lg:-translate-y-1 lg:scale-[1.04]",
  after: "lg:rotate-2 lg:translate-y-8 lg:z-0",
};

function stagesFromSet(set: JobProgressSet): Stage[] {
  const stages: Stage[] = [];
  if (set.before) {
    stages.push({ key: "before", label: "Before", image: set.before });
  }
  if (set.during) {
    stages.push({ key: "during", label: "During", image: set.during });
  }
  if (set.after) {
    stages.push({ key: "after", label: "After", image: set.after });
  }
  return stages;
}

function StageFrame({ stage }: { stage: Stage }) {
  return (
    <figure className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-[0_18px_40px_-18px_rgba(22,42,83,0.45)] ring-1 ring-slate-200/80">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={stage.image.src}
          alt={stage.image.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 32vw, 360px"
          className="object-cover"
        />
        <figcaption className="absolute left-3 top-3 rounded-full bg-brand-950/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
          {stage.label}
        </figcaption>
      </div>
    </figure>
  );
}

function CollageSet({ set, showLabel }: { set: JobProgressSet; showLabel: boolean }) {
  const stages = stagesFromSet(set);
  if (stages.length < 2) return null;

  return (
    <article>
      {showLabel ? (
        <p className="mb-5 text-center text-sm font-semibold text-slate-900">
          {set.label}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-3 sm:items-end lg:flex lg:items-end lg:justify-center lg:gap-0 lg:-space-x-8">
        {stages.map((stage) => (
          <div
            key={stage.key}
            className={cn("w-full lg:max-w-sm lg:flex-1", STAGE_FRAME[stage.key])}
          >
            <StageFrame stage={stage} />
          </div>
        ))}
      </div>
    </article>
  );
}

export function RenovationCollage({ sets, cityName }: RenovationCollageProps) {
  const visible = sets.filter((set) => stagesFromSet(set).length >= 2);
  if (visible.length === 0) return null;

  return (
    <Section className="overflow-hidden bg-gradient-to-b from-brand-50/80 to-white">
      <Container>
        <SectionHeading
          eyebrow={renovationCollageCopy.eyebrow}
          title={
            cityName
              ? renovationCollageCopy.cityTitle(cityName)
              : renovationCollageCopy.hubTitle
          }
          description={
            cityName
              ? renovationCollageCopy.cityDescription(cityName)
              : renovationCollageCopy.hubDescription
          }
        />
        <div className="space-y-16">
          {visible.map((set) => (
            <CollageSet
              key={set.id}
              set={set}
              showLabel={!cityName && visible.length > 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
