import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";

const REQUEST_EDIT_NOTE_MUTATION = `
  mutation CreateWebsiteLeadRequestNote($input: RequestEditNoteInput!) {
    requestEditNote(input: $input) {
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
  const linkedToVariants = [
    { requestId },
    { id: requestId },
  ];

  for (const linkedTo of linkedToVariants) {
    try {
      const result = await jobberGraphql<{
        requestEditNote: {
          request: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(REQUEST_EDIT_NOTE_MUTATION, {
        input: { linkedTo, message },
      });

      const errors = formatUserErrors(result.requestEditNote.userErrors);
      if (errors) {
        console.warn("[Jobber] requestEditNote (create):", errors);
        continue;
      }

      if (result.requestEditNote.request) {
        return true;
      }
    } catch (error) {
      console.warn("[Jobber] requestEditNote (create):", error);
    }
  }

  return false;
}

async function tryCreateClientNote(clientId: string, message: string) {
  const linkedToVariants = [
    { clientId },
    { id: clientId },
  ];

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
 * Best-effort note on the request or client.
 * Lead details are always sent via assessment.instructions on requestCreate.
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
