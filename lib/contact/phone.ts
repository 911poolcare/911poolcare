/** Strip non-digits and keep at most 10 US phone digits. */
export function stripPhoneDigits(value: string) {
  return value.replace(/\D/g, "").replace(/^1(\d{10})$/, "$1").slice(0, 10);
}

/** Format as (512) 658-4252 while the user types. */
export function formatPhoneInput(value: string) {
  const digits = stripPhoneDigits(value);
  if (!digits.length) return "";

  if (digits.length < 4) {
    return `(${digits}`;
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
