import type { ContactAttachment } from "@/lib/validations/contact";
import { formatUserErrors, jobberGraphql } from "@/lib/jobber/graphql";

const CREATE_REQUEST_NOTE_WITH_ID = `
  mutation AttachWebsiteRequestPhotosWithId(
    $requestId: EncodedId!
    $input: RequestCreateNoteInput!
  ) {
    requestCreateNote(requestId: $requestId, input: $input) {
      request {
        id
        noteAttachments(first: 10) {
          nodes { id fileName url thumbnailUrl }
        }
      }
      userErrors { message path }
    }
  }
`;

const CREATE_REQUEST_NOTE = `
  mutation AttachWebsiteRequestPhotos($input: RequestCreateNoteInput!) {
    requestCreateNote(input: $input) {
      request {
        id
        noteAttachments(first: 10) {
          nodes {
            id
            fileName
            url
            thumbnailUrl
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

const READ_REQUEST_ATTACHMENTS = `
  query RequestNoteAttachments($id: EncodedId!) {
    request(id: $id) {
      id
      noteAttachments(first: 10) {
        nodes {
          id
          fileName
          url
          thumbnailUrl
        }
      }
    }
  }
`;

/** Attach Vercel Blob photos to a Jobber request via requestCreateNote (JSON url field). */
export async function attachPhotosToRequest(
  requestId: string,
  attachments: ContactAttachment[],
) {
  if (!attachments.length) {
    return { attached: 0, noteAttachments: [] };
  }

  const attachmentInputs = attachments.map((file) => ({ url: file.url }));
  const message = [
    "Photos uploaded from 911poolcare.com contact form:",
    ...attachments.map((file) => `- ${file.name}`),
  ].join("\n");

  const inputVariants: Array<{
    label: string;
    mutation: string;
    variables: Record<string, unknown>;
  }> = [
    {
      label: "input.linkedTo.requestId",
      mutation: CREATE_REQUEST_NOTE,
      variables: {
        input: { message, attachments: attachmentInputs, linkedTo: { requestId } },
      },
    },
    {
      label: "mutation.requestId arg",
      mutation: CREATE_REQUEST_NOTE_WITH_ID,
      variables: {
        requestId,
        input: { message, attachments: attachmentInputs },
      },
    },
    {
      label: "input only",
      mutation: CREATE_REQUEST_NOTE,
      variables: { input: { message, attachments: attachmentInputs } },
    },
  ];

  let lastErrors: string | null = null;

  for (const variant of inputVariants) {
    try {
      const result = await jobberGraphql<{
        requestCreateNote: {
          request: {
            id: string;
            noteAttachments: {
              nodes: Array<{
                id: string;
                fileName: string | null;
                url: string | null;
                thumbnailUrl: string | null;
              }>;
            };
          } | null;
          userErrors: Array<{ message: string; path?: string[] }>;
        };
      }>(variant.mutation, variant.variables);

      const errors = formatUserErrors(result.requestCreateNote.userErrors);
      if (!errors) {
        const fromMutation = result.requestCreateNote.request?.noteAttachments.nodes ?? [];
        if (fromMutation.length) {
          return { attached: fromMutation.length, noteAttachments: fromMutation };
        }

        const readback = await jobberGraphql<{
          request: {
            noteAttachments: {
              nodes: Array<{
                id: string;
                fileName: string | null;
                url: string | null;
                thumbnailUrl: string | null;
              }>;
            };
          } | null;
        }>(READ_REQUEST_ATTACHMENTS, { id: requestId });

        const nodes = readback.request?.noteAttachments.nodes ?? [];
        return { attached: nodes.length, noteAttachments: nodes };
      }

      lastErrors = errors;
      console.warn("[Jobber] requestCreateNote with photos failed:", {
        variant: variant.label,
        errors,
      });
    } catch (error) {
      lastErrors = error instanceof Error ? error.message : String(error);
      console.warn("[Jobber] requestCreateNote with photos error:", {
        variant: variant.label,
        error: lastErrors,
      });
    }
  }

  throw new Error(
    `Jobber requestCreateNote photo attach failed: ${lastErrors ?? "unknown error"}`,
  );
}
