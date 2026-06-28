import { NextResponse } from "next/server";
import { isJobberConfigured } from "@/lib/jobber/config";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import { createClientProperty } from "@/lib/jobber/property";

const CREATE_CLIENT = `
  mutation LeadProbeClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client {
        id
        name
        properties(first: 1) {
          nodes { id address { street1 city } }
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
        assessment { instructions }
        notes(first: 3) {
          nodes {
            __typename
            ... on RequestNote { id message }
          }
        }
      }
      userErrors { message path }
    }
  }
`;

const REQUEST_EDIT_NOTE = `
  mutation LeadProbeRequestNote($input: RequestEditNoteInput!) {
    requestEditNote(input: $input) {
      request { id }
      userErrors { message path }
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

/** Diagnostic endpoint — tests Jobber property + note mutations. */
export async function GET() {
  if (!isJobberConfigured()) {
    return NextResponse.json({ ok: false, reason: "jobber_not_configured" }, { status: 503 });
  }

  const stamp = Date.now();
  const noteMessage = `Probe note ${stamp}\nServices: Leak\nAddress: ${testAddress.street1}`;

  const clientResult = await jobberGraphql<{
    clientCreate: {
      client: {
        id: string;
        properties: { nodes: Array<{ id: string }> };
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

  let propertyId = clientResult.clientCreate.client?.properties.nodes[0]?.id ?? null;
  const propertyCreateResult = propertyId
    ? null
    : await createClientProperty(clientId, testAddress);
  if (!propertyId) {
    propertyId = propertyCreateResult;
  }

  const requestResult = await jobberGraphql<{
    requestCreate: {
      request: {
        id: string;
        property: { id: string; address: { street1: string; city: string } } | null;
        assessment: { instructions: string | null } | null;
        notes: { nodes: Array<{ __typename: string; id?: string; message?: string }> };
      } | null;
      userErrors: Array<{ message: string; path?: string[] }>;
    };
  }>(CREATE_REQUEST, {
    input: {
      clientId,
      propertyId,
      title: `Probe Request ${stamp}`,
      assessment: { instructions: noteMessage },
    },
  });

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

  let noteError: string | null = null;
  try {
    const noteResult = await jobberGraphql<{
      requestEditNote: {
        request: { id: string } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(REQUEST_EDIT_NOTE, {
      input: {
        linkedTo: { requestId: request.id },
        message: noteMessage,
      },
    });
    noteError = formatUserErrors(noteResult.requestEditNote.userErrors);
  } catch (error) {
    noteError = error instanceof Error ? error.message : String(error);
  }

  return NextResponse.json({
    ok: true,
    clientId,
    propertyId,
    requestId: request.id,
    requestPropertyId: request.property?.id ?? null,
    requestPropertyAddress: request.property?.address ?? null,
    assessmentInstructions: request.assessment?.instructions ?? null,
    notesBefore: request.notes.nodes,
    noteAttemptError: noteError,
  });
}
