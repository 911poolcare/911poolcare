"use client";

import { Button } from "@/components/ui/Button";

export function PrintReportButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="border-brand-700 text-brand-800 hover:bg-brand-50 print:hidden"
      onClick={() => window.print()}
    >
      Print / save as PDF
    </Button>
  );
}
