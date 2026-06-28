import { pricing } from "@/content/pricing";
import { poolEquipment } from "@/content/equipment";
import { site } from "@/content/site";

type ServicePricingProps = {
  serviceSlug: string;
};

export function ServicePricing({ serviceSlug }: ServicePricingProps) {
  if (serviceSlug === "pool-leak-detection") {
    return (
      <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">Leak detection pricing</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          {pricing.leakDetection.pricingLines.map((line) => (
            <li key={line.label} className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <span>
                <span className="font-medium text-slate-900">{line.label}</span>
                {"note" in line && line.note ? (
                  <span className="mt-0.5 block text-slate-600">{line.note}</span>
                ) : null}
              </span>
              <span className="shrink-0 font-semibold text-brand-800">{line.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-slate-700">
          {pricing.leakDetection.repairNote}
        </p>

        <div className="mt-6 rounded-xl border border-brand-200 bg-white p-5">
          <h4 className="font-semibold text-slate-900">Residential down-payment guarantee</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {pricing.leakDetection.residentialGuaranteeDetail}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            {pricing.leakDetection.commercialNote} {pricing.leakDetection.partnerNote}
          </p>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Final pricing depends on your pool setup. We confirm the detection fee before work
          begins.
        </p>
      </div>
    );
  }

  if (serviceSlug === "pool-equipment-repair") {
    return (
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">Equipment we repair</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {poolEquipment.items.map((item) => (
            <li
              key={item}
              className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
            >
              {item}
            </li>
          ))}
        </ul>
        <h3 className="mt-6 text-lg font-semibold text-slate-900">Diagnostic pricing</h3>

        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li>{pricing.equipment.pumpDiagnostic.summary}</li>
          <li>{pricing.equipment.heaterDiagnostic.summary}</li>
        </ul>

        <p className="mt-4 text-xs text-slate-500">
          {site.railCertified.description} Diagnostic fees apply to pump and heater
          troubleshooting. Repair credits are applied when you approve the recommended
          repair work.
        </p>
      </div>
    );
  }

  if (serviceSlug === "pool-renovations") {
    return (
      <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          {pricing.renovation.consultationLabel}
        </h3>
        <p className="mt-2 text-sm text-slate-700">
          {pricing.renovation.consultationDescription}
        </p>
      </div>
    );
  }

  if (serviceSlug === "pool-inspections") {
    return (
      <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">Inspection pricing</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          {pricing.inspection.summary}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          {pricing.inspection.coldWaterSummary}
        </p>
        <p className="mt-4 text-xs text-slate-500">
          Full checklist, report details, and important notes are listed below on this page.
        </p>
      </div>
    );
  }

  return null;
}
