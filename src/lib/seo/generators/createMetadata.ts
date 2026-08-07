import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getLocalizedPath } from "@/lib/localized-path";
import { createSeoMetadata, type SeoMetadataInput } from "../metadata";
import { countryVars } from "../config/countries";
import { interpolate } from "../helpers/interpolate";
import { STATIC_PAGE_TEMPLATES, ENTITY_TEMPLATES } from "../templates";
import type { StaticRoute } from "../templates/pages";
import type { EntityRoute } from "../templates/entities";
import type { SeoFields } from "../templates/types";
import { interpolateFields } from "./interpolateFields";

type EntityExtra = Partial<
  Omit<SeoMetadataInput, "title" | "description" | "path">
>;

/**
 * Central SEO entry point for every static page.
 * Global:  createMetadata("about")
 * Country: createMetadata("about", "us")
 */
export function createMetadata(page: StaticRoute): Metadata;
export function createMetadata(
  page: StaticRoute,
  country: string,
): Metadata | null;
export function createMetadata(
  page: StaticRoute,
  country?: string,
): Metadata | null {
  const def = STATIC_PAGE_TEMPLATES[page];

  if (!country) {
    return createSeoMetadata({
      title: def.title,
      description: def.description,
      path: def.path,
      keywords: def.keywords,
      openGraphTitle: def.openGraphTitle,
      openGraphDescription: def.openGraphDescription,
      twitterTitle: def.twitterTitle,
      twitterDescription: def.twitterDescription,
      robots: def.robots,
      noindex: def.noindex,
    });
  }

  const vars = countryVars(country);
  if (!vars) return null;

  const countrySource =
    typeof def.country === "function" ? def.country(vars) : (def.country ?? {});
  const fields = interpolateFields(
    countrySource,
    vars as unknown as Record<string, string | string[]>,
  );
  const path = getLocalizedPath(country, def.path);

  return createSeoMetadata({
    title: fields.title ?? def.title,
    description: fields.description ?? def.description,
    path,
    keywords: fields.keywords ?? def.keywords,
    openGraphTitle: fields.openGraphTitle,
    openGraphDescription: fields.openGraphDescription,
    twitterTitle: fields.twitterTitle,
    twitterDescription: fields.twitterDescription,
    robots: fields.robots ?? def.robots,
    noindex: fields.noindex ?? def.noindex,
    alternates: {
      languages: {
        "x-default": `${SITE.url}${def.path}`,
        [vars.locale]: `${SITE.url}${path}`,
      },
    },
  });
}

/**
 * Central SEO entry point for entity pages (product, brand, category, blog...).
 * Global:  createEntityMetadata("brand", undefined, { slug, brand, ... })
 * Country: createEntityMetadata("brand", "us", { slug, brand, ... })
 */
export function createEntityMetadata(
  page: EntityRoute,
  country: string | undefined,
  vars: Record<string, string | string[]>,
  extra: EntityExtra = {},
): Metadata | null {
  const def = ENTITY_TEMPLATES[page];
  const countryV = country ? countryVars(country) : undefined;
  if (country && !countryV) return null;

  const allVars = countryV ? { ...vars, ...countryV } : vars;
  const globalPath = interpolate(def.globalPath, allVars) as string;

  if (country && countryV) {
    const fields = interpolateFields(def.country, allVars) as SeoFields;
    const path = getLocalizedPath(country, globalPath);
    return createSeoMetadata({
      ...extra,
      title: fields.title,
      description: fields.description,
      path,
      keywords: fields.keywords,
      openGraphTitle: fields.openGraphTitle,
      openGraphDescription: fields.openGraphDescription,
      twitterTitle: fields.twitterTitle,
      twitterDescription: fields.twitterDescription,
      robots: fields.robots ?? extra.robots,
      noindex: fields.noindex ?? extra.noindex,
      alternates: {
        languages: {
          "x-default": `${SITE.url}${globalPath}`,
          [countryV.locale]: `${SITE.url}${path}`,
        },
      },
    });
  }

  const fields = interpolateFields(def.global, allVars) as SeoFields;
  return createSeoMetadata({
    ...extra,
    title: fields.title,
    description: fields.description,
    path: globalPath,
    keywords: fields.keywords,
    openGraphTitle: fields.openGraphTitle,
    openGraphDescription: fields.openGraphDescription,
    twitterTitle: fields.twitterTitle,
    twitterDescription: fields.twitterDescription,
    robots: fields.robots ?? extra.robots,
    noindex: fields.noindex ?? extra.noindex,
  });
}
