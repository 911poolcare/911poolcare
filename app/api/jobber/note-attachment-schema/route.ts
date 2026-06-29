import { NextResponse } from "next/server";
import { isJobberConfigured } from "@/lib/jobber/config";
import { jobberGraphql } from "@/lib/jobber/graphql";

const INTROSPECTION = `
  query NoteAttachmentIntrospection {
  requestCreateNote: __type(name: "RequestCreateNoteInput") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
  requestEditNote: __type(name: "RequestEditNoteInput") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
  clientNoteAddAttachment: __type(name: "ClientNoteAddAttachmentInput") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
  jobNoteAddAttachment: __type(name: "JobNoteAddAttachmentInput") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
  requestNoteAddAttachment: __type(name: "RequestNoteAddAttachmentInput") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
  noteFileCreate: __type(name: "NoteFileCreateInput") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
  noteAttachmentAttributes: __type(name: "NoteAttachmentAttributes") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
  requestNoteLinkInput: __type(name: "RequestNoteLinkInput") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
  formAttachmentInput: __type(name: "FormAttachmentInput") {
    inputFields { name type { name kind ofType { name kind ofType { name } } } }
  }
}
`;

/** Introspects Jobber note + attachment mutation input types. */
export async function GET() {
  if (!isJobberConfigured()) {
    return NextResponse.json({ ok: false, reason: "jobber_not_configured" }, { status: 503 });
  }

  try {
    const data = await jobberGraphql<Record<string, unknown>>(INTROSPECTION);
    return NextResponse.json({ ok: true, schema: data });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
