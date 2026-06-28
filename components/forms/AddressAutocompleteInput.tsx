"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { isGooglePlacesConfigured, loadGooglePlacesLibrary } from "@/lib/google/load-maps";
import { parsePlaceAddressComponents, type ParsedAddress } from "@/lib/google/parse-address";

type AddressAutocompleteInputProps = {
  onAddressSelect: (address: ParsedAddress) => void;
  hasError?: boolean;
  className?: string;
  placeholder?: string;
};

export function AddressAutocompleteInput({
  onAddressSelect,
  hasError,
  className,
  placeholder = "Start typing your address...",
}: AddressAutocompleteInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<google.maps.places.PlaceAutocompleteElement | null>(null);
  const onAddressSelectRef = useRef(onAddressSelect);

  onAddressSelectRef.current = onAddressSelect;

  useEffect(() => {
    if (!isGooglePlacesConfigured() || !containerRef.current) {
      return;
    }

    const host = containerRef.current;
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

    void loadGooglePlacesLibrary()
      .then(({ PlaceAutocompleteElement }) => {
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

        autocomplete.placeholder = placeholder;
        autocomplete.classList.add("address-autocomplete");
        autocomplete.addEventListener("gmp-select", handleSelect);
        host.replaceChildren(autocomplete);
        autocompleteRef.current = autocomplete;
      })
      .catch((error) => {
        console.error("[AddressAutocomplete] Failed to initialize:", error);
      });

    return () => {
      cancelled = true;
      autocompleteRef.current?.removeEventListener("gmp-select", handleSelect);
      autocompleteRef.current = null;
      host.replaceChildren();
    };
  }, [placeholder]);

  useEffect(() => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) {
      return;
    }

    autocomplete.classList.toggle("address-autocomplete--error", Boolean(hasError));
  }, [hasError]);

  return (
    <div
      ref={containerRef}
      className={[
        "address-autocomplete-host",
        hasError ? "address-autocomplete-host--error" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
