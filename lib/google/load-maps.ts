let mapsLoadPromise: Promise<void> | null = null;

export function getGooglePlacesApiKey() {
  return process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? "";
}

export function isGooglePlacesConfigured() {
  return Boolean(getGooglePlacesApiKey());
}

function waitForGoogleMapsReady(timeoutMs = 15_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const started = Date.now();

    const check = () => {
      if (window.google?.maps?.importLibrary) {
        resolve();
        return;
      }

      if (Date.now() - started >= timeoutMs) {
        reject(new Error("Google Maps failed to load"));
        return;
      }

      window.setTimeout(check, 50);
    };

    check();
  });
}

export function loadGoogleMapsBootstrap(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }

  if (window.google?.maps?.importLibrary) {
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
    const finish = () => {
      waitForGoogleMapsReady().then(resolve).catch((error) => {
        mapsLoadPromise = null;
        reject(error);
      });
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps="bootstrap"]',
    );

    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener(
        "error",
        () => {
          mapsLoadPromise = null;
          reject(new Error("Google Maps failed to load"));
        },
        { once: true },
      );
      finish();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "bootstrap";
    script.onload = finish;
    script.onerror = () => {
      mapsLoadPromise = null;
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(script);
  });

  return mapsLoadPromise;
}

export async function loadGooglePlacesLibrary(): Promise<google.maps.PlacesLibrary> {
  await loadGoogleMapsBootstrap();
  return google.maps.importLibrary("places") as Promise<google.maps.PlacesLibrary>;
}
