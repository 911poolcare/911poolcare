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

    const handleSelect = async (event: Event) => {
      const selectEvent = event as google.maps.places.PlacePredictionSelectEvent;
      const place = selectEvent.placePrediction.toPlace();
      await place.fetchFields({ fields: ["addressComponents"] });
      const parsed = parsePlaceAddressComponents(place.addressComponents ?? []);
      if (parsed.street) {
        onAddressSelectRef.current(parsed);
      }
    };

    const init = async () => {
      try {
        const { PlaceAutocompleteElement } = await loadGooglePlacesLibrary();
        if (cancelled || !host.isConnected) {
          return;
        }

        const autocomplete = new PlaceAutocompleteElement({
          includedRegionCodes: ["us"],
          locationBias: {
            radius: 80_000,
            center: site.google.coordinates,
          },
        });

        await customElements.whenDefined("gmp-place-autocomplete");

        if (cancelled || !host.isConnected) {
          return;
        }

        autocomplete.placeholder = placeholder;
        autocomplete.classList.add("address-autocomplete");
        autocomplete.addEventListener("gmp-select", handleSelect);
        host.replaceChildren(autocomplete);
        autocompleteRef.current = autocomplete;
      } catch (error) {
        console.error("[AddressAutocomplete] Failed to initialize:", error);
        onInitFailureRef.current?.();
      }
    };

    const frame = window.requestAnimationFrame(() => {
      void init();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
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
