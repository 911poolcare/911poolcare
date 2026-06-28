export const THANK_YOU_SESSION_KEY = "911poolcare_contact_submitted";

/** Call after a successful form submission, before navigating to /thank-you. */
export function grantThankYouAccess() {
  sessionStorage.setItem(THANK_YOU_SESSION_KEY, String(Date.now()));
}

/** Returns true once per submission; clears the flag so the page cannot be revisited directly. */
export function consumeThankYouAccess(): boolean {
  const value = sessionStorage.getItem(THANK_YOU_SESSION_KEY);
  if (!value) return false;
  sessionStorage.removeItem(THANK_YOU_SESSION_KEY);
  return true;
}
