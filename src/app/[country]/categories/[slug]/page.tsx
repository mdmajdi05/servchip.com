import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { getCountryByCode } from "@/data/countries";
import { SUPPORTED_COUNTRIES } from "@/lib/localized-path";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { getCategorySeo } from "@/lib/seo/content";
import { getCategoryArticle } from "@/data/category-content";
import CategoryDetailPage from "@/app/categories/[slug]/page-client";

/** Strip [label](url) links and **bold** markers for plain-text schema output. */
function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

export async function generateStaticParams() {
  const countries = SUPPORTED_COUNTRIES;
  return countries.flatMap((country) =>
    CATEGORIES.map((cat) => ({ country, slug: cat.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const category = CATEGORIES.find((c) => c.slug === slug);
  const seo = category ? getCategorySeo(category.id) : undefined;
  if (!countryObj || !market || !category || !seo) return {};

  const metadata =
    createEntityMetadata("category", country, {
      slug: category.slug,
      category: category.name,
      categoryLower: category.name.toLowerCase(),
      categoryDescription: category.description,
      categoryMetaTitle: seo.metaTitle,
      categoryMetaDescription: seo.metaDescription,
      categoryKeywords: seo.keywords ?? [],
    }) ?? {};

  // Per-country meta override (e.g. UAE/Dubai-specific title & description).
  const override = seo.countryMeta?.[country];
  if (override) {
    metadata.title = override.metaTitle;
    metadata.description = override.metaDescription;
  }

  // Full head-tag override for the AE AI-servers landing page.
  if (country === "ae" && slug === "ai-servers-platforms") {
    const pageUrl = "https://servchip.com/ae/categories/ai-servers-platforms";
    const ogImage = "https://servchip.com/images/og/ai-servers-uae.jpg";
    const ogTitle = "AI Server Reseller in UAE & Dubai | Servchip";
    metadata.openGraph = {
      ...(typeof metadata.openGraph === "object" ? metadata.openGraph : null),
      type: "website",
      url: pageUrl,
      title: ogTitle,
      description:
        "Authorized AI server reseller and distributor in UAE. Dell, HPE, Supermicro, Lenovo, Gigabyte, ASUS, Inspur, Quanta, Foxconn and Wiwynn GPU platforms.",
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    };
    metadata.twitter = {
      ...(typeof metadata.twitter === "object" ? metadata.twitter : null),
      card: "summary_large_image",
      title: ogTitle,
      description:
        "Authorized AI server reseller in UAE. Request a quote on NVIDIA GPU servers.",
      images: [ogImage],
    };
  }

  return metadata;
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!countryObj || !category) notFound();

  const article = getCategoryArticle(category.slug, country);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(country, [
            { name: "Categories", url: "/categories" },
            {
              name: category.name,
              url: `/categories/${category.slug}`,
            },
          ]),
        )}
      />
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={faqSchema(
            article.faqs.map((f) => ({
              question: stripMarkdown(f.q),
              answer: stripMarkdown(f.a),
            })),
          )}
        />
      )}
      <CategoryDetailPage content={article} />
    </>
  );
}
