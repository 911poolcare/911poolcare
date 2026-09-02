import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";

const CREATE_REQUEST_NOTE = `
  mutation CreateWebsiteLeadRequestNote($input: RequestCreateNoteInput!) {
    requestCreateNote(input: $input) {
      request {
        id
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const CREATE_REQUEST_NOTE_WITH_ID = `
  mutation CreateWebsiteLeadRequestNoteWithId(
    $requestId: EncodedId!
    $input: RequestCreateNoteInput!
  ) {
    requestCreateNote(requestId: $requestId, input: $input) {
      request {
        id
      }
      userErrors {
        message
        path
      }
    }
  }
`;

const CLIENT_EDIT_NOTE_MUTATION = `
  mutation CreateWebsiteLeadClientNote($input: ClientEditNoteInput!) {
    clientEditNote(input: $input) {
      client {
        id
      }
      userErrors {
        message
        path
      }
    }
  }
`;

async function tryCreateRequestNote(requestId: string, message: string) {
  const variants: Array<{
    mutation: string;
    variables: Record<string, unknown>;
  }> = [
    {
      mutation: CREATE_REQUEST_NOTE,
      variables: { input: { message, linkedTo: { requestId } } },
    },
    {
      mutation: CREATE_REQUEST_NOTE_WITH_ID,
      variables: { requestId, input: { message } },
    },
    {
      mutation: CREATE_REQUEST_NOTE,
      variables: { input: { message, linkedTo: { id: requestId } } },
    },
  ];

  for (const variant of variants) {
    try {
      const result = await jobberGraphql<{
        requestCreateNote: {
          request: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(variant.mutation, variant.variables);

      const errors = formatUserErrors(result.requestCreateNote.userErrors);
      if (errors) {
        console.warn("[Jobber] requestCreateNote:", errors);
        continue;
      }

      if (result.requestCreateNote.request) {
        return true;
      }
    } catch (error) {
      console.warn("[Jobber] requestCreateNote:", error);
    }
  }

  return false;
}

async function tryCreateClientNote(clientId: string, message: string) {
  const linkedToVariants = [{ clientId }, { id: clientId }];

  for (const linkedTo of linkedToVariants) {
    try {
      const result = await jobberGraphql<{
        clientEditNote: {
          client: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(CLIENT_EDIT_NOTE_MUTATION, {
        input: { linkedTo, message },
      });

      const errors = formatUserErrors(result.clientEditNote.userErrors);
      if (errors) {
        console.warn("[Jobber] clientEditNote (create):", errors);
        continue;
      }

      if (result.clientEditNote.client) {
        return true;
      }
    } catch (error) {
      console.warn("[Jobber] clientEditNote (create):", error);
    }
  }

  return false;
}

/**
 * Note on the request (preferred) or client.
 * Lead details are not sent via assessment — that creates an assessment workflow in Jobber.
 */
export async function attachLeadNotes(options: {
  clientId: string;
  requestId: string;
  message: string;
}) {
  const { clientId, requestId, message } = options;

  if (await tryCreateRequestNote(requestId, message)) return;
  await tryCreateClientNote(clientId, message);
}
