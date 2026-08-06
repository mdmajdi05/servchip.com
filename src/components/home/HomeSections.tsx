"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(
  () => import("@/components/home/Hero3D").then((m) => m.Hero3D),
  {
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
const TrustBar = dynamic(
  () => import("@/components/home/TrustBar").then((m) => m.TrustBar),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const BrandSpotlight = dynamic(
  () =>
    import("@/components/home/BrandSpotlight").then((m) => m.BrandSpotlight),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const StatsCounter = dynamic(
  () => import("@/components/home/StatsCounter").then((m) => m.StatsCounter),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const ClientLogos = dynamic(
  () => import("@/components/home/ClientLogos").then((m) => m.ClientLogos),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const CategoriesGrid = dynamic(
  () =>
    import("@/components/home/CategoriesGrid").then((m) => m.CategoriesGrid),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
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
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const ConfiguratorPromo = dynamic(
  () =>
    import("@/components/shared/ConfiguratorPromo").then(
      (m) => m.ConfiguratorPromo,
    ),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
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
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const FeaturedChips = dynamic(
  () => import("@/components/home/FeaturedChips").then((m) => m.FeaturedChips),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const Technology = dynamic(
  () => import("@/components/home/Technology").then((m) => m.Technology),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const WhyServchip = dynamic(
  () => import("@/components/home/WhyServchip").then((m) => m.WhyServchip),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
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
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const HowItWorks = dynamic(
  () => import("@/components/home/HowItWorks").then((m) => m.HowItWorks),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const SuccessStories = dynamic(
  () =>
    import("@/components/home/SuccessStories").then((m) => m.SuccessStories),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const FAQAccordion = dynamic(
  () => import("@/components/home/FAQAccordion").then((m) => m.FAQAccordion),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const LatestInsights = dynamic(
  () =>
    import("@/components/home/LatestInsights").then((m) => m.LatestInsights),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const FinalCTA = dynamic(
  () => import("@/components/home/FinalCTA").then((m) => m.FinalCTA),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const LocationsStrip = dynamic(
  () =>
    import("@/components/home/LocationsStrip").then((m) => m.LocationsStrip),
  {
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
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
      <ConfiguratorPromo />
      <ServicesShowcase />
      <FeaturedChips />
      <Technology />
      <WhyServchip />
      <ComparisonPreview />
      <HowItWorks />
      <SuccessStories />
      <FAQAccordion />
      <LatestInsights />
      <LocationsStrip />
      <FinalCTA />
    </>
  );
}
