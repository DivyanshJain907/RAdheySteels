declare global {
  var mongoose: any;

  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

declare module "*.css";

export {};
