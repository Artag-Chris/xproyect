type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function getDataLayer(): unknown[] {
  if (typeof window === 'undefined') return [];
  if (!window.dataLayer) window.dataLayer = [];
  return window.dataLayer;
}

export function trackEvent(eventName: string, params?: EventParams) {
  const dataLayer = getDataLayer();
  dataLayer.push({
    event: eventName,
    ...params,
  });
}

export function trackPageView(pageName: string, language: string, url: string) {
  trackEvent('page_viewed', {
    page_name: pageName,
    language,
    url,
  });
}
