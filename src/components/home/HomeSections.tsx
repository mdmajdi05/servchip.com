"use client";

import dynamic from "next/dynamic";
import { TrustBar } from "@/components/home/TrustBar";
import { ClientLogos } from "@/components/home/ClientLogos";

const Hero3D = dynamic(
  () => import("@/components/home/Hero3D").then((m) => m.Hero3D),
  {
    ssr: false,
    loading: () => (
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#070B15" }}
      >
        <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </section>
    ),
  },
);
const BrandSpotlight = dynamic(
  () =>
    import("@/components/home/BrandSpotlight").then((m) => m.BrandSpotlight),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-gradient-to-b from-bg-dark to-surface">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="h-8 w-48 bg-surface-2 rounded mx-auto" />
          <div className="h-4 w-72 bg-surface-2 rounded mx-auto mb-12" />
        </div>
      </div>
    ),
  },
);
const StatsCounter = dynamic(
  () => import("@/components/home/StatsCounter").then((m) => m.StatsCounter),
  {
    ssr: false,
    loading: () => (
      <div className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 w-24 bg-surface-2 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    ),
  },
);
const CategoriesGrid = dynamic(
  () =>
    import("@/components/home/CategoriesGrid").then((m) => m.CategoriesGrid),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 bg-surface rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    ),
  },
);
const WorkloadSolutions = dynamic(
  () =>
    import("@/components/home/WorkloadSolutions").then(
      (m) => m.WorkloadSolutions,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="h-8 w-56 bg-surface-2 rounded" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-surface-2 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
);
const ServicesShowcase = dynamic(
  () =>
    import("@/components/home/ServicesShowcase").then(
      (m) => m.ServicesShowcase,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-surface rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    ),
  },
);
const FeaturedChips = dynamic(
  () => import("@/components/home/FeaturedChips").then((m) => m.FeaturedChips),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-surface-2 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    ),
  },
);
const Technology = dynamic(
  () => import("@/components/home/Technology").then((m) => m.Technology),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-48 bg-surface rounded-xl animate-pulse" />
        </div>
      </div>
    ),
  },
);
const WhyServchip = dynamic(
  () => import("@/components/home/WhyServchip").then((m) => m.WhyServchip),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-surface-2 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    ),
  },
);
const ComparisonPreview = dynamic(
  () =>
    import("@/components/home/ComparisonPreview").then(
      (m) => m.ComparisonPreview,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-64 bg-surface rounded-xl animate-pulse" />
        </div>
      </div>
    ),
  },
);
const HowItWorks = dynamic(
  () => import("@/components/home/HowItWorks").then((m) => m.HowItWorks),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-surface-2 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    ),
  },
);
const SuccessStories = dynamic(
  () =>
    import("@/components/home/SuccessStories").then((m) => m.SuccessStories),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-surface rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    ),
  },
);
const FAQAccordion = dynamic(
  () => import("@/components/home/FAQAccordion").then((m) => m.FAQAccordion),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-14 bg-surface-2 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    ),
  },
);
const LatestInsights = dynamic(
  () =>
    import("@/components/home/LatestInsights").then((m) => m.LatestInsights),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-surface rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    ),
  },
);
const FinalCTA = dynamic(
  () => import("@/components/home/FinalCTA").then((m) => m.FinalCTA),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 bg-bg-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="h-10 w-64 bg-surface-2 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-96 bg-surface-2 rounded mx-auto animate-pulse" />
        </div>
      </div>
    ),
  },
);

export function HomeSections() {
  return (
    <>
      <Hero3D />
      <TrustBar />
      <BrandSpotlight />
      <StatsCounter />
      <ClientLogos />
      <CategoriesGrid />
      <WorkloadSolutions />
      <ServicesShowcase />
      <FeaturedChips />
      <Technology />
      <WhyServchip />
      <ComparisonPreview />
      <HowItWorks />
      <SuccessStories />
      <FAQAccordion />
      <LatestInsights />
      <FinalCTA />
    </>
  );
}
