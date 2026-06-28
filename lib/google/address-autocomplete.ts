/** Client-safe check — autocomplete UI is shown when a public key is configured. */
export function isAddressAutocompleteEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY);
}
