import { NextResponse } from "next/server";
import { isJobberConfigured } from "@/lib/jobber/config";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";
import { createClientProperty } from "@/lib/jobber/property";

const INTROSPECTION = `
  query LeadProbeInputTypes {
    requestEditNote: __type(name: "RequestEditNoteInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    noteCreate: __type(name: "NoteCreateInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    propertyCreate: __type(name: "PropertyCreateInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    requestCreate: __type(name: "RequestCreateInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
  }
`;

const CREATE_CLIENT = `
  mutation LeadProbeClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client { id name }
      userErrors { message path }
    }
  }
`;

const CREATE_REQUEST = `
  mutation LeadProbeRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request { id property { id address { street1 city } } }
      userErrors { message path }
    }
  }
`;

const NOTE_CREATE = `
  mutation LeadProbeNote($input: NoteCreateInput!) {
    noteCreate(input: $input) {
      note { id }
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

const CLIENT_EDIT_NOTE = `
  mutation LeadProbeClientNote($input: ClientEditNoteInput!) {
    clientEditNote(input: $input) {
      client { id }
      userErrors { message path }
    }
  }
`;

const QUERY_REQUEST_NOTES = `
  query LeadProbeRequestNotes($id: EncodedId!) {
    request(id: $id) {
      id
      property { id address { street1 city } }
      notes(first: 5) {
        nodes {
          __typename
          ... on RequestNote { id message createdAt }
          ... on Note { id body createdAt }
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

async function tryMutation<T>(
  label: string,
  action: () => Promise<T>,
): Promise<{ label: string; ok: boolean; result?: T; error?: string }> {
  try {
    const result = await action();
    return { label, ok: true, result };
  } catch (error) {
    return {
      label,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/** Diagnostic endpoint — tests Jobber property + note mutations. */
export async function GET() {
  if (!isJobberConfigured()) {
    return NextResponse.json({ ok: false, reason: "jobber_not_configured" }, { status: 503 });
  }

  const stamp = Date.now();
  const results: Record<string, unknown> = {};

  results.introspection = await tryMutation("introspection", () =>
    jobberGraphql(INTROSPECTION),
  );

  const clientResult = await tryMutation("clientCreate", () =>
    jobberGraphql<{
      clientCreate: {
        client: { id: string; name: string } | null;
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
    }),
  );

  results.clientCreate = clientResult;

  const clientId =
    clientResult.ok &&
    clientResult.result &&
    "clientCreate" in clientResult.result
      ? clientResult.result.clientCreate.client?.id
      : null;

  if (!clientId) {
    return NextResponse.json({ ok: false, results });
  }

  const property = await createClientProperty(clientId, testAddress);
  results.propertyCreate = property;

  const propertyId = property.propertyId;

  const requestAttempts = [];

  for (const [label, input] of [
    ["titleOnly", { clientId, title: `Probe Request ${stamp}` }],
    ["propertyId", { clientId, title: `Probe Request ${stamp}`, propertyId }],
    [
      "propertyRef",
      {
        clientId,
        title: `Probe Request ${stamp}`,
        property: propertyId ? { id: propertyId } : undefined,
      },
    ],
    [
      "inlineAddressAttributes",
      {
        clientId,
        title: `Probe Request ${stamp}`,
        property: { addressAttributes: testAddress },
      },
    ],
  ] as const) {
    if (label === "propertyId" && !propertyId) continue;
    if (label === "propertyRef" && !propertyId) continue;

    requestAttempts.push(
      await tryMutation(`requestCreate/${label}`, async () => {
        const result = await jobberGraphql<{
          requestCreate: {
            request: {
              id: string;
              property: { id: string; address: { street1: string; city: string } } | null;
            } | null;
            userErrors: Array<{ message: string; path?: string[] }>;
          };
        }>(CREATE_REQUEST, { input });

        const errors = formatUserErrors(result.requestCreate.userErrors);
        if (errors) throw new Error(errors);
        if (!result.requestCreate.request) {
          throw new Error("No request returned");
        }
        return result.requestCreate.request;
      }),
    );
  }

  results.requestCreate = requestAttempts;

  const requestId = requestAttempts.find((attempt) => attempt.ok)?.result?.id as
    | string
    | undefined;

  if (!requestId) {
    return NextResponse.json({ ok: false, clientId, results });
  }

  const noteMessage = `Probe note ${stamp}\nServices: Leak\nAddress: ${testAddress.street1}`;

  results.noteAttempts = [
    await tryMutation("noteCreate/request", async () => {
      const result = await jobberGraphql<{
        noteCreate: {
          note: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(NOTE_CREATE, {
        input: { subject: { id: requestId }, body: noteMessage },
      });
      const errors = formatUserErrors(result.noteCreate.userErrors);
      if (errors) throw new Error(errors);
      return result.noteCreate;
    }),
    await tryMutation("requestEditNote/message", async () => {
      const result = await jobberGraphql<{
        requestEditNote: {
          request: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(REQUEST_EDIT_NOTE, {
        input: { requestId, message: noteMessage },
      });
      const errors = formatUserErrors(result.requestEditNote.userErrors);
      if (errors) throw new Error(errors);
      return result.requestEditNote;
    }),
    await tryMutation("requestEditNote/body", async () => {
      const result = await jobberGraphql<{
        requestEditNote: {
          request: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(REQUEST_EDIT_NOTE, {
        input: { requestId, body: noteMessage },
      });
      const errors = formatUserErrors(result.requestEditNote.userErrors);
      if (errors) throw new Error(errors);
      return result.requestEditNote;
    }),
    await tryMutation("requestEditNote/note", async () => {
      const result = await jobberGraphql<{
        requestEditNote: {
          request: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(REQUEST_EDIT_NOTE, {
        input: { requestId, note: noteMessage },
      });
      const errors = formatUserErrors(result.requestEditNote.userErrors);
      if (errors) throw new Error(errors);
      return result.requestEditNote;
    }),
    await tryMutation("clientEditNote/message", async () => {
      const result = await jobberGraphql<{
        clientEditNote: {
          client: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(CLIENT_EDIT_NOTE, {
        input: { clientId, message: noteMessage },
      });
      const errors = formatUserErrors(result.clientEditNote.userErrors);
      if (errors) throw new Error(errors);
      return result.clientEditNote;
    }),
  ];

  results.requestSnapshot = await tryMutation("requestSnapshot", () =>
    jobberGraphql(QUERY_REQUEST_NOTES, { id: requestId }),
  );

  return NextResponse.json({
    ok: true,
    clientId,
    propertyId,
    requestId,
    results,
  });
}
