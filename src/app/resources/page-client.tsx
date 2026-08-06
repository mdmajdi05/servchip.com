"use client";
import { AppLink as Link } from "@/components/ui/AppLink";
import {
  ArrowRight,
  FileText,
  Book,
  Award,
  FileJson,
  Calendar,
  HelpCircle,
  ChevronRight,
  Clock,
  Mail,
  ExternalLink,
  Sparkles,
  Headphones,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/blog";
const RESOURCE_CATEGORIES = [
  {
    icon: FileText,
    title: "Blog & Insights",
    description:
      "Latest articles and analysis on AI computing, GPU architectures, multi-vendor chip strategies, and industry trends from our engineering team.",
    href: "/blog",
    count: "6+ articles",
    color: "green" as const,
  },
  {
    icon: Book,
    title: "Technical Guides",
    description:
      "Step-by-step deployment guides, configuration playbooks, and best practices for NVIDIA, AMD, and Intel chip platforms across AI, HPC, and enterprise workloads.",
    href: "/blog?category=guides",
    count: "2+ guides",
    color: "cyan" as const,
  },
  {
    icon: Award,
    title: "Case Studies",
    description:
      "Real-world deployment stories from leading Indian enterprises and research institutions - detailing architectures, challenges, and measurable outcomes.",
    href: "/blog?category=case-studies",
    count: "1+ studies",
    color: "purple" as const,
  },
  {
    icon: FileJson,
    title: "Whitepapers",
    description:
      "In-depth technical whitepapers covering NVIDIA, AMD, and Intel server architectures, AI infrastructure design patterns, HPC cluster architectures, and emerging semiconductor computing paradigms.",
    href: "/blog",
    count: "Coming soon",
    color: "amber" as const,
  },
  {
    icon: Calendar,
    title: "Webinars & Events",
    description:
      "Recorded sessions, product deep dives, and live Q&As with multi-vendor certified engineers covering the latest in GPU server computing, semiconductor technology, and AI infrastructure.",
    href: "/blog",
    count: "Coming soon",
    color: "green" as const,
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description:
      "Answers to commonly asked questions about chip specifications, compatibility, procurement processes, warranty policies, and technical support.",
    href: "/faq",
    count: "12+ answers",
    color: "cyan" as const,
  },
];
const featuredPosts = BLOG_POSTS.slice(0, 3);
function getCategoryBadgeColor(
  category: string,
): "green" | "cyan" | "purple" | "amber" | "default" {
  const map: Record<string, "green" | "cyan" | "purple" | "amber"> = {
    architecture: "purple",
    comparison: "amber",
    deployment: "cyan",
    guides: "green",
    "case-studies": "purple",
  };
  return map[category] || "default";
}
function getCategoryName(cat: unknown): string {
  if (typeof cat === "string") return cat;
  if (cat && typeof cat === "object") {
    const c = cat as { slug?: string; name?: string };
    return c.slug || c.name || "";
  }
  return "";
}
export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Resources"
        title="Knowledge Base for AI & HPC Computing"
        subtitle="Explore our growing library of technical guides, case studies, whitepapers, and expert insights - all created by multi-vendor certified engineers to help you make informed semiconductor and data center infrastructure decisions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
      />
      {/* Featured Resources */}
      {featuredPosts.length > 0 && (
        <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <SectionHeading
              label="Featured"
              title="Latest Resources"
              subtitle="Curated content from our engineering team - technical deep dives, architecture comparisons, and deployment best practices."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {featuredPosts.map((post) => {
                const catName = getCategoryName(post.category);
                const readTime =
                  "readingTime" in post
                    ? (post as { readingTime: number }).readingTime
                    : 5;
                return (
                  <div
                    key={post.id}
                    className="group relative rounded-2xl border border-border bg-bg-dark p-6 md:p-7 card-hover overflow-hidden flex flex-col"
                  >
                    <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-transform pointer-events-none" />
                    <div className="relative flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge size="sm">{catName}</Badge>
                        <span className="flex items-center gap-1 text-[10px] text-text-dim font-mono">
                          <Clock className="w-3 h-3" />
                          {readTime} min
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-text mb-2.5 leading-snug group-hover:text-primary transition-transform">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 mt-auto border-t border-border">
                        <span className="text-[10px] text-text-dim font-mono">
                          {post.publishedAt}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          aria-label={`Read full article: ${post.title}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary group/link"
                        >
                          Read Article
                          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary/10"
                >
                  View All Articles <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/developer-hub">
                <Button variant="solid" className="font-semibold">
                  Visit Developer Hub <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* Resource Categories */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-circuit opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Categories"
            title="Browse by Topic"
            subtitle="Six resource categories designed to help you find exactly what you need - from quick guides to deep technical references."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {RESOURCE_CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="group relative rounded-2xl border border-border bg-surface p-6 md:p-7 card-hover overflow-hidden flex flex-col"
              >
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-transform pointer-events-none" />
                <div className="relative flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-transform shrink-0">
                      <cat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge size="sm">{cat.count}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2.5 group-hover:text-primary transition-transform">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
                    {cat.description}
                  </p>
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group/link mt-auto pt-3 border-t border-border"
                  >
                    <span>Explore {cat.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter CTA */}
      <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-widest font-bold">
                    Stay Updated
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-text mb-2 leading-tight">
                  Get the Latest Insights
                </h2>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  Subscribe to our newsletter and receive the latest technical
                  guides, architecture comparisons, and semiconductor industry
                  analysis from our multi-vendor certified engineering team -
                  delivered straight to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
                <div className="flex-1 sm:flex-none">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address for newsletter"
                    className="w-full sm:w-64 px-4 py-3 rounded-lg bg-bg-dark border border-border text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-transform"
                  />
                </div>
                <Button
                  variant="solid"
                  size="lg"
                  className="font-semibold shadow-lg shadow-primary/20 shrink-0"
                >
                  Subscribe <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Links */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Can't Find What You Need?"
            subtitle="Our team is ready to help with personalized assistance and expert guidance."
            align="center"
          />
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 card-hover group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-transform shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text">
                    Contact Us
                  </div>
                  <div className="text-[10px] text-text-muted truncate">
                    Get in touch with our team
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-dim shrink-0" />
              </Link>
              <Link
                href="/faq"
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 card-hover group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-transform shrink-0">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text">FAQ</div>
                  <div className="text-[10px] text-text-muted truncate">
                    Common questions answered
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-dim shrink-0" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 card-hover group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-transform shrink-0">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text">Support</div>
                  <div className="text-[10px] text-text-muted truncate">
                    Technical assistance
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-dim shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
