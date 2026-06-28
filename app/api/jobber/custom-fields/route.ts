import { NextResponse } from "next/server";
import {
  JOBBER_CF_REFERRAL_NAME,
  JOBBER_CF_SERVICES_NAME,
  inspectJobberClientCustomFields,
} from "@/lib/jobber/custom-fields";
import { isJobberConfigured } from "@/lib/jobber/config";

/** Lists resolved client custom field IDs — useful during Jobber setup. */
export async function GET(request: Request) {
  if (!isJobberConfigured()) {
    return NextResponse.json(
      { ok: false, reason: "jobber_not_configured" },
      { status: 503 },
    );
  }

  const refresh = new URL(request.url).searchParams.get("refresh") === "1";
  const diagnostics = await inspectJobberClientCustomFields({ refresh });

  return NextResponse.json({
    ok: true,
    expectedFields: [JOBBER_CF_SERVICES_NAME, JOBBER_CF_REFERRAL_NAME],
    fieldIds: diagnostics.fieldIds,
    ready: diagnostics.ready,
    lookupError: diagnostics.lookupError,
    clientTextFields: diagnostics.clientTextFields,
    nearMatches: diagnostics.nearMatches,
    hint: diagnostics.lookupError
      ? "Your Jobber app may need the custom_field_configurations read scope. Re-authorize at /api/jobber/authorize, or paste field IDs into JOBBER_CF_* env vars."
      : diagnostics.ready
        ? "Custom fields are wired up. Submit a test request to verify values on the client record."
        : "Create the two expected text fields under Client custom fields, then reload with ?refresh=1",
  });
}
