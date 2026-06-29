import { NextResponse } from "next/server";
import { isJobberConfigured } from "@/lib/jobber/config";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import { createClientProperty } from "@/lib/jobber/property";
import { buildRequestDetailsInput } from "@/lib/jobber/request-form";
import type { ContactFormData } from "@/lib/validations/contact";

const CREATE_CLIENT = `
  mutation LeadProbeClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client {
        id
        name
        properties {
          id
          address { street1 city }
        }
      }
      userErrors { message path }
    }
  }
`;

const CREATE_REQUEST = `
  mutation LeadProbeRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request {
        id
        property { id address { street1 city } }
      }
      userErrors { message path }
    }
  }
`;

const READ_REQUEST = `
  query LeadProbeReadback($id: EncodedId!) {
    request(id: $id) {
      id
      requestDetails {
        form {
          sections {
            label
            items {
              label
              answerText
            }
          }
        }
      }
    }
  }
`;

const testAddress = {
  street1: "999 Probe Test Ln",
  city: "Leander",
  province: "TX",
  postalCode: "78641",
  country: "United States",
};

/** Diagnostic endpoint — tests Jobber property + request linking. */
export async function GET() {
  if (!isJobberConfigured()) {
    return NextResponse.json({ ok: false, reason: "jobber_not_configured" }, { status: 503 });
  }

  try {
    const stamp = Date.now();
    const clientResult = await jobberGraphql<{
      clientCreate: {
        client: {
          id: string;
          properties: Array<{ id: string }>;
        } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(CREATE_CLIENT, {
      input: {
        firstName: "Probe",
        lastName: `Test${stamp}`,
        emails: [
          {
            address: `probe-${stamp}@911poolcare.com`,
            primary: true,
            description: "MAIN",
          },
        ],
        phones: [{ number: "512-555-0199", primary: true, description: "MAIN" }],
        billingAddress: testAddress,
        properties: [{ address: testAddress }],
      },
    });

    const clientErrors = formatUserErrors(clientResult.clientCreate.userErrors);
    if (clientErrors) {
      return NextResponse.json({ ok: false, step: "clientCreate", error: clientErrors });
    }

    const clientId = clientResult.clientCreate.client?.id;
    if (!clientId) {
      return NextResponse.json({ ok: false, step: "clientCreate", error: "No client returned" });
    }

    const propertyIdFromClient =
      clientResult.clientCreate.client?.properties[0]?.id ?? null;
    const propertyId =
      propertyIdFromClient ?? (await createClientProperty(clientId, testAddress));

    const requestInput: Record<string, unknown> = {
      clientId,
      title: `Probe Request ${stamp}`,
    };
    if (propertyId) {
      requestInput.propertyId = propertyId;
    }

    const probeFormData = {
      name: `Probe Test${stamp}`,
      phone: "512-555-0199",
      email: `probe-${stamp}@911poolcare.com`,
      services: ["leak-detection", "equipment-repair"],
      street: testAddress.street1,
      city: testAddress.city,
      state: "TX",
      zip: testAddress.postalCode,
      message:
        "Lead probe test — checking property + Service Details wiring. Please ignore.",
    } satisfies ContactFormData;

    const requestDetails = buildRequestDetailsInput(probeFormData);
    if (requestDetails) {
      requestInput.requestDetails = requestDetails;
    }

    const requestResult = await jobberGraphql<{
      requestCreate: {
        request: {
          id: string;
          property: { id: string; address: { street1: string; city: string } } | null;
        } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(CREATE_REQUEST, { input: requestInput });

    const requestErrors = formatUserErrors(requestResult.requestCreate.userErrors);
    if (requestErrors) {
      return NextResponse.json({
        ok: false,
        step: "requestCreate",
        clientId,
        propertyId,
        error: requestErrors,
      });
    }

    const request = requestResult.requestCreate.request;
    if (!request) {
      return NextResponse.json({ ok: false, step: "requestCreate", error: "No request returned" });
    }

    let requestDetailsReadback: unknown = null;
    let readbackError: string | null = null;
    try {
      const readResult = await jobberGraphql<{
        request: {
          id: string;
          requestDetails: {
            form: {
              sections: Array<{
                label: string;
                items: Array<{ label: string; answerText: string | null }>;
              }>;
            } | null;
          } | null;
        } | null;
      }>(READ_REQUEST, { id: request.id });
      requestDetailsReadback = readResult.request?.requestDetails ?? null;
    } catch (error) {
      readbackError = error instanceof Error ? error.message : String(error);
    }

    return NextResponse.json({
      ok: true,
      clientId,
      propertyIdFromClient,
      propertyId,
      requestId: request.id,
      requestPropertyId: request.property?.id ?? null,
      requestPropertyAddress: request.property?.address ?? null,
      requestDetailsIncluded: Boolean(requestDetails),
      requestDetailsSent: requestDetails,
      requestDetailsReadback,
      readbackError,
    });
  } catch (error) {
    console.error("[lead-probe]", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
