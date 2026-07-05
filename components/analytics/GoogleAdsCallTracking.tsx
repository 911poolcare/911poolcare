import Script from "next/script";

const adsId = "AW-16454489422";
const conversionId = "AW-16454489422/IvjYCILq5O0bEM6qjqY9";
const phoneConversionNumber = "512-947-2023";

/** Google Ads call tracking — loads independently of GA4 so phone swap always has gtag. */
export function GoogleAdsCallTracking() {
  return (
    <>
      <Script id="google-ads-phone-bootstrap" strategy="beforeInteractive">
        {`
          (function () {
            var q = location.search;
            if (!/(?:\\?|&)(?:gclid|gclsrc|gbraid|wbraid|gad_source)=/.test(q)) return;
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('config', '${adsId}', { phone_conversion_number: '${phoneConversionNumber}' });
            gtag('config', '${conversionId}', { phone_conversion_number: '${phoneConversionNumber}' });
          })();
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-call-tracking" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${adsId}', { phone_conversion_number: '${phoneConversionNumber}' });
          gtag('config', '${conversionId}', { phone_conversion_number: '${phoneConversionNumber}' });
        `}
      </Script>
    </>
  );
}
