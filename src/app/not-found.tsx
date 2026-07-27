import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";

export const metadata: Metadata = {
  title: `404 — Page Not Found | ${SITE.name}`,
  description:
    "The page you are looking for does not exist or has been moved. Browse enterprise chips, AI accelerators, and semiconductor procurement solutions at Servchip.",
  robots: { index: false, follow: true },
  openGraph: {
    title: `404 — Page Not Found | ${SITE.name}`,
    description:
      "The page you are looking for does not exist or has been moved. Browse enterprise chips, AI accelerators, and semiconductor procurement at Servchip.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip — Page Not Found",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `404 — Page Not Found | ${SITE.name}`,
    description:
      "The page you are looking for does not exist or has been moved.",
    images: [OG_IMAGE],
  },
};

export default function NotFound() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "404 — Page Not Found", url: "/404" },
        ])}
      />
      <NotFoundContent />
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link href="/products" className="text-sm text-primary hover:underline">
          Browse Products
        </Link>
        <Link
          href="/categories"
          className="text-sm text-primary hover:underline"
        >
          Browse Categories
        </Link>
        <Link href="/contact" className="text-sm text-primary hover:underline">
          Contact Support
        </Link>
      </div>
    </>
  );
}
