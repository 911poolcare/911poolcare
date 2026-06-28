import { NextResponse } from "next/server";
import {
  JOBBER_CF_REFERRAL_NAME,
  JOBBER_CF_SERVICES_NAME,
  getJobberClientCustomFieldIds,
} from "@/lib/jobber/custom-fields";
import { isJobberConfigured } from "@/lib/jobber/config";

/** Lists resolved client custom field IDs — useful during Jobber setup. */
export async function GET() {
  if (!isJobberConfigured()) {
    return NextResponse.json(
      { ok: false, reason: "jobber_not_configured" },
      { status: 503 },
    );
  }

  const fieldIds = await getJobberClientCustomFieldIds();

  return NextResponse.json({
    ok: true,
    expectedFields: [JOBBER_CF_SERVICES_NAME, JOBBER_CF_REFERRAL_NAME],
    fieldIds,
    ready: Boolean(fieldIds.servicesRequestedId && fieldIds.referralSourceId),
  });
}
