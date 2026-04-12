const GOOGLE_ADS_ID = "AW-18052344301";

type AdsParams = Record<string, string | number | boolean>;

export function trackGoogleAdsEvent(action: string, params: AdsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", action, {
    send_to: GOOGLE_ADS_ID,
    ...params,
  });
}
