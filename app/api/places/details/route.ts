import { NextResponse } from "next/server";
import { z } from "zod";
import {
  fetchPlaceAddressDetails,
  isGooglePlacesServerConfigured,
} from "@/lib/google/places-server";

const requestSchema = z.object({
  placeId: z.string().min(1).max(300),
  sessionToken: z.string().uuid(),
});

export async function POST(request: Request) {
  if (!isGooglePlacesServerConfigured()) {
    return NextResponse.json(
      { error: "Address autocomplete is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const address = await fetchPlaceAddressDetails(
      parsed.data.placeId,
      parsed.data.sessionToken,
    );

    return NextResponse.json({ address });
  } catch (error) {
    console.error("[places/details]", error);
    return NextResponse.json(
      { error: "Unable to fetch address details." },
      { status: 502 },
    );
  }
}
