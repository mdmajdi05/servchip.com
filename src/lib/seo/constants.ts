import { SITE } from "../constants";

export const OG_IMAGE = `${SITE.url}/og-image.png`;
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const HREFLANG_ALTERNATES = [
  { hrefLang: "en-in", url: SITE.url },
  { hrefLang: "en-ae", url: SITE.url },
  { hrefLang: "en", url: SITE.url },
  { hrefLang: "x-default", url: SITE.url },
] as const;
