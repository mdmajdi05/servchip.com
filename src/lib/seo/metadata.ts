import type { Metadata } from "next";
import { SITE } from "../constants";
import { OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "./constants";

export interface SeoImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SeoMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: SeoImage;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  robots?: Metadata["robots"];
  noindex?: boolean;
  alternates?: Metadata["alternates"];
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

const DEFAULT_IMAGE: SeoImage = {
  url: OG_IMAGE,
  alt: SITE.name,
  width: OG_WIDTH,
  height: OG_HEIGHT,
};

/**
 * Centralized metadata builder. Every page delegates to this so that
 * canonical, robots, Open Graph, Twitter Card, and hreflang are always
 * emitted consistently with zero per-page duplication.
 */
export function createSeoMetadata(input: SeoMetadataInput): Metadata {
  const { title, description, path } = input;
  const url = `${SITE.url}${path}`;
  const image = input.image ?? DEFAULT_IMAGE;

  const metadata: Metadata = {
    title,
    description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    alternates: {
      canonical: url,
      ...input.alternates,
    },
    robots:
      input.noindex === true
        ? { index: false, follow: false }
        : (input.robots ?? { index: true, follow: true }),
    openGraph: {
      type: input.type ?? "website",
      url,
      siteName: SITE.name,
      locale: "en_IN",
      title: input.openGraphTitle ?? title,
      description: input.openGraphDescription ?? description,
      images: [
        {
          url: image.url,
          secureUrl: image.url,
          width: image.width ?? OG_WIDTH,
          height: image.height ?? OG_HEIGHT,
          alt: image.alt,
          ...(image.url.endsWith(".png") ? { type: "image/png" } : {}),
        },
      ],
      ...(input.type === "article" && input.publishedTime
        ? { publishedTime: input.publishedTime }
        : {}),
      ...(input.authors?.length ? { authors: input.authors } : {}),
      ...(input.tags?.length ? { tags: input.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.twitterTitle ?? input.openGraphTitle ?? title,
      description:
        input.twitterDescription ?? input.openGraphDescription ?? description,
      images: [image.url],
      site: "@servchip",
      creator: "@servchip",
    },
  };

  return metadata;
}
