import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/blog";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { COUNTRIES, getCountryPath } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { INDUSTRIES } from "@/data/industries";
import { SOLUTIONS } from "@/data/solutions";
import { ALL_PRODUCTS } from "@/data/products";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/comparison`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // /technology and /resources are real routes (linked from the header nav
    // and homepage) - they belong in the sitemap.
    {
      url: `${baseUrl}/countries`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/technology`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/developer-hub`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/rfq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const manufacturerPages: MetadataRoute.Sitemap = BRANDS.map((m) => ({
    url: `${baseUrl}/brands/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const manufacturerCategoryPages: MetadataRoute.Sitemap = BRANDS.flatMap((m) =>
    m.categories.map((c) => ({
      url: `${baseUrl}/brands/${m.slug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  // Every indexable product page: chips + AI servers + networking + memory
  // + storage. Slugs are deduped defensively so no URL appears twice.
  const productSlugs = Array.from(
    new Map(ALL_PRODUCTS.map((p) => [p.slug, p])).keys(),
  );

  const chipPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.filter(
    (p) => p.isPublished,
  ).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const countryProductPages: MetadataRoute.Sitemap = COUNTRIES.filter(
    (c) => COUNTRY_MARKETS[c.code],
  ).flatMap((c) =>
    productSlugs.map((slug) => ({
      url: `${baseUrl}${getCountryPath(c)}/products/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  // Country detail pages (/countries/[slug]) - the canonical slug variants.
  // Code-based aliases (e.g. /countries/ae) canonical to these, so only the
  // slug URLs belong in the sitemap.
  const countryDetailPages: MetadataRoute.Sitemap = COUNTRIES.map((c) => ({
    url: `${baseUrl}/countries/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const solutionPages: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const marketCountries = COUNTRIES.filter((c) => COUNTRY_MARKETS[c.code]);

  const countrySubpages: MetadataRoute.Sitemap = marketCountries.flatMap(
    (c) => {
      const root = `${baseUrl}${getCountryPath(c)}`;
      const subpages: MetadataRoute.Sitemap = [
        {
          url: root,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: 0.9,
        },
        {
          url: `${root}/products`,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: 0.9,
        },
        {
          url: `${root}/about`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${root}/blog`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: `${root}/categories`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        },
        {
          url: `${root}/comparison`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${root}/contact`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${root}/faq`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${root}/solutions`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${root}/industries`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${root}/technology`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: `${root}/services`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${root}/resources`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        },
        {
          url: `${root}/developer-hub`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
        {
          url: `${root}/rfq`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${root}/countries`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
        {
          url: `${root}/privacy`,
          lastModified: new Date(),
          changeFrequency: "yearly",
          priority: 0.2,
        },
        {
          url: `${root}/return-policy`,
          lastModified: new Date(),
          changeFrequency: "yearly",
          priority: 0.2,
        },
        {
          url: `${root}/terms`,
          lastModified: new Date(),
          changeFrequency: "yearly",
          priority: 0.2,
        },
      ];
      return subpages;
    },
  );

  const countryBrandPages: MetadataRoute.Sitemap = marketCountries.flatMap(
    (c) =>
      BRANDS.flatMap((m) => [
        {
          url: `${baseUrl}${getCountryPath(c)}/brands/${m.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
        ...m.categories.map((cat) => ({
          url: `${baseUrl}${getCountryPath(c)}/brands/${m.slug}/${cat.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ]),
  );

  const countryCategoryPages: MetadataRoute.Sitemap = marketCountries.flatMap(
    (c) =>
      CATEGORIES.map((cat) => ({
        url: `${baseUrl}${getCountryPath(c)}/categories/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  );

  const countryBlogPages: MetadataRoute.Sitemap = marketCountries.flatMap((c) =>
    BLOG_POSTS.filter((p) => p.isPublished).map((post) => ({
      url: `${baseUrl}${getCountryPath(c)}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const countryIndustryPages: MetadataRoute.Sitemap = marketCountries.flatMap(
    (c) =>
      INDUSTRIES.map((i) => ({
        url: `${baseUrl}${getCountryPath(c)}/industries/${i.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );

  const countrySolutionPages: MetadataRoute.Sitemap = marketCountries.flatMap(
    (c) =>
      SOLUTIONS.map((s) => ({
        url: `${baseUrl}${getCountryPath(c)}/solutions/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );

  return [
    ...staticPages,
    ...manufacturerPages,
    ...manufacturerCategoryPages,
    ...chipPages,
    ...categoryPages,
    ...blogPages,
    ...countryProductPages,
    ...countryDetailPages,
    ...industryPages,
    ...solutionPages,
    ...countrySubpages,
    ...countryBrandPages,
    ...countryCategoryPages,
    ...countryBlogPages,
    ...countryIndustryPages,
    ...countrySolutionPages,
  ];
}
