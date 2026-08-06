import type { BlogPost } from "@/blog/types";
import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCountryPrefix } from "@/lib/useCountryPrefix";

const CATEGORY_BADGE: Record<string, "green" | "cyan" | "purple" | "amber"> = {
  architecture: "purple",
  comparison: "cyan",
  deployment: "green",
  guides: "amber",
  "case-studies": "green",
};

export function BlogCard({ post }: { post: BlogPost }) {
  const prefix = useCountryPrefix();
  return (
    <Link href={`${prefix}/blog/${post.slug}`} className="group block h-full">
      <article className="h-full rounded-xl border border-border bg-surface p-6 transition-transform duration-300 group-hover:border-primary/25 group-hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_8%,transparent)] group-hover:-translate-y-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant={CATEGORY_BADGE[post.category.slug] || "default"}
            size="sm"
          >
            {post.category.name}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-text mb-3 leading-snug transition-transform duration-300 group-hover:text-primary line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center">
              <User className="w-4 h-4 text-text-dim" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-muted">
                {post.publishedAt}
              </span>
              <span className="text-xs text-text-dim flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-text-dim transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
}
