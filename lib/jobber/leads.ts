import { formatLeadSourceLabel } from "@/content/contact-form";
import { serviceOptions } from "@/content/services";
import type { ContactFormData } from "@/lib/validations/contact";
import {
  findOrCreateWebsiteClient,
  editClientCustomFields,
  resolveServicePropertyId,
} from "@/lib/jobber/clients";
import {
  REQUEST_REFERRING_CLIENT_FIELD,
  applyReferredByAfterCreate,
  applyReferredByOnCreateInput,
  resolveReferringClientId,
} from "@/lib/jobber/referrals";
import {
  buildClientCustomFieldInputs,
  findClientTextCustomField,
  getJobberClientCustomFieldIds,
  JOBBER_CF_GOOGLE_CLICK_ID_NAME,
  JOBBER_CF_LEAD_SOURCE_NAME,
  JOBBER_CF_REFERRAL_NAME,
  logMissingCustomFieldSetup,
} from "@/lib/jobber/custom-fields";
import { JOBBER_LEAD_SOURCE } from "@/lib/jobber/config";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import { attachLeadNotes } from "@/lib/jobber/notes";
import type { JobberAddressInput } from "@/lib/jobber/property";
import { attachPhotosToRequest } from "@/lib/jobber/request-attachments";
import { buildRequestDetailsVariants, getRequestFormIds } from "@/lib/jobber/request-form";
import type { AdClickId } from "@/lib/ads/click-id";

const CREATE_REQUEST_MUTATION = `
  mutation CreateWebsiteLeadRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request {
        id
        title
        source
        jobberWebUri
        property {
          id
          address {
            street1
            city
            province
            postalCode
          }
        }
      }
      userErrors {
        message
        path
      }
    }
  }
`;

type RequestCreateResult = {
  requestCreate: {
    request: {
      id: string;
      title: string;
      source: string;
      jobberWebUri: string;
      property: {
        id: string;
        address: {
          street1: string;
          city: string;
          province: string;
          postalCode: string;
        };
      } | null;
    } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

const EDIT_REQUEST_MUTATION = `
  mutation EditWebsiteLeadRequest($requestId: EncodedId!, $input: RequestEditInput!) {
    requestEdit(requestId: $requestId, input: $input) {
      request {
        id
        source
        title
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const REQUEST_SOURCE_SCHEMA_QUERY = `
  query RequestSourceSchema {
    create: __type(name: "RequestCreateInput") {
      inputFields { name }
    }
    edit: __type(name: "RequestEditInput") {
      inputFields { name }
    }
  }
`;

type RequestEditResult = {
  requestEdit: {
    request: { id: string; source: string; title: string } | null;
    userErrors: Array<{ message: string; path?: string[] }>;
  };
};

type RequestSourceWritePath = "create" | "edit" | null;

let cachedSourceWritePath: RequestSourceWritePath | undefined;

async function getRequestSourceWritePath(): Promise<RequestSourceWritePath> {
  if (cachedSourceWritePath !== undefined) {
    return cachedSourceWritePath;
  }

  try {
    const result = await jobberGraphql<{
      create: { inputFields: Array<{ name: string }> } | null;
      edit: { inputFields: Array<{ name: string }> } | null;
    }>(REQUEST_SOURCE_SCHEMA_QUERY);

    const createHasSource = Boolean(
      result.create?.inputFields.some((field) => field.name === "source"),
    );
    const editHasSource = Boolean(
      result.edit?.inputFields.some((field) => field.name === "source"),
    );
    cachedSourceWritePath = createHasSource ? "create" : editHasSource ? "edit" : null;
  } catch (error) {
    console.warn("[Jobber] Could not inspect request source fields:", error);
    cachedSourceWritePath = null;
  }

  return cachedSourceWritePath;
}

async function applyRequestSource(
  requestId: string,
  source: string,
  currentSource?: string,
) {
  if (currentSource === source) {
    return;
  }

  const writePath = await getRequestSourceWritePath();
  if (writePath !== "edit") {
    if (writePath !== "create") {
      console.warn(
        `[Jobber] Request source stays "${currentSource ?? "911 Pool Care Website"}". ` +
          "Jobber does not let API apps set that box; how they found us is in Overview and the client Lead Source field.",
      );
    }
    return;
  }

  try {
    const result = await jobberGraphql<RequestEditResult>(EDIT_REQUEST_MUTATION, {
      requestId,
      input: { source },
    });
    const errors = formatUserErrors(result.requestEdit.userErrors);
    if (errors) {
      console.warn("[Jobber] requestEdit source:", errors);
      return;
    }
    console.info("[Jobber] Request source set", {
      requestId,
      source: result.requestEdit.request?.source ?? source,
    });
  } catch (error) {
    console.warn("[Jobber] requestEdit source failed:", error);
  }
}

const SERVICE_SHORT_LABELS: Record<string, string> = {
  "leak-detection": "Leak",
  renovation: "Renovation",
  "equipment-repair": "Equipment",
  inspection: "Inspection",
  other: "Other",
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "Website",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "Lead",
  };
}

function getServiceLabels(serviceValues: string[]) {
  return serviceValues.map((value) => {
    return (
      serviceOptions.find((option) => option.value === value)?.label ??
      "Pool service request"
    );
  });
}

function getReferralLabel(data: ContactFormData) {
  return formatLeadSourceLabel(data);
}

function buildAddress(data: ContactFormData): JobberAddressInput {
  return {
    street1: data.street.trim(),
    city: data.city.trim(),
    province: data.state.trim().toUpperCase(),
    postalCode: data.zip.trim(),
    country: "United States",
  };
}

function formatAddressLine(address: JobberAddressInput) {
  return `${address.street1}, ${address.city}, ${address.province} ${address.postalCode}`;
}

function buildRequestTitle(data: ContactFormData, serviceValues: string[]) {
  const shortLabels = serviceValues.map(
    (value) => SERVICE_SHORT_LABELS[value] ?? value,
  );
  const services =
    shortLabels.length <= 3
      ? shortLabels.join(" + ")
      : `${shortLabels.length} services`;
  const address = buildAddress(data);
  const location = `${address.city}, ${address.province}`;
  return `${services} — ${location}`.slice(0, 255);
}

function buildRequestNote(
  data: ContactFormData,
  serviceLabels: string[],
  adClick?: AdClickId | null,
) {
  const referral = getReferralLabel(data);
  const lines = [
    `Website lead — submitted via ${JOBBER_LEAD_SOURCE}`,
  ];
  if (referral) {
    lines.push("", `How they found us: ${referral}`);
  }
  lines.push(
    "",
    "Services requested:",
    ...serviceLabels.map((label) => `- ${label}`),
    "",
    `Service address: ${formatAddressLine(buildAddress(data))}`,
  );

  const companyName = data.companyName?.trim();
  if (companyName) {
    lines.push("", `Company: ${companyName}`);
  }

  if (adClick) {
    lines.push("", `Ad click ID: ${adClick.value} (${adClick.source})`);
  }

  if (data.message.trim()) {
    lines.push("", "Customer message:", data.message.trim());
  }

  if (data.attachments?.length) {
    lines.push("", "Photos / videos:");
    for (const attachment of data.attachments) {
      lines.push(`- ${attachment.name}: ${attachment.url}`);
    }
  }

  return lines.join("\n");
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^1(\d{10})$/, "$1");
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone.trim();
}

async function createRequest(
  clientId: string,
  propertyId: string | null,
  title: string,
  data: ContactFormData,
  referringClientId: string | null,
  adClick?: AdClickId | null,
  source?: string | null,
) {
  const baseInput: Record<string, unknown> = { clientId, title };
  if (propertyId) {
    baseInput.propertyId = propertyId;
  }
  if (referringClientId) {
    baseInput[REQUEST_REFERRING_CLIENT_FIELD] = referringClientId;
  }
  if (source && (await getRequestSourceWritePath()) === "create") {
    baseInput.source = source;
  }

  const requestDetailsVariants = buildRequestDetailsVariants(data, adClick);
  const layouts = ["overview-full", "overview-details", "sections"] as const;
  const formIds = getRequestFormIds();
  const inputs: Array<{
    input: Record<string, unknown>;
    layout: (typeof layouts)[number] | "none";
  }> = requestDetailsVariants.map((requestDetails, index) => ({
    input: {
      ...baseInput,
      requestDetails,
      ...(formIds.length ? { formIds } : {}),
    },
    layout: layouts[index] ?? "sections",
  }));

  if (!inputs.length) {
    inputs.push({ input: baseInput, layout: "none" });
  }

  let lastErrors: string | null = null;

  for (const { input, layout } of inputs) {
    const result = await jobberGraphql<RequestCreateResult>(CREATE_REQUEST_MUTATION, {
      input,
    });

    const errors = formatUserErrors(result.requestCreate.userErrors);
    if (!errors) {
      const request = result.requestCreate.request;
      if (!request) {
        throw new Error("Jobber requestCreate returned no request");
      }
      if (layout === "none") {
        console.warn(
          "[Jobber] requestCreate succeeded without requestDetails — Service Details will be empty",
        );
      } else if (layout !== "overview-full") {
        console.warn(
          "[Jobber] requestCreate succeeded with fallback requestDetails layout",
          { layout, lastErrors },
        );
      } else {
        console.info("[Jobber] requestCreate included requestDetails + propertyId");
      }
      return request;
    }

    lastErrors = errors;
    if (layout === "none") {
      break;
    }
    console.error("[Jobber] requestCreate with requestDetails failed:", {
      layout,
      errors,
    });
  }

  throw new Error(`Jobber requestCreate failed: ${lastErrors ?? "unknown error"}`);
}

export async function createJobberLeadFromContact(
  data: ContactFormData,
  adClick?: AdClickId | null,
) {
  const { firstName, lastName } = splitName(data.name);
  const serviceLabels = getServiceLabels(data.services);
  const referralLabel = getReferralLabel(data);
  const address = buildAddress(data);
  const requestTitle = buildRequestTitle(data, data.services);
  const requestNote = buildRequestNote(data, serviceLabels, adClick);
  const phone = normalizePhone(data.phone);

  const customFieldIds = await getJobberClientCustomFieldIds();
  logMissingCustomFieldSetup(customFieldIds);

  const customFields = buildClientCustomFieldInputs(
    customFieldIds,
    serviceLabels,
    referralLabel,
    adClick?.value,
  );

  const clientInput: Record<string, unknown> = {
    firstName,
    lastName,
    emails: [{ address: data.email, primary: true, description: "MAIN" }],
    phones: [{ number: phone, primary: true, description: "MAIN" }],
    billingAddress: address,
    properties: [{ address }],
  };

  const companyName = data.companyName?.trim();
  if (companyName) {
    clientInput.companyName = companyName;
  }

  if (customFields.length) {
    clientInput.customFields = customFields;
  }

  const referringClientId = await resolveReferringClientId(data);
  await applyReferredByOnCreateInput(clientInput, data, referringClientId);

  const { client, created } = await findOrCreateWebsiteClient({
    email: data.email,
    clientInput,
    address,
  });

  await applyReferredByAfterCreate(created, client.id, data, referringClientId);

  const fieldEdits: Array<{ id: string; valueText: string }> = [];

  if (referralLabel) {
    const leadFieldId =
      customFieldIds.referralSourceId ??
      (await findClientTextCustomField(client.id, JOBBER_CF_LEAD_SOURCE_NAME))
        ?.id ??
      (await findClientTextCustomField(client.id, JOBBER_CF_REFERRAL_NAME))
        ?.id ??
      null;

    if (leadFieldId) {
      fieldEdits.push({ id: leadFieldId, valueText: referralLabel });
    } else {
      console.warn(
        `[Jobber] Could not resolve "${JOBBER_CF_LEAD_SOURCE_NAME}" custom field. ` +
          "Request note still includes the lead source. Create a Client text field named Lead Source, or set JOBBER_CF_REFERRAL_SOURCE_ID.",
      );
    }
  }

  if (adClick) {
    const clickFieldId =
      customFieldIds.googleClickId ??
      (await findClientTextCustomField(client.id, JOBBER_CF_GOOGLE_CLICK_ID_NAME))
        ?.id ??
      null;

    if (clickFieldId) {
      fieldEdits.push({ id: clickFieldId, valueText: adClick.value });
    } else {
      console.warn(
        `[Jobber] Could not resolve "${JOBBER_CF_GOOGLE_CLICK_ID_NAME}" custom field. ` +
          "Request note still includes the click ID. Set JOBBER_CF_GOOGLE_CLICK_ID or re-authorize with custom_field_configurations read.",
      );
    }
  }

  if (fieldEdits.length) {
    try {
      await editClientCustomFields(client.id, fieldEdits);
    } catch (error) {
      console.warn("[Jobber] editClientCustomFields:", error);
    }
  }

  const propertyId = await resolveServicePropertyId(client, address, created);

  const request = await createRequest(
    client.id,
    propertyId,
    requestTitle,
    data,
    referringClientId,
    adClick,
    referralLabel,
  );

  if (referralLabel) {
    await applyRequestSource(request.id, referralLabel, request.source);
  }

  try {
    await attachLeadNotes({
      clientId: client.id,
      requestId: request.id,
      message: requestNote,
    });
  } catch (error) {
    console.warn("[Jobber] attachLeadNotes:", error);
  }

  if (data.attachments?.length) {
    void attachPhotosToRequest(request.id, data.attachments)
      .then((result) => {
        console.info("[Jobber] Request photos attached", {
          requestId: request.id,
          attached: result.attached,
        });
      })
      .catch((error) => {
        console.warn("[Jobber] attachPhotosToRequest:", error);
      });
  }

  console.info("[Jobber] Lead created", {
    clientId: client.id,
    requestId: request.id,
    propertyId: request.property?.id ?? propertyId,
    referringClientId,
    reusedClient: !created,
    leadSource: referralLabel,
    requestSource: request.source,
    adClickSource: adClick?.source ?? null,
  });

  return {
    clientId: client.id,
    clientUri: client.jobberWebUri,
    requestId: request.id,
    requestUri: request.jobberWebUri,
    propertyId: request.property?.id ?? propertyId,
  };
}
