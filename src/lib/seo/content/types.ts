export interface SeoEntry {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Per-country meta overrides (e.g. UAE/Dubai-specific title & description). */
  countryMeta?: Record<string, { metaTitle: string; metaDescription: string }>;
}
