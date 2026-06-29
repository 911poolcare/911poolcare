import type { ContactFormData } from "@/lib/validations/contact";
import { referralSourceOptions } from "@/content/contact-form";

/**
 * Jobber request form option labels — must match the default request form
 * in Jobber → Settings → Requests → Forms exactly (case and punctuation).
 */
const JOBBER_SERVICE_OPTION_LABELS: Record<string, string> = {
  "leak-detection": "Leak detection & repair",
  renovation: "Pool renovation",
  "equipment-repair": "Pool Equipment Repair & Replacement",
  inspection: "Pool inspection",
  "pool-company-partner": "Other",
  other: "Other",
};

/** Section headers shown in Jobber's Overview block. */
const SECTION_SERVICES =
  process.env.JOBBER_FORM_Q_SERVICES ?? "General service selection";
const SECTION_DETAILS =
  process.env.JOBBER_FORM_Q_DETAILS ?? "Service Details";
const SECTION_OVERVIEW =
  process.env.JOBBER_FORM_SECTION ?? "Overview";

/** Question prompts inside each section (item labels for FormItemInput). */
const PROMPT_SERVICES =
  process.env.JOBBER_FORM_Q_SERVICES_PROMPT ??
  "What services are you interested in?";
const PROMPT_DETAILS =
  process.env.JOBBER_FORM_Q_DETAILS_PROMPT ??
  "Please let us know what issue you are having or what work we can help you accomplish";

/** Website service values → exact Jobber checkbox option text. */
export const JOBBER_SERVICE_LABEL_MAP = JOBBER_SERVICE_OPTION_LABELS;

type FormItemInput = { label: string; answerText: string };
type FormSectionInput = { label: string; items: FormItemInput[] };
export type RequestDetailsInput = { form: { sections: FormSectionInput[] } };

function getReferralLabel(data: ContactFormData) {
  if (!data.referralSource) return null;
  if (data.referralSource === "other") {
    return data.referralSourceOther?.trim() || "Other";
  }
  return (
    referralSourceOptions.find((option) => option.value === data.referralSource)
      ?.label ?? data.referralSource
  );
}

function getJobberServiceOptions(serviceValues: string[]) {
  return serviceValues.map(
    (value) => JOBBER_SERVICE_OPTION_LABELS[value] ?? value,
  );
}

function buildDetailsText(data: ContactFormData) {
  const lines = [data.message.trim()];

  const referral = getReferralLabel(data);
  if (referral) {
    lines.push("", `How they found us: ${referral}`);
  }

  const partner = data.referringPartnerCompany?.trim();
  if (partner) {
    lines.push("", `Referring partner: ${partner}`);
  }

  if (data.attachments?.length) {
    lines.push("", "Photos / videos:");
    for (const attachment of data.attachments) {
      lines.push(`${attachment.name}: ${attachment.url}`);
    }
  }

  return lines.join("\n");
}

function buildSectionsLayout(data: ContactFormData): RequestDetailsInput {
  const serviceOptions = getJobberServiceOptions(data.services);

  // Jobber matches form answers on item.label — use the field header names
  // shown in the Overview UI ("General service selection", "Service Details").
  return {
    form: {
      sections: [
        {
          label: SECTION_SERVICES,
          items: [
            {
              label: SECTION_SERVICES,
              answerText: serviceOptions.join("\n"),
            },
          ],
        },
        {
          label: SECTION_DETAILS,
          items: [
            {
              label: SECTION_DETAILS,
              answerText: buildDetailsText(data),
            },
          ],
        },
      ],
    },
  };
}

function buildOverviewLayout(data: ContactFormData): RequestDetailsInput {
  const serviceOptions = getJobberServiceOptions(data.services);

  return {
    form: {
      sections: [
        {
          label: SECTION_OVERVIEW,
          items: [
            {
              label: SECTION_SERVICES,
              answerText: serviceOptions.join("\n"),
            },
            {
              label: SECTION_DETAILS,
              answerText: buildDetailsText(data),
            },
          ],
        },
      ],
    },
  };
}

/** Builds requestDetails.form for requestCreate when Jobber form wiring is enabled. */
export function buildRequestDetailsInput(
  data: ContactFormData,
): RequestDetailsInput | null {
  if (process.env.JOBBER_REQUEST_FORM_ENABLED === "0") {
    return null;
  }

  if (process.env.JOBBER_FORM_LAYOUT === "overview") {
    return buildOverviewLayout(data);
  }

  return buildSectionsLayout(data);
}

/** Layout variants to try when requestCreate rejects the primary shape. */
export function buildRequestDetailsVariants(
  data: ContactFormData,
): RequestDetailsInput[] {
  if (process.env.JOBBER_REQUEST_FORM_ENABLED === "0") {
    return [];
  }

  return [buildSectionsLayout(data), buildOverviewLayout(data)];
}

/** Exposed for diagnostics — shows the payload shape sent to Jobber. */
export function describeRequestFormPayload(data: ContactFormData) {
  return buildRequestDetailsInput(data);
}
