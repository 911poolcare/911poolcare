import { site } from "@/content/site";
import {
  parsePlaceAddressComponents,
  type ParsedAddress,
} from "@/lib/google/parse-address";

export function getGooglePlacesServerApiKey() {
  return (
    process.env.GOOGLE_PLACES_API_KEY ??
    process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ??
    ""
  );
}

export function isGooglePlacesServerConfigured() {
  return Boolean(getGooglePlacesServerApiKey());
}

export type PlaceAutocompleteSuggestion = {
  placeId: string;
  placeResourceName: string;
  label: string;
};

export class PlacesApiError extends Error {
  status: number;
  googleStatus?: string;

  constructor(message: string, status: number, googleStatus?: string) {
    super(message);
    this.name = "PlacesApiError";
    this.status = status;
    this.googleStatus = googleStatus;
  }
}

type GoogleErrorResponse = {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

type PlacesAutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: {
      place?: string;
      placeId?: string;
      text?: { text?: string };
    };
  }>;
};

type PlacesDetailsResponse = {
  addressComponents?: Array<{
    longText?: string;
    shortText?: string;
    types?: string[];
  }>;
};

export async function fetchPlaceAutocompleteSuggestions(
  input: string,
  sessionToken: string,
): Promise<PlaceAutocompleteSuggestion[]> {
  const apiKey = getGooglePlacesServerApiKey();
  if (!apiKey) {
    throw new Error("Google Places API key is not configured");
  }

  const response = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "*",
    },
    body: JSON.stringify({
      input,
      sessionToken,
      includedRegionCodes: ["us"],
      locationBias: {
        circle: {
          center: {
            latitude: site.google.coordinates.lat,
            longitude: site.google.coordinates.lng,
          },
          radius: 50_000.0,
        },
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("[places/autocomplete]", response.status, body);

    let googleStatus: string | undefined;
    let googleMessage: string | undefined;
    try {
      const parsed = JSON.parse(body) as GoogleErrorResponse;
      googleStatus = parsed.error?.status;
      googleMessage = parsed.error?.message;
    } catch {
      // ignore parse errors
    }

    throw new PlacesApiError(
      googleMessage ?? `Places autocomplete failed (${response.status})`,
      response.status,
      googleStatus,
    );
  }

  const data = (await response.json()) as PlacesAutocompleteResponse;

  return (data.suggestions ?? [])
    .map((suggestion) => suggestion.placePrediction)
    .filter((prediction): prediction is NonNullable<typeof prediction> =>
      Boolean(prediction?.placeId && prediction.text?.text),
    )
    .map((prediction) => ({
      placeId: prediction.placeId!,
      placeResourceName: prediction.place ?? `places/${prediction.placeId}`,
      label: prediction.text!.text!,
    }));
}

export async function fetchPlaceAddressDetails(
  placeId: string,
  sessionToken: string,
): Promise<ParsedAddress> {
  const apiKey = getGooglePlacesServerApiKey();
  if (!apiKey) {
    throw new Error("Google Places API key is not configured");
  }

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?sessionToken=${encodeURIComponent(sessionToken)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "addressComponents",
      },
    },
  );

  if (!response.ok) {
    const body = await response.text();
    console.error("[places/details]", response.status, body);
    throw new PlacesApiError(
      `Places details failed (${response.status})`,
      response.status,
    );
  }

  const data = (await response.json()) as PlacesDetailsResponse;
  const components = (data.addressComponents ?? []).map((component) => ({
    longText: component.longText,
    shortText: component.shortText,
    types: component.types ?? [],
  }));
  return parsePlaceAddressComponents(components);
}
