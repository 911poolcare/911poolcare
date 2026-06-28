export type ParsedAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type AddressComponentLike = {
  long_name?: string;
  short_name?: string;
  longText?: string | null;
  shortText?: string | null;
  types: string[];
};

function getLongName(component: AddressComponentLike) {
  return component.longText ?? component.long_name ?? "";
}

function getShortName(component: AddressComponentLike) {
  return component.shortText ?? component.short_name ?? "";
}

/** Parse Google address components (legacy or Places API New). */
export function parsePlaceAddressComponents(
  components: AddressComponentLike[],
): ParsedAddress {
  let streetNumber = "";
  let route = "";
  let city = "";
  let state = "";
  let zip = "";

  for (const component of components) {
    const types = component.types;

    if (types.includes("street_number")) {
      streetNumber = getLongName(component);
    }
    if (types.includes("route")) {
      route = getLongName(component);
    }
    if (types.includes("locality")) {
      city = getLongName(component);
    }
    if (!city && types.includes("sublocality")) {
      city = getLongName(component);
    }
    if (!city && types.includes("sublocality_level_1")) {
      city = getLongName(component);
    }
    if (types.includes("administrative_area_level_1")) {
      state = getShortName(component);
    }
    if (types.includes("postal_code")) {
      zip = getLongName(component);
    }
  }

  return {
    street: [streetNumber, route].filter(Boolean).join(" "),
    city,
    state,
    zip,
  };
}

/** @deprecated Use parsePlaceAddressComponents */
export const parseGoogleAddressComponents = parsePlaceAddressComponents;
