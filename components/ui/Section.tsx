import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  muted = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-16 lg:py-20",
        muted && "bg-slate-50",
        className,
      )}
    >
      {children}
    </section>
  );
}
