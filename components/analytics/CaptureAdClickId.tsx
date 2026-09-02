import Script from "next/script";

/** Persists Google Ads click IDs (gclid / gbraid / wbraid) for 90 days, before React hydrates. */
export function CaptureAdClickId() {
  return (
    <Script id="capture-ad-click-id" strategy="beforeInteractive">{`
      (function () {
        try {
          var params = new URLSearchParams(window.location.search);
          var keys = ["gclid", "gbraid", "wbraid"];
          var value = null;
          var source = null;
          for (var i = 0; i < keys.length; i++) {
            var raw = params.get(keys[i]);
            if (!raw) continue;
            var trimmed = String(raw).trim();
            if (/^[A-Za-z0-9._~-]{1,255}$/.test(trimmed)) {
              value = trimmed;
              source = keys[i];
              break;
            }
          }
          if (!value || !source) return;
          var maxAge = 90 * 24 * 60 * 60;
          var secure = location.protocol === "https:" ? "; Secure" : "";
          var attrs = "; Max-Age=" + maxAge + "; Path=/; SameSite=Lax" + secure;
          document.cookie = "_ad_click_id=" + encodeURIComponent(value) + attrs;
          document.cookie = "_ad_click_source=" + encodeURIComponent(source) + attrs;
        } catch (e) {}
      })();
    `}</Script>
  );
}
