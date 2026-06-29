import type { ContactFormData } from "@/lib/validations/contact";
import { referralSourceOptions } from "@/content/contact-form";
import { serviceOptions } from "@/content/services";

/** Jobber request form section labels — must match your Jobber form template. */
const SECTION_OVERVIEW =
  process.env.JOBBER_FORM_SECTION ?? "Overview";

/** Question labels on the default Jobber request form. Override via env if renamed. */
const QUESTION_SERVICES =
  process.env.JOBBER_FORM_Q_SERVICES ?? "General service selection";
const QUESTION_DETAILS =
  process.env.JOBBER_FORM_Q_DETAILS ?? "Service Details";
const QUESTION_SERVICES_PROMPT =
  process.env.JOBBER_FORM_Q_SERVICES_PROMPT ??
  "What services are you interested in?";
const QUESTION_DETAILS_PROMPT =
  process.env.JOBBER_FORM_Q_DETAILS_PROMPT ??
  "Please let us know what issue you are having or what work we can help you accomplish";

type FormItemInput = Record<string, string>;
type FormSectionInput = { label: string; items: FormItemInput[] };
type RequestDetailsInput = { form: { sections: FormSectionInput[] } };

function getServiceLabels(serviceValues: string[]) {
  return serviceValues.map((value) => {
    return (
      serviceOptions.find((option) => option.value === value)?.label ??
      value
    );
  });
}

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

function buildFormItem(label: string, value: string): FormItemInput {
  const valueKey = process.env.JOBBER_FORM_ITEM_VALUE_FIELD ?? "answerText";
  return { label, [valueKey]: value };
}

function buildDetailsText(data: ContactFormData, serviceLabels: string[]) {
  const lines = [
    ...serviceLabels.map((label) => `- ${label}`),
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

/** Builds requestDetails.form for requestCreate when Jobber form wiring is enabled. */
export function buildRequestDetailsInput(
  data: ContactFormData,
): RequestDetailsInput | null {
  if (process.env.JOBBER_REQUEST_FORM_ENABLED === "0") {
    return null;
  }

  const serviceLabels = getServiceLabels(data.services);
  const items: FormItemInput[] = [
    buildFormItem(QUESTION_SERVICES, serviceLabels.join(", ")),
    buildFormItem(QUESTION_DETAILS, buildDetailsText(data, serviceLabels)),
  ];

  // Jobber matches on section + item labels. Try section-per-field if the default
  // Overview wrapper does not populate (set JOBBER_FORM_LAYOUT=sections).
  if (process.env.JOBBER_FORM_LAYOUT === "sections") {
    return {
      form: {
        sections: [
          {
            label: QUESTION_SERVICES,
            items: [
              buildFormItem(QUESTION_SERVICES_PROMPT, serviceLabels.join(", ")),
            ],
          },
          {
            label: QUESTION_DETAILS,
            items: [buildFormItem(QUESTION_DETAILS_PROMPT, buildDetailsText(data, serviceLabels))],
          },
        ],
      },
    };
  }

  return {
    form: {
      sections: [
        {
          label: SECTION_OVERVIEW,
          items,
        },
      ],
    },
  };
}
