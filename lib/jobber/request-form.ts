import type { ContactFormData } from "@/lib/validations/contact";
import { referralSourceOptions } from "@/content/contact-form";

/**
 * Jobber checkbox option labels — must match Settings → Requests → Forms exactly.
 */
const JOBBER_SERVICE_OPTION_LABELS: Record<string, string> = {
  "leak-detection": "Leak detection & repair",
  renovation: "Pool renovation",
  "equipment-repair": "Pool Equipment Repair & Replacement",
  inspection: "Pool inspection",
  other: "Other",
};

const SECTION_SERVICES =
  process.env.JOBBER_FORM_Q_SERVICES ?? "General service selection";
const SECTION_DETAILS =
  process.env.JOBBER_FORM_Q_DETAILS ?? "Service Details";
const SECTION_OVERVIEW =
  process.env.JOBBER_FORM_SECTION ?? "Overview";

/** Optional form template IDs — only set JOBBER_REQUEST_FORM_IDS when validated in Jobber. */
export function getRequestFormIds(): string[] {
  if (process.env.JOBBER_REQUEST_FORM_ENABLED === "0") {
    return [];
  }
  const raw = process.env.JOBBER_REQUEST_FORM_IDS?.trim();
  if (!raw) {
    return [];
  }
  return raw.split(",").map((id) => id.trim()).filter(Boolean);
}

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

function buildDetailsText(data: ContactFormData, serviceOptions: string[]) {
  const lines = [
    "Services requested:",
    ...serviceOptions.map((label) => `- ${label}`),
    "",
    data.message.trim(),
  ];

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

/** Proven layout: Overview section, Service Details item only (form-probe confirmed). */
function buildOverviewDetailsLayout(data: ContactFormData): RequestDetailsInput {
  const serviceOptions = getJobberServiceOptions(data.services);
  return {
    form: {
      sections: [
        {
          label: SECTION_OVERVIEW,
          items: [
            {
              label: SECTION_DETAILS,
              answerText: buildDetailsText(data, serviceOptions),
            },
          ],
        },
      ],
    },
  };
}

/** Overview with both service selection + details items. */
function buildOverviewFullLayout(data: ContactFormData): RequestDetailsInput {
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
              answerText: buildDetailsText(data, serviceOptions),
            },
          ],
        },
      ],
    },
  };
}

/** Each field as its own section (alternate Jobber form shape). */
function buildSectionsLayout(data: ContactFormData): RequestDetailsInput {
  const serviceOptions = getJobberServiceOptions(data.services);
  return {
    form: {
      sections: [
        {
          label: SECTION_SERVICES,
          items: [
            { label: SECTION_SERVICES, answerText: serviceOptions.join("\n") },
          ],
        },
        {
          label: SECTION_DETAILS,
          items: [
            {
              label: SECTION_DETAILS,
              answerText: buildDetailsText(data, serviceOptions),
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

  if (process.env.JOBBER_FORM_LAYOUT === "sections") {
    return buildSectionsLayout(data);
  }
  if (process.env.JOBBER_FORM_LAYOUT === "overview-full") {
    return buildOverviewFullLayout(data);
  }

  // Default: overview-full (services + details) — production-verified.
  return buildOverviewFullLayout(data);
}

/** Layout variants to try when requestCreate rejects the primary shape. */
export function buildRequestDetailsVariants(
  data: ContactFormData,
): RequestDetailsInput[] {
  if (process.env.JOBBER_REQUEST_FORM_ENABLED === "0") {
    return [];
  }

  return [
    buildOverviewFullLayout(data),
    buildOverviewDetailsLayout(data),
    buildSectionsLayout(data),
  ];
}

export const JOBBER_SERVICE_LABEL_MAP = JOBBER_SERVICE_OPTION_LABELS;

export function describeRequestFormPayload(data: ContactFormData) {
  return buildRequestDetailsInput(data);
}
