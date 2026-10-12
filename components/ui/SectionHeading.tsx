export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const Heading = as;

  return (
    <div className={`mb-10 max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
