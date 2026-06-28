"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { isGooglePlacesConfigured, loadGooglePlacesLibrary } from "@/lib/google/load-maps";
import { parsePlaceAddressComponents, type ParsedAddress } from "@/lib/google/parse-address";

type AddressAutocompleteInputProps = {
  onAddressSelect: (address: ParsedAddress) => void;
  onInitFailure?: () => void;
  hasError?: boolean;
  placeholder?: string;
};

const INIT_RETRY_DELAYS_MS = [0, 500, 1500];

export function AddressAutocompleteInput({
  onAddressSelect,
  onInitFailure,
  hasError,
  placeholder = "Start typing your address...",
}: AddressAutocompleteInputProps) {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.PlaceAutocompleteElement | null>(null);
  const onAddressSelectRef = useRef(onAddressSelect);
  const onInitFailureRef = useRef(onInitFailure);

  onAddressSelectRef.current = onAddressSelect;
  onInitFailureRef.current = onInitFailure;

  const setHostRef = useCallback((node: HTMLDivElement | null) => {
    setHost(node);
  }, []);

  useEffect(() => {
    if (!isGooglePlacesConfigured() || !host) {
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];

    const handleSelect = async (event: Event) => {
      const selectEvent = event as google.maps.places.PlacePredictionSelectEvent;
      const place = selectEvent.placePrediction.toPlace();
      await place.fetchFields({ fields: ["addressComponents"] });
      const parsed = parsePlaceAddressComponents(place.addressComponents ?? []);
      if (parsed.street) {
        onAddressSelectRef.current(parsed);
      }
    };

    const mountAutocomplete = async () => {
      const { PlaceAutocompleteElement } = await loadGooglePlacesLibrary();
      if (cancelled || !host.isConnected) {
        return false;
      }

      const autocomplete = new PlaceAutocompleteElement({
        includedRegionCodes: ["us"],
        locationBias: {
          radius: 80_000,
          center: site.google.coordinates,
        },
      });

      autocomplete.placeholder = placeholder;
      autocomplete.classList.add("address-autocomplete");
      autocomplete.addEventListener("gmp-select", handleSelect);
      host.replaceChildren(autocomplete);
      autocompleteRef.current = autocomplete;
      return true;
    };

    const tryInit = (attempt: number) => {
      const delay = INIT_RETRY_DELAYS_MS[attempt] ?? 1500;

      const timeout = window.setTimeout(() => {
        void mountAutocomplete()
          .then((mounted) => {
            if (mounted || cancelled) {
              return;
            }

            if (attempt < INIT_RETRY_DELAYS_MS.length - 1) {
              tryInit(attempt + 1);
              return;
            }

            onInitFailureRef.current?.();
          })
          .catch((error) => {
            console.error("[AddressAutocomplete] Failed to initialize:", error);

            if (cancelled) {
              return;
            }

            if (attempt < INIT_RETRY_DELAYS_MS.length - 1) {
              tryInit(attempt + 1);
              return;
            }

            onInitFailureRef.current?.();
          });
      }, delay);

      timeouts.push(timeout);
    };

    tryInit(0);

    return () => {
      cancelled = true;
      for (const timeout of timeouts) {
        window.clearTimeout(timeout);
      }
      autocompleteRef.current?.removeEventListener("gmp-select", handleSelect);
      autocompleteRef.current = null;
      host.replaceChildren();
    };
  }, [host, placeholder]);

  useEffect(() => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) {
      return;
    }

    autocomplete.classList.toggle("address-autocomplete--error", Boolean(hasError));
  }, [hasError, host]);

  return (
    <div
      ref={setHostRef}
      className={[
        "address-autocomplete-host",
        hasError ? "address-autocomplete-host--error" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
