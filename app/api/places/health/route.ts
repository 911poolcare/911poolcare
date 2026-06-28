import { NextResponse } from "next/server";
import {
  fetchPlaceAutocompleteSuggestions,
  isGooglePlacesServerConfigured,
  PlacesApiError,
} from "@/lib/google/places-server";

/** Lightweight diagnostic — hit /api/places/health in a browser to verify Google config. */
export async function GET() {
  if (!isGooglePlacesServerConfigured()) {
    return NextResponse.json({
      ok: false,
      reason: "missing_api_key",
      hint: "Set GOOGLE_PLACES_API_KEY (or NEXT_PUBLIC_GOOGLE_PLACES_API_KEY) in Vercel.",
    });
  }

  try {
    const suggestions = await fetchPlaceAutocompleteSuggestions(
      "2413 Billy Pat",
      crypto.randomUUID(),
    );

    return NextResponse.json({
      ok: true,
      suggestionCount: suggestions.length,
      sample: suggestions[0]?.label ?? null,
    });
  } catch (error) {
    if (error instanceof PlacesApiError) {
      return NextResponse.json({
        ok: false,
        reason: error.googleStatus ?? "places_api_error",
        httpStatus: error.status,
        hint:
          error.googleStatus === "PERMISSION_DENIED"
            ? "Check API key restrictions (use Application restrictions: None for server) and billing."
            : "See Vercel function logs for the full Google error message.",
      });
    }

    return NextResponse.json({
      ok: false,
      reason: "unknown_error",
    });
  }
}
