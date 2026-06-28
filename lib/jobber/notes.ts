import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";

type NoteMutationResult = {
  userErrors: Array<{ message: string; path?: string[] }> | null;
  createdId?: string | null;
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
  options?: { requireCreatedId?: boolean },
): Promise<boolean> {
  try {
    const result = await action();
    if (!result) return false;

    const errors = formatUserErrors(result.userErrors);
    if (errors) {
      console.warn(`[Jobber] ${label}:`, errors);
      return false;
    }

    if (options?.requireCreatedId) {
      return Boolean(result.createdId);
    }

    return true;
  } catch (error) {
    console.warn(`[Jobber] ${label}:`, error);
    return false;
  }
}

async function tryNoteCreate(subjectId: string, message: string) {
  return tryNoteMutation(
    "noteCreate",
    async () => {
      const result = await jobberGraphql<{
        noteCreate: {
          note: { id: string } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(NOTE_CREATE_MUTATION, {
        input: {
          subject: { id: subjectId },
          body: message,
        },
      });

      return {
        userErrors: result.noteCreate.userErrors,
        createdId: result.noteCreate.note?.id,
      };
    },
    { requireCreatedId: true },
  );
}

async function tryClientEditNote(
  clientId: string,
  message: string,
  variant: Record<string, unknown>,
  label: string,
) {
  return tryNoteMutation(label, async () => {
    const result = await jobberGraphql<{
      clientEditNote: {
        client: { id: string } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(CLIENT_EDIT_NOTE_MUTATION, {
      input: { clientId, ...variant },
    });

    return {
      userErrors: result.clientEditNote.userErrors,
      createdId: result.clientEditNote.client?.id,
    };
  });
}

async function tryRequestEditNote(
  requestId: string,
  message: string,
  variant: Record<string, unknown>,
  label: string,
) {
  return tryNoteMutation(label, async () => {
    const result = await jobberGraphql<{
      requestEditNote: {
        request: { id: string } | null;
        userErrors: Array<{ message: string; path?: string[] }>;
      };
    }>(REQUEST_EDIT_NOTE_MUTATION, {
      input: { requestId, ...variant },
    });

    return {
      userErrors: result.requestEditNote.userErrors,
      createdId: result.requestEditNote.request?.id,
    };
  });
}

/** Best-effort note creation — tries multiple Jobber note APIs. */
export async function attachLeadNotes(options: {
  clientId: string;
  requestId: string;
  message: string;
}) {
  const { clientId, requestId, message } = options;

  if (await tryNoteCreate(requestId, message)) return;
  if (await tryNoteCreate(clientId, message)) return;

  if (
    await tryClientEditNote(clientId, message, { message }, "clientEditNote")
  ) {
    return;
  }

  if (await tryClientEditNote(clientId, message, { body: message }, "clientEditNote(body)")) {
    return;
  }

  if (
    await tryClientEditNote(
      clientId,
      message,
      { note: message },
      "clientEditNote(note)",
    )
  ) {
    return;
  }

  if (
    await tryRequestEditNote(requestId, message, { message }, "requestEditNote")
  ) {
    return;
  }

  if (
    await tryRequestEditNote(
      requestId,
      message,
      { body: message },
      "requestEditNote(body)",
    )
  ) {
    return;
  }

  if (
    await tryRequestEditNote(
      requestId,
      message,
      { note: message },
      "requestEditNote(note)",
    )
  ) {
    return;
  }

  await tryRequestEditNote(
    requestId,
    message,
    { id: requestId, note: message },
    "requestEditNote(id+note)",
  );
}
