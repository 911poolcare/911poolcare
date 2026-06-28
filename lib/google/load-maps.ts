let mapsLoadPromise: Promise<void> | null = null;

export function getGooglePlacesApiKey() {
  return process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? "";
}

export function isGooglePlacesConfigured() {
  return Boolean(getGooglePlacesApiKey());
}

export function loadGoogleMapsBootstrap(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  const apiKey = getGooglePlacesApiKey();
  if (!apiKey) {
    return Promise.reject(new Error("NEXT_PUBLIC_GOOGLE_PLACES_API_KEY is not set"));
  }

  if (mapsLoadPromise) {
    return mapsLoadPromise;
  }

  mapsLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps="bootstrap"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Google Maps failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "bootstrap";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });

  return mapsLoadPromise;
}

export async function loadGooglePlacesLibrary(): Promise<google.maps.PlacesLibrary> {
  await loadGoogleMapsBootstrap();
  return google.maps.importLibrary("places") as Promise<google.maps.PlacesLibrary>;
}
