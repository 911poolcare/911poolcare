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
    formInput: __type(name: "FormInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name kind ofType { name } } } }
      }
    }
    formSectionInput: __type(name: "FormSectionInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name kind ofType { name } } } }
      }
    }
    formQuestionInput: __type(name: "FormQuestionInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name kind ofType { name } } } }
      }
    }
    formAnswerInput: __type(name: "FormAnswerInput") {
      inputFields {
        name
        type { name kind ofType { name kind ofType { name kind ofType { name } } } }
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
        defaultForm {
          id
          name
        }
        requestForms {
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
    const settingsQueries = [
      ["requestSettingsCollection", REQUEST_SETTINGS],
      [
        "requestForms",
        `query { requestForms(first: 10) { nodes { id name isDefault } } }`,
      ],
      [
        "forms",
        `query { forms(first: 10) { nodes { id name } } }`,
      ],
    ] as const;

    for (const [label, query] of settingsQueries) {
      try {
        settingsResult[label] = await jobberGraphql(query);
      } catch (error) {
        settingsResult[`${label}Error`] =
          error instanceof Error ? error.message : String(error);
      }
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
