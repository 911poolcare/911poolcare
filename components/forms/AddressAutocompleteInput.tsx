"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { site } from "@/content/site";
import { isGooglePlacesConfigured, loadGooglePlacesLibrary } from "@/lib/google/load-maps";
import { parsePlaceAddressComponents, type ParsedAddress } from "@/lib/google/parse-address";

type AddressAutocompleteInputProps = {
  onAddressSelect: (address: ParsedAddress) => void;
  onStreetChange: (street: string) => void;
  onInitFailure?: () => void;
  hasError?: boolean;
  className?: string;
  placeholder?: string;
};

type PlaceSuggestion = {
  label: string;
  placePrediction: google.maps.places.PlacePrediction;
};

export function AddressAutocompleteInput({
  onAddressSelect,
  onStreetChange,
  onInitFailure,
  hasError,
  className,
  placeholder = "Start typing your address...",
}: AddressAutocompleteInputProps) {
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [loading, setLoading] = useState(false);

  const listId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const debounceRef = useRef<number | null>(null);
  const requestIdRef = useRef(0);

  const onAddressSelectRef = useRef(onAddressSelect);
  const onStreetChangeRef = useRef(onStreetChange);
  const onInitFailureRef = useRef(onInitFailure);

  onAddressSelectRef.current = onAddressSelect;
  onStreetChangeRef.current = onStreetChange;
  onInitFailureRef.current = onInitFailure;

  useEffect(() => {
    if (!isGooglePlacesConfigured()) {
      return;
    }

    let cancelled = false;

    loadGooglePlacesLibrary()
      .then(({ AutocompleteSessionToken }) => {
        if (cancelled) {
          return;
        }
        sessionTokenRef.current = new AutocompleteSessionToken();
        setReady(true);
      })
      .catch((error) => {
        console.error("[AddressAutocomplete] Failed to initialize:", error);
        onInitFailureRef.current?.();
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const resetSessionToken = useCallback(async () => {
    const { AutocompleteSessionToken } = await loadGooglePlacesLibrary();
    sessionTokenRef.current = new AutocompleteSessionToken();
  }, []);

  const fetchSuggestions = useCallback(async (input: string) => {
    const trimmed = input.trim();
    if (trimmed.length < 3) {
      setSuggestions([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);

    try {
      const { AutocompleteSuggestion } = await loadGooglePlacesLibrary();

      if (!sessionTokenRef.current) {
        await resetSessionToken();
      }

      const { suggestions: results } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: trimmed,
          sessionToken: sessionTokenRef.current ?? undefined,
          includedRegionCodes: ["us"],
          locationBias: {
            radius: 80_000,
            center: site.google.coordinates,
          },
        });

      if (requestId !== requestIdRef.current) {
        return;
      }

      const placeSuggestions = results
        .map((suggestion) => suggestion.placePrediction)
        .filter((prediction): prediction is google.maps.places.PlacePrediction =>
          Boolean(prediction),
        )
        .map((prediction) => ({
          label: prediction.text.text,
          placePrediction: prediction,
        }));

      setSuggestions(placeSuggestions);
      setOpen(placeSuggestions.length > 0);
      setHighlighted(0);
    } catch (error) {
      console.error("[AddressAutocomplete] Suggestion request failed:", error);
      if (requestId === requestIdRef.current) {
        setSuggestions([]);
        setOpen(false);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [resetSessionToken]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    onStreetChangeRef.current(value);

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      void fetchSuggestions(value);
    }, 250);
  };

  const handleSelect = async (index: number) => {
    const suggestion = suggestions[index];
    if (!suggestion) {
      return;
    }

    setOpen(false);
    setSuggestions([]);

    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ["addressComponents"] });
      const parsed = parsePlaceAddressComponents(place.addressComponents ?? []);

      if (parsed.street) {
        setQuery(parsed.street);
        onStreetChangeRef.current(parsed.street);
        onAddressSelectRef.current(parsed);
      } else {
        setQuery(suggestion.label);
        onStreetChangeRef.current(suggestion.label);
      }

      await resetSessionToken();
    } catch (error) {
      console.error("[AddressAutocomplete] Failed to load place details:", error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((current) => Math.min(current + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      void handleSelect(highlighted);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(event) => handleInputChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) {
            setOpen(true);
          }
        }}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open ? `${listId}-option-${highlighted}` : undefined}
        disabled={!ready}
        className={className}
        placeholder={ready ? placeholder : "Loading address search..."}
      />

      {loading ? (
        <p className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          Searching...
        </p>
      ) : null}

      {open && suggestions.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-[100] mt-1 max-h-60 w-full overflow-auto rounded-xl border border-slate-300 bg-white py-1 shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.label}-${index}`}
              id={`${listId}-option-${index}`}
              role="option"
              aria-selected={index === highlighted}
              className={[
                "cursor-pointer px-4 py-2.5 text-sm text-slate-800",
                index === highlighted ? "bg-brand-50 text-brand-900" : "hover:bg-slate-50",
              ].join(" ")}
              onMouseEnter={() => setHighlighted(index)}
              onMouseDown={(event) => {
                event.preventDefault();
                void handleSelect(index);
              }}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
