"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { site } from "@/content/site";
import { isGooglePlacesConfigured, loadGoogleMapsPlaces } from "@/lib/google/load-maps";
import { parseGoogleAddressComponents, type ParsedAddress } from "@/lib/google/parse-address";

type AddressAutocompleteInputProps = {
  onAddressSelect: (address: ParsedAddress) => void;
  hasError?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type">;

export const AddressAutocompleteInput = forwardRef<
  HTMLInputElement,
  AddressAutocompleteInputProps
>(function AddressAutocompleteInput(
  { onAddressSelect, hasError, className, ...inputProps },
  forwardedRef,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    if (!isGooglePlacesConfigured() || !inputRef.current) {
      return;
    }

    let listener: google.maps.MapsEventListener | null = null;
    let cancelled = false;

    loadGoogleMapsPlaces()
      .then(() => {
        if (cancelled || !inputRef.current || !window.google?.maps?.places) {
          return;
        }

        const { lat, lng } = site.google.coordinates;
        const center = new google.maps.LatLng(lat, lng);
        const bounds = new google.maps.Circle({
          center,
          radius: 80_000,
        }).getBounds();

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "us" },
          fields: ["address_components"],
          types: ["address"],
          ...(bounds ? { bounds, strictBounds: false } : {}),
        });

        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.address_components?.length) {
            return;
          }

          const parsed = parseGoogleAddressComponents(place.address_components);
          if (!parsed.street) {
            return;
          }

          onAddressSelect(parsed);
        });

        autocompleteRef.current = autocomplete;
      })
      .catch((error) => {
        console.warn("[AddressAutocomplete]", error);
      });

    return () => {
      cancelled = true;
      listener?.remove();
      autocompleteRef.current = null;
    };
  }, [onAddressSelect]);

  return (
    <input
      {...inputProps}
      ref={inputRef}
      type="text"
      autoComplete="off"
      className={className}
      aria-invalid={hasError || undefined}
    />
  );
});
