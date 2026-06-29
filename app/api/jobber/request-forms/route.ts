import { NextResponse } from "next/server";
import { isJobberConfigured } from "@/lib/jobber/config";
import { jobberGraphql } from "@/lib/jobber/graphql";

const INTROSPECTION = `
  query RequestFormIntrospection {
    requestDetails: __type(name: "RequestDetailsInput") {
      inputFields {
        name
        type {
          name
          kind
          ofType { name kind ofType { name kind ofType { name } } }
        }
      }
    }
    requestFormAnswer: __type(name: "RequestFormAnswerInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    requestFormSectionAnswer: __type(name: "RequestFormSectionAnswerInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
    requestFormQuestionAnswer: __type(name: "RequestFormQuestionAnswerInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name } } }
      }
    }
  }
`;

const REQUEST_SETTINGS = `
  query RequestSettingsCollection {
    requestSettingsCollection {
      nodes {
        id
        name
        forms {
          id
          name
          isDefault
        }
      }
    }
  }
`;

const REQUEST_FORM_DETAIL = `
  query RequestFormDetail($formId: EncodedId!) {
    requestForm(id: $formId) {
      id
      name
      isDefault
      sections {
        id
        name
        questions {
          id
          label
          questionType
          isRequired
        }
      }
    }
  }
`;

/** Lists Jobber request forms + schema for wiring website fields. */
export async function GET(request: Request) {
  if (!isJobberConfigured()) {
    return NextResponse.json({ ok: false, reason: "jobber_not_configured" }, { status: 503 });
  }

  const formId = new URL(request.url).searchParams.get("formId");

  try {
    const introspection = await jobberGraphql(INTROSPECTION);

    const settingsResult: Record<string, unknown> = {};
    try {
      settingsResult.requestSettingsCollection = await jobberGraphql(REQUEST_SETTINGS);
    } catch (error) {
      settingsResult.requestSettingsCollectionError =
        error instanceof Error ? error.message : String(error);
    }

    let formDetail: unknown = null;
    if (formId) {
      try {
        formDetail = await jobberGraphql(REQUEST_FORM_DETAIL, { formId });
      } catch (error) {
        formDetail = {
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    return NextResponse.json({
      ok: true,
      introspection,
      ...settingsResult,
      formDetail,
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
