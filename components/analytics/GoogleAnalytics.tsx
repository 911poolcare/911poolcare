import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gtmId = "GTM-N4BVSG9T";

/** GTM script tag for <head> */
export function GoogleTagManager() {
  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `}
    </Script>
  );
}

/** GTM noscript fallback for <body> */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

/** Renders GA4 + Google Ads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set in Vercel env vars. */
export function GoogleAnalytics() {
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
          gtag('config', 'AW-16454489422');
          gtag('config', 'AW-16454489422/IvjYCILq5O0bEM6qjqY9', {
            'phone_conversion_number': '512-947-2023'
          });
        `}
      </Script>
    </>
  );
}
