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

  useEffect(() => {
    if (!isGooglePlacesConfigured() || !containerRef.current) {
      return;
    }

    let autocomplete: google.maps.places.PlaceAutocompleteElement | null = null;
    let cancelled = false;

    const handleSelect = async (event: Event) => {
      const selectEvent = event as google.maps.places.PlacePredictionSelectEvent;
      const place = selectEvent.placePrediction.toPlace();
      await place.fetchFields({ fields: ["addressComponents"] });
      const parsed = parsePlaceAddressComponents(place.addressComponents ?? []);
      if (parsed.street) {
        onAddressSelect(parsed);
      }
    };

    loadGooglePlacesLibrary()
      .then(({ PlaceAutocompleteElement }) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        autocomplete = new PlaceAutocompleteElement({
          includedRegionCodes: ["us"],
          locationBias: {
            radius: 80_000,
            center: site.google.coordinates,
          },
        });

        autocomplete.placeholder = placeholder;
        autocomplete.classList.add("address-autocomplete");
        if (hasError) {
          autocomplete.classList.add("address-autocomplete--error");
        }

        autocomplete.addEventListener("gmp-select", handleSelect);
        containerRef.current.replaceChildren(autocomplete);
      })
      .catch((error) => {
        console.warn("[AddressAutocomplete]", error);
      });

    return () => {
      cancelled = true;
      autocomplete?.removeEventListener("gmp-select", handleSelect);
      containerRef.current?.replaceChildren();
    };
  }, [hasError, onAddressSelect, placeholder]);

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
