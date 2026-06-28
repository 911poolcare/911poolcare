"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { ParsedAddress } from "@/lib/google/parse-address";

type AddressAutocompleteInputProps = {
  onAddressSelect: (address: ParsedAddress) => void;
  onStreetChange: (street: string) => void;
  hasError?: boolean;
  className?: string;
  placeholder?: string;
};

type Suggestion = {
  placeId: string;
  label: string;
};

function createSessionToken() {
  return crypto.randomUUID();
}

export function AddressAutocompleteInput({
  onAddressSelect,
  onStreetChange,
  hasError,
  className,
  placeholder = "Start typing your address...",
}: AddressAutocompleteInputProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const listId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef(createSessionToken());
  const debounceRef = useRef<number | null>(null);
  const requestIdRef = useRef(0);

  const onAddressSelectRef = useRef(onAddressSelect);
  const onStreetChangeRef = useRef(onStreetChange);

  onAddressSelectRef.current = onAddressSelect;
  onStreetChangeRef.current = onStreetChange;

  const fetchSuggestions = async (input: string) => {
    const trimmed = input.trim();
    if (trimmed.length < 3) {
      setSuggestions([]);
      setOpen(false);
      setLoading(false);
      setApiError(null);
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setApiError(null);

    try {
      const response = await fetch("/api/places/autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: trimmed,
          sessionToken: sessionTokenRef.current,
        }),
      });

      if (requestId !== requestIdRef.current) {
        return;
      }

      if (!response.ok) {
        setSuggestions([]);
        setOpen(false);
        setApiError("Address search is temporarily unavailable.");
        return;
      }

      const data = (await response.json()) as { suggestions?: Suggestion[] };
      const results = data.suggestions ?? [];

      setSuggestions(results);
      setOpen(results.length > 0);
      setHighlighted(0);
    } catch (error) {
      console.error("[AddressAutocomplete]", error);
      if (requestId === requestIdRef.current) {
        setSuggestions([]);
        setOpen(false);
        setApiError("Address search is temporarily unavailable.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

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
    setLoading(true);

    try {
      const response = await fetch("/api/places/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId: suggestion.placeId,
          sessionToken: sessionTokenRef.current,
        }),
      });

      if (!response.ok) {
        setQuery(suggestion.label);
        onStreetChangeRef.current(suggestion.label);
        setApiError("Could not load that address. Try again or type it manually.");
        return;
      }

      const data = (await response.json()) as { address?: ParsedAddress };
      const address = data.address;

      if (address?.street) {
        setQuery(address.street);
        onStreetChangeRef.current(address.street);
        onAddressSelectRef.current(address);
      } else {
        setQuery(suggestion.label);
        onStreetChangeRef.current(suggestion.label);
      }

      sessionTokenRef.current = createSessionToken();
      setApiError(null);
    } catch (error) {
      console.error("[AddressAutocomplete]", error);
      setApiError("Could not load that address. Try again or type it manually.");
    } finally {
      setLoading(false);
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
        aria-invalid={hasError || undefined}
        aria-activedescendant={open ? `${listId}-option-${highlighted}` : undefined}
        className={className}
        placeholder={placeholder}
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
              key={`${suggestion.placeId}-${index}`}
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

      {apiError ? (
        <p className="mt-1 text-xs text-amber-700" role="status">
          {apiError}
        </p>
      ) : null}
    </div>
  );
}
