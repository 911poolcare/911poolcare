import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";

type NoteMutationResult = {
  userErrors: Array<{ message: string; path?: string[] }> | null;
};

const NOTE_CREATE_MUTATION = `
  mutation CreateWebsiteLeadNote($input: NoteCreateInput!) {
    noteCreate(input: $input) {
      note {
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

const REQUEST_EDIT_NOTE_MUTATION = `
  mutation EditWebsiteLeadRequestNote($input: RequestEditNoteInput!) {
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

async function tryNoteMutation(
  label: string,
  action: () => Promise<NoteMutationResult | void>,
): Promise<boolean> {
  try {
    const result = await action();
    if (!result) return true;

    const errors = formatUserErrors(result.userErrors);
    if (errors) {
      console.warn(`[Jobber] ${label}:`, errors);
      return false;
    }

    return true;
  } catch (error) {
    console.warn(`[Jobber] ${label}:`, error);
    return false;
  }
}

/** Best-effort note creation — tries multiple Jobber note APIs. */
export async function attachLeadNotes(options: {
  clientId: string;
  requestId: string;
  message: string;
}) {
  const { clientId, requestId, message } = options;

  const viaNoteCreate = await tryNoteMutation("noteCreate", async () => {
    const result = await jobberGraphql<{
      noteCreate: {
        note: { id: string } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(NOTE_CREATE_MUTATION, {
      input: {
        subject: { id: requestId },
        body: message,
      },
    });

    return result.noteCreate;
  });
  if (viaNoteCreate) return;

  const viaClientNote = await tryNoteMutation("clientEditNote", async () => {
    const result = await jobberGraphql<{
      clientEditNote: {
        client: { id: string } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(CLIENT_EDIT_NOTE_MUTATION, {
      input: {
        clientId,
        message,
      },
    });

    return result.clientEditNote;
  });
  if (viaClientNote) return;

  await tryNoteMutation("requestEditNote", async () => {
    const result = await jobberGraphql<{
      requestEditNote: {
        request: { id: string } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(REQUEST_EDIT_NOTE_MUTATION, {
      input: {
        requestId,
        message,
      },
    });

    return result.requestEditNote;
  });
}
