import type { SeoFields } from "../templates/types";

/**
 * Per-country SEO content overrides. Key: `${country}-${page}` e.g. "us-about".
 * When a specific market needs fully custom metadata that the country template
 * cannot express, add it here and it wins over the interpolated template.
 */
export const SEO_CONTENT_OVERRIDES: Record<string, Partial<SeoFields>> = {};
