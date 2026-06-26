"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/trust";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" muted>
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description="Straight answers about what we do — and what we don't."
        />

        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-slate-900">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-slate-500 transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen ? (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
