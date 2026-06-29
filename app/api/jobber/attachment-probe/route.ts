import { NextResponse } from "next/server";
import { isJobberConfigured } from "@/lib/jobber/config";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import { createClientProperty } from "@/lib/jobber/property";
import { buildRequestDetailsInput } from "@/lib/jobber/request-form";
import type { ContactFormData } from "@/lib/validations/contact";

const INTROSPECTION = `
  query AttachmentIntrospection {
    mutationType: __schema {
      mutationType {
        fields {
          name
        }
      }
    }
    formAttachmentInput: __type(name: "FormAttachmentInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    formItemInput: __type(name: "FormItemInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    requestNoteFile: __type(name: "RequestNoteFile") {
      fields {
        name
        type { name kind ofType { name } }
      }
    }
  }
`;

const CREATE_CLIENT = `
  mutation AttachmentProbeClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client { id properties { id } }
      userErrors { message path }
    }
  }
`;

const CREATE_REQUEST = `
  mutation AttachmentProbeRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request {
        id
        jobberWebUri
        noteAttachments(first: 5) {
          nodes {
            id
            fileName
            url
          }
        }
      }
      userErrors { message path }
    }
  }
`;

const testAddress = {
  street1: "777 Attachment Probe Ln",
  city: "Leander",
  province: "TX",
  postalCode: "78641",
  country: "United States",
};

/** Tests Jobber form image attachments + lists note/file mutations. */
export async function GET(request: Request) {
  if (!isJobberConfigured()) {
    return NextResponse.json({ ok: false, reason: "jobber_not_configured" }, { status: 503 });
  }

  const url = new URL(request.url);
  const imageUrl =
    url.searchParams.get("imageUrl") ??
    "https://www.911poolcare.com/images/hero/carousel-leak-detection.png";

  try {
    const introspection = await jobberGraphql<{
      mutationType: { mutationType: { fields: Array<{ name: string }> } | null };
      formAttachmentInput: { inputFields: Array<{ name: string }> } | null;
      formItemInput: { inputFields: Array<{ name: string }> } | null;
      requestNoteFile: { fields: Array<{ name: string }> } | null;
    }>(INTROSPECTION);

    const mutationNames =
      introspection.mutationType.mutationType?.fields.map((field) => field.name) ?? [];
    const fileMutations = mutationNames.filter((name) =>
      /file|attach|note|upload/i.test(name),
    );

    const formAttachmentFields =
      introspection.formAttachmentInput?.inputFields.map((field) => field.name) ?? [];
    const formItemFields =
      introspection.formItemInput?.inputFields.map((field) => field.name) ?? [];

    const stamp = Date.now();
    const clientResult = await jobberGraphql<{
      clientCreate: {
        client: { id: string; properties: Array<{ id: string }> } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(CREATE_CLIENT, {
      input: {
        firstName: "AttachProbe",
        lastName: `Test${stamp}`,
        emails: [
          {
            address: `attach-probe-${stamp}@911poolcare.com`,
            primary: true,
            description: "MAIN",
          },
        ],
        phones: [{ number: "512-555-0177", primary: true, description: "MAIN" }],
        billingAddress: testAddress,
        properties: [{ address: testAddress }],
      },
    });

    const clientErrors = formatUserErrors(clientResult.clientCreate.userErrors);
    if (clientErrors) {
      return NextResponse.json({ ok: false, step: "clientCreate", error: clientErrors });
    }

    const clientId = clientResult.clientCreate.client?.id;
    const propertyId =
      clientResult.clientCreate.client?.properties[0]?.id ??
      (clientId ? await createClientProperty(clientId, testAddress) : null);

    if (!clientId) {
      return NextResponse.json({ ok: false, step: "clientCreate", error: "No client" });
    }

    const probeFormData = {
      name: `AttachProbe Test${stamp}`,
      phone: "512-555-0177",
      email: `attach-probe-${stamp}@911poolcare.com`,
      services: ["leak-detection"],
      street: testAddress.street1,
      city: testAddress.city,
      state: "TX",
      zip: testAddress.postalCode,
      message: "Attachment probe — testing Upload images field. Please ignore.",
      attachments: [
        {
          name: "probe-pool.jpg",
          url: imageUrl,
          contentType: "image/png",
        },
      ],
    } satisfies ContactFormData;

    const baseDetails = buildRequestDetailsInput(probeFormData);
    const attachmentVariants: Array<Record<string, unknown>> = [];

    if (formAttachmentFields.length) {
      const attachmentItem: Record<string, string> = { label: "Upload images" };
      for (const field of formAttachmentFields) {
        if (field === "label") continue;
        if (/url|link|uri|source|file/i.test(field)) {
          attachmentItem[field] = imageUrl;
        }
      }
      if (Object.keys(attachmentItem).length > 1) {
        attachmentVariants.push({
          form: {
            sections: [
              ...(baseDetails?.form.sections ?? []),
              {
                label: "Upload images",
                items: [attachmentItem],
              },
            ],
          },
        });
      }
    }

    // Common guesses if introspection is sparse
    attachmentVariants.push(
      {
        form: {
          sections: [
            ...(baseDetails?.form.sections ?? []),
            {
              label: "Upload images",
              items: [{ label: "Share images of the work to be done", answerText: imageUrl }],
            },
          ],
        },
      },
      {
        form: {
          sections: [
            ...(baseDetails?.form.sections ?? []),
            {
              label: "Upload images",
              items: [{ label: "Upload images", attachments: [{ url: imageUrl }] }],
            },
          ],
        },
      },
      {
        form: {
          sections: [
            ...(baseDetails?.form.sections ?? []),
            {
              label: "Upload images",
              items: [
                {
                  label: "Share images of the work to be done",
                  attachments: [{ url: imageUrl, fileName: "probe-pool.jpg" }],
                },
              ],
            },
          ],
        },
      },
    );

    const requestTests: Array<Record<string, unknown>> = [];

    for (const requestDetails of attachmentVariants) {
      const input: Record<string, unknown> = {
        clientId,
        title: `Attachment Probe ${stamp}`,
        requestDetails,
      };
      if (propertyId) {
        input.propertyId = propertyId;
      }

      try {
        const result = await jobberGraphql<{
          requestCreate: {
            request: {
              id: string;
              jobberWebUri: string;
              noteAttachments: {
                nodes: Array<{ id: string; fileName: string | null; url: string | null }>;
              };
            } | null;
            userErrors: Array<{ message: string; path?: string[] }>;
          };
        }>(CREATE_REQUEST, { input });

        const errors = formatUserErrors(result.requestCreate.userErrors);
        requestTests.push({
          requestDetails,
          success: !errors,
          requestId: result.requestCreate.request?.id ?? null,
          requestUri: result.requestCreate.request?.jobberWebUri ?? null,
          noteAttachments: result.requestCreate.request?.noteAttachments?.nodes ?? [],
          userErrors: result.requestCreate.userErrors,
          error: errors,
        });

        if (!errors && result.requestCreate.request) {
          break;
        }
      } catch (error) {
        requestTests.push({
          requestDetails,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return NextResponse.json({
      ok: true,
      imageUrl,
      formAttachmentFields,
      formItemFields,
      fileMutations,
      requestNoteFileFields:
        introspection.requestNoteFile?.fields.map((field) => field.name) ?? [],
      requestTests,
      note: "Google noteCreate+multipart is outdated for Jobber (JSON-only since Apr 2024). Testing FormAttachmentInput on requestDetails.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
