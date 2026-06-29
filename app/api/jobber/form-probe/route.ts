import { NextResponse } from "next/server";
import { isJobberConfigured } from "@/lib/jobber/config";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import { createClientProperty } from "@/lib/jobber/property";
import { buildRequestDetailsInput } from "@/lib/jobber/request-form";
import type { ContactFormData } from "@/lib/validations/contact";

const FORM_ITEM_INTROSPECTION = `
  query FormItemIntrospection {
    formItemInput: __type(name: "FormItemInput") {
      kind
      inputFields {
        name
        type {
          name
          kind
          ofType { name kind ofType { name kind ofType { name } } }
        }
      }
      possibleTypes {
        name
        kind
        inputFields {
          name
          type { name kind ofType { name kind ofType { name } } }
        }
      }
    }
    requestCreateInput: __type(name: "RequestCreateInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    formRelatedTypes: __schema {
      types {
        name
        kind
      }
    }
  }
`;

const CREATE_CLIENT = `
  mutation FormProbeClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client { id }
      userErrors { message path }
    }
  }
`;

const CREATE_REQUEST = `
  mutation FormProbeRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request {
        id
        title
        jobberWebUri
      }
      userErrors { message path }
    }
  }
`;

const testAddress = {
  street1: "888 Form Probe Ln",
  city: "Leander",
  province: "TX",
  postalCode: "78641",
  country: "United States",
};

type FormItemShape = Record<string, string>;

/** Tests requestDetails.form shapes against Jobber. */
export async function GET() {
  if (!isJobberConfigured()) {
    return NextResponse.json({ ok: false, reason: "jobber_not_configured" }, { status: 503 });
  }

  try {
    const introspection = await jobberGraphql<{
      formItemInput: {
        kind: string;
        inputFields: Array<{ name: string }> | null;
        possibleTypes: Array<{ name: string; inputFields: Array<{ name: string }> | null }> | null;
      } | null;
      requestCreateInput: { inputFields: Array<{ name: string }> } | null;
      formRelatedTypes: { types: Array<{ name: string; kind: string }> };
    }>(FORM_ITEM_INTROSPECTION);

    const formTypes = introspection.formRelatedTypes.types
      .filter((type) => /form/i.test(type.name))
      .map((type) => `${type.name} (${type.kind})`)
      .sort();

    const formItemFields =
      introspection.formItemInput?.inputFields?.map((field) => field.name) ?? [];
    const formItemUnionFields =
      introspection.formItemInput?.possibleTypes?.map((type) => ({
        type: type.name,
        fields: type.inputFields?.map((field) => field.name) ?? [],
      })) ?? [];

    const stamp = Date.now();
    const clientResult = await jobberGraphql<{
      clientCreate: {
        client: { id: string } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(CREATE_CLIENT, {
      input: {
        firstName: "FormProbe",
        lastName: `Test${stamp}`,
        emails: [
          {
            address: `form-probe-${stamp}@911poolcare.com`,
            primary: true,
            description: "MAIN",
          },
        ],
        phones: [{ number: "512-555-0188", primary: true, description: "MAIN" }],
        billingAddress: testAddress,
        properties: [{ address: testAddress }],
      },
    });

    const clientErrors = formatUserErrors(clientResult.clientCreate.userErrors);
    if (clientErrors) {
      return NextResponse.json({ ok: false, step: "clientCreate", error: clientErrors, introspection, formTypes, formItemFields, formItemUnionFields });
    }

    const clientId = clientResult.clientCreate.client?.id;
    if (!clientId) {
      return NextResponse.json({ ok: false, step: "clientCreate", error: "No client returned" });
    }

    const propertyId = await createClientProperty(clientId, testAddress);

    const probeFormData = {
      name: `FormProbe Test${stamp}`,
      phone: "512-555-0188",
      email: `form-probe-${stamp}@911poolcare.com`,
      services: ["leak-detection"],
      street: testAddress.street1,
      city: testAddress.city,
      state: "TX",
      zip: testAddress.postalCode,
      message: "Form probe test — property + Service Details combined.",
    } satisfies ContactFormData;

    const requestDetails = buildRequestDetailsInput(probeFormData);

    const itemVariants: FormItemShape[] = [
      { label: "Service Details", value: "Probe test message" },
      { label: "Service Details", answer: "Probe test message" },
      { label: "Service Details", text: "Probe test message" },
    ];

    if (formItemFields.length) {
      const dynamicItem: FormItemShape = {};
      for (const field of formItemFields) {
        if (field === "label") dynamicItem.label = "Service Details";
        else if (/value|answer|text|content|response/i.test(field)) {
          dynamicItem[field] = "Probe test message";
        }
      }
      if (Object.keys(dynamicItem).length > 1) {
        itemVariants.unshift(dynamicItem);
      }
    }

    const requestTests: Array<Record<string, unknown>> = [];

    for (const item of itemVariants) {
      const input: Record<string, unknown> = {
        clientId,
        title: `Form Probe ${stamp}`,
        requestDetails: requestDetails ?? {
          form: {
            sections: [
              {
                label: "Overview",
                items: [item],
              },
            ],
          },
        },
      };
      if (propertyId) {
        input.propertyId = propertyId;
      }

      try {
        const result = await jobberGraphql<{
          requestCreate: {
            request: { id: string; title: string; jobberWebUri: string } | null;
            userErrors: Array<{ message: string; path?: string[] }>;
          };
        }>(CREATE_REQUEST, { input });

        requestTests.push({
          itemShape: item,
          success: !formatUserErrors(result.requestCreate.userErrors),
          requestId: result.requestCreate.request?.id ?? null,
          requestUri: result.requestCreate.request?.jobberWebUri ?? null,
          userErrors: result.requestCreate.userErrors,
        });

        if (!formatUserErrors(result.requestCreate.userErrors) && result.requestCreate.request) {
          break;
        }
      } catch (error) {
        requestTests.push({
          itemShape: item,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return NextResponse.json({
      ok: true,
      clientId,
      propertyId,
      formItemFields,
      formItemUnionFields,
      requestCreateFields:
        introspection.requestCreateInput?.inputFields.map((field) => field.name) ?? [],
      formTypes,
      requestTests,
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
