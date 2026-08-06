"use client";

import { useParams } from "next/navigation";
import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Tag,
  User,
  ArrowRight,
  Package,
  Link as LinkIcon,
  Mail,
} from "lucide-react";
import type {
  ChipProduct,
  ServerProduct,
  NetworkingProduct,
  MemoryProduct,
  StorageProduct,
} from "@/types";
import { BLOG_POSTS, getRelatedBlogPosts } from "@/blog";
import { getProductById } from "@/data/products";
import { ReadingProgress } from "@/blog/components/ReadingProgress";
import { PostContent } from "@/blog/components/PostContent";

function getProductSpec(
  product:
    | ChipProduct
    | ServerProduct
    | NetworkingProduct
    | MemoryProduct
    | StorageProduct,
): string {
  if ("specifications" in product && product.specifications)
    return product.specifications.memory || "";
  if ("specs" in product && product.specs) return product.specs.type || "";
  return "";
}

const CATEGORY_BADGE: Record<string, "green" | "cyan" | "purple" | "amber"> = {
  architecture: "purple",
  comparison: "cyan",
  deployment: "green",
  guides: "amber",
  "case-studies": "green",
};

function toAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ShareBtn({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted ${color} transition-all duration-200 hover:scale-110`}
      title={label}
    >
      {icon}
    </a>
  );
}

function useShareUrl() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const timer = requestAnimationFrame(() => setUrl(window.location.href));
    return () => cancelAnimationFrame(timer);
  }, []);
  return url;
}

function LeftSidebar({ title }: { title: string }) {
  const shareUrl = useShareUrl();

  return (
    <aside className="hidden xl:flex flex-col items-center pt-2">
      <div
        data-sticky-sidebar
        className="sticky top-[140px] flex flex-col items-center gap-3"
      >
        <ShareBtn
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          }
          label="Twitter"
          color="hover:text-primary"
        />
        <ShareBtn
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          }
          label="LinkedIn"
          color="hover:text-[#0A66C2]"
        />
        <ShareBtn
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          }
          label="Facebook"
          color="hover:text-[#1877F2]"
        />
        <ShareBtn
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}`}
          icon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          }
          label="WhatsApp"
          color="hover:text-[#25D366]"
        />
        <button
          onClick={() => navigator.clipboard?.writeText(window.location.href)}
          className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all duration-200 hover:scale-110"
          title="Copy link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

function TOCSection({ sections }: { sections: { heading: string }[] }) {
  const [activeId, setActiveId] = useState("");
  const tocLinks = sections
    .filter((s) => !s.heading.toLowerCase().includes("frequently asked"))
    .map((s) => ({ id: toAnchor(s.heading), label: s.heading }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    for (const link of tocLinks) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [tocLinks]);

  if (tocLinks.length === 0) return null;

  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim mb-4">
        On this page
      </h4>
      <nav className="space-y-0.5 border-l border-border">
        {tocLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`group flex items-center gap-2.5 text-xs py-1.5 pl-3 -ml-px border-l-2 transition-all duration-200 ${
              activeId === link.id
                ? "border-primary text-primary font-medium"
                : "border-transparent text-text-muted hover:text-text hover:border-border"
            }`}
          >
            <span className="leading-snug">{link.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

function RightSidebar({
  sections,
  relatedPosts,
}: {
  sections: { heading: string }[];
  relatedPosts: {
    id: string;
    title: string;
    slug: string;
    readingTime: number;
    category?: { name: string; slug: string };
  }[];
}) {
  return (
    <aside className="hidden xl:block w-[260px] flex-shrink-0">
      <div
        data-sticky-sidebar
        className="sticky top-[140px] space-y-10 overflow-y-auto scrollbar-none"
      >
        <TOCSection sections={sections} />

        {relatedPosts.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim mb-4">
              Related Articles
            </h4>
            <div className="space-y-4">
              {relatedPosts.slice(0, 4).map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="block group"
                >
                  <p className="text-xs text-text-muted group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                    {rp.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-text-dim">
                      {rp.readingTime} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl bg-gradient-to-br from-primary/[0.08] to-transparent border border-primary/20 p-5">
          <h4 className="text-sm font-semibold text-text mb-1.5">
            Stay ahead in AI
          </h4>
          <p className="text-[11px] text-text-muted leading-relaxed mb-4">
            Get weekly chip market insights and buying guides.
          </p>
          <Link href={`/contact`}>
            <Button variant="solid" size="sm" className="w-full text-xs">
              <Mail className="w-3 h-3 mr-1.5" />
              Subscribe
            </Button>
          </Link>
        </div>

        <Link href={`/contact`} className="block group">
          <div className="rounded-xl border border-border bg-surface p-5 text-center hover:border-primary/30 transition-all duration-300">
            <p className="text-xs font-semibold text-text mb-1 group-hover:text-primary transition-colors">
              Need help choosing?
            </p>
            <p className="text-[10px] text-text-muted leading-relaxed">
              Free consultation with our engineers.
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const shareUrl = useShareUrl();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const relatedPosts = post ? getRelatedBlogPosts(post.id, 3) : [];
  const relatedProducts = post?.relatedProductIds
    ? post.relatedProductIds.map((id) => getProductById(id)).filter(Boolean)
    : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-center px-4">
          <div>
            <h1 className="text-6xl font-black text-primary mb-4">404</h1>
            <p className="text-text-muted text-lg mb-8">
              Article not found. The page you are looking for does not exist or
              has been moved.
            </p>
            <Link href={`/blog`}>
              <Button
                variant="outline"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <ReadingProgress />

      <div className="max-w-[1440px] mx-auto px-6 xl:px-10 pb-20">
        <div>
          <div>
            <Link
              href={`/blog`}
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-transform duration-200 mb-8 group pt-6"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>
          </div>

          <div className="flex gap-8 xl:gap-12 justify-center">
            <LeftSidebar title={post.title} />

            <main className="flex-1 min-w-0 max-w-3xl xl:max-w-[720px]">
              <div className="mb-6">
                <Badge
                  variant={CATEGORY_BADGE[post.category.slug] || "default"}
                  size="md"
                >
                  {post.category.name}
                </Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-text leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted pb-5 border-b border-border mb-5">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>{post.author.name}</span>
                </div>
                <span className="w-px h-4 bg-border/60" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>
                    {post.publishedAt} &middot; {post.readingTime} min read
                  </span>
                </div>
              </div>

              <div className="flex xl:hidden items-center gap-3 pb-6 mb-6 border-b border-border">
                <span className="text-xs text-text-muted font-medium">
                  Share:
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-[#0A66C2] transition-all"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <button
                  onClick={() =>
                    navigator.clipboard?.writeText(window.location.href)
                  }
                  className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <PostContent sections={post.sections || []} />
              </div>

              <div className="mt-10 pt-6 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  {post.tags.map((t) => (
                    <span
                      key={t.id}
                      className="px-3 py-1 text-xs font-medium text-text-muted bg-surface rounded-full border border-border"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-text-muted font-medium">
                    Share this article:
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-muted hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-muted hover:text-[#25D366] hover:border-[#25D366]/40 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    Copy Link
                  </button>
                </div>
              </div>

              {relatedProducts.length > 0 && (
                <div className="mt-16">
                  <SectionHeading
                    title="Related Products"
                    subtitle="Browse chips and systems mentioned in this article"
                    align="left"
                  />
                  <div className="grid md:grid-cols-3 gap-4 mt-8">
                    {relatedProducts.slice(0, 6).map((product) => (
                      <Link
                        key={product!.id}
                        href={`/products/${product!.slug}`}
                        className="group p-4 rounded-xl border border-border bg-surface hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-text text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                          {product!.name}
                        </h3>
                        <p className="text-text-muted text-xs line-clamp-2">
                          {getProductSpec(product!)}
                        </p>
                        <span className="text-xs text-primary font-medium mt-2 inline-block">
                          View Product →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <SectionHeading
                    title="Related Articles"
                    subtitle="Continue exploring our technical library"
                    align="left"
                  />
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`}>
                        <div className="group p-5 rounded-xl border border-border bg-surface hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                          <Badge
                            variant={
                              CATEGORY_BADGE[rp.category.slug] || "default"
                            }
                            size="sm"
                            className="mb-3"
                          >
                            {rp.category.name}
                          </Badge>
                          <h3 className="font-bold text-text text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                            {rp.title}
                          </h3>
                          <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                            {rp.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-text-muted mt-3">
                            <Clock className="w-3 h-3" />
                            <span>{rp.readingTime} min read</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-16 p-8 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent text-center">
                <h2 className="text-xl font-bold text-text mb-3">
                  Need Help Choosing the Right Chip?
                </h2>
                <p className="text-text-muted text-sm mb-6 max-w-lg mx-auto">
                  Our engineering team provides free technical consultations to
                  help you select and deploy the optimal solution for your
                  workload.
                </p>
                <Link href={`/contact`}>
                  <Button
                    variant="solid"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </main>

            <RightSidebar
              sections={post.sections || []}
              relatedPosts={relatedPosts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
