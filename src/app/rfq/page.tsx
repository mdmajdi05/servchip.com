import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const hasChip = params.chip !== undefined;

  return {
    title:
      "Request a Quote — Enterprise AI Hardware Pricing & Semiconductor Procurement",
    description:
      "Request a personalized quote for enterprise chips — NVIDIA H100, AMD MI300X, Intel Xeon & Gaudi 3. Volume discounts, 24-hour response time & global shipping from an ISO 9001 certified distributor.",
    keywords: [
      "enterprise chip pricing",
      "NVIDIA H100 quote",
      "AI accelerator pricing",
      "semiconductor procurement quote",
      "bulk chip pricing",
      "data center hardware quote",
    ],
    alternates: { canonical: `${SITE.url}/rfq` },
    robots: hasChip
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: "Request a Quote | Servchip — Enterprise Chip Distributor",
      description:
        "Get enterprise chip pricing. NVIDIA, AMD, Intel hardware. Volume discounts & 24-hour quotes.",
      images: [
        {
          url: OG_IMAGE,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: "Servchip — Request Enterprise Chip Pricing",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Request a Quote | Servchip — Enterprise Chip Distributor",
      description:
        "Get enterprise chip pricing. NVIDIA, AMD, Intel hardware. Volume discounts & 24-hour quotes.",
      images: [OG_IMAGE],
    },
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Request a Quote", url: "/rfq" },
        ])}
      />
      <PageClient />
    </>
  );
}
