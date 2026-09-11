"use client";

import dynamic from "next/dynamic";
import type { Country, CountryMarket } from "@/types";
import { Hero3D } from "./Hero3D";
import { SeoIntroBlock } from "./SeoIntroBlock";
import { AboutServchip } from "./AboutServchip";
import { IndustrySolutions } from "./IndustrySolutions";
import { RegionalDistribution } from "./RegionalDistribution";
import { ChipBuyingGuide } from "./ChipBuyingGuide";
import { LazySection } from "@/components/ui/LazySection";
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
const BrandSpotlightDeferred = dynamic(
  () =>
    import("@/components/home/BrandSpotlight").then((m) => m.BrandSpotlight),
  {
    ssr: false,
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
const CategoriesGridDeferred = dynamic(
  () =>
    import("@/components/home/CategoriesGrid").then((m) => m.CategoriesGrid),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  },
);
const WorkloadSolutionsDeferred = dynamic(
  () =>
    import("@/components/home/WorkloadSolutions").then(
      (m) => m.WorkloadSolutions,
    ),
  {
    ssr: false,
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
const FeaturedChipsDeferred = dynamic(
  () => import("@/components/home/FeaturedChips").then((m) => m.FeaturedChips),
  {
    ssr: false,
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
const CountryMarketStrip = dynamic(
  () =>
    import("@/components/home/CountryMarketStrip").then(
      (m) => m.CountryMarketStrip,
    ),
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

export function HomeSections({
  country,
  market,
}: {
  country?: Country;
  market?: CountryMarket;
}) {
  return (
    <>
      <Hero3D country={country} market={market} />
      <AboutServchip />
      <TrustBar />
      <SeoIntroBlock />
      {country && market && (
        <CountryMarketStrip country={country} market={market} />
      )}
      <LazySection minHeight={720}>
        <BrandSpotlightDeferred />
      </LazySection>
      <StatsCounter />
      <ClientLogos />
      <LazySection minHeight={620}>
        <CategoriesGridDeferred />
      </LazySection>
      <IndustrySolutions />
      <RegionalDistribution />
      <LazySection minHeight={680}>
        <WorkloadSolutionsDeferred />
      </LazySection>
      <ConfiguratorPromo />
      <ServicesShowcase />
      <ChipBuyingGuide />
      <LazySection minHeight={640}>
        <FeaturedChipsDeferred />
      </LazySection>
      <Technology />
      <WhyServchip />
      <ComparisonPreview />
      <HowItWorks />
      <SuccessStories />
      <FAQAccordion faqs={country?.faqs} countryName={country?.name} />
      <LatestInsights />
      <LocationsStrip />
      <FinalCTA />
    </>
  );
}
