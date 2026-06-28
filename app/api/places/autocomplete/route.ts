import { NextResponse } from "next/server";
import { z } from "zod";
import {
  fetchPlaceAutocompleteSuggestions,
  isGooglePlacesServerConfigured,
} from "@/lib/google/places-server";

const requestSchema = z.object({
  input: z.string().trim().min(3).max(200),
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

    const suggestions = await fetchPlaceAutocompleteSuggestions(
      parsed.data.input,
      parsed.data.sessionToken,
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("[places/autocomplete]", error);
    return NextResponse.json(
      { error: "Unable to fetch address suggestions." },
      { status: 502 },
    );
  }
}
