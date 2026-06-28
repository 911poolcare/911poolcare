export type ParsedAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

/** Parse Google Places `address_components` into form fields. */
export function parseGoogleAddressComponents(
  components: google.maps.GeocoderAddressComponent[],
): ParsedAddress {
  let streetNumber = "";
  let route = "";
  let city = "";
  let state = "";
  let zip = "";

  for (const component of components) {
    const types = component.types;

    if (types.includes("street_number")) {
      streetNumber = component.long_name;
    }
    if (types.includes("route")) {
      route = component.long_name;
    }
    if (types.includes("locality")) {
      city = component.long_name;
    }
    if (!city && types.includes("sublocality")) {
      city = component.long_name;
    }
    if (!city && types.includes("sublocality_level_1")) {
      city = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      state = component.short_name;
    }
    if (types.includes("postal_code")) {
      zip = component.long_name;
    }
  }

  return {
    street: [streetNumber, route].filter(Boolean).join(" "),
    city,
    state,
    zip,
  };
}
