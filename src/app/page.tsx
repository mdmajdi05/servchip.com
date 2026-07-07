import { Hero3D } from "@/components/home/Hero3D";
import { TrustBar } from "@/components/home/TrustBar";
import { QuickLinks } from "@/components/home/QuickLinks";
import { StatsCounter } from "@/components/home/StatsCounter";
import { FeaturedChips } from "@/components/home/FeaturedChips";
import { Technology } from "@/components/home/Technology";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { WhyServchip } from "@/components/home/WhyServchip";
import { ComparisonPreview } from "@/components/home/ComparisonPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SuccessStories } from "@/components/home/SuccessStories";
import { LatestInsights } from "@/components/home/LatestInsights";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <TrustBar />
      <QuickLinks />
      <StatsCounter />
      <FeaturedChips />
      <Technology />
      <CategoriesGrid />
      <WhyServchip />
      <ComparisonPreview />
      <HowItWorks />
      <SuccessStories />
      <LatestInsights />
      <FinalCTA />
    </>
  );
}
