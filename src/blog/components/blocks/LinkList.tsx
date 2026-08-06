"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogLinkList({
  title,
  links,
  external,
}: {
  title: string;
  links: { text: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div className="my-6 p-4 rounded-xl border border-border bg-surface/50">
      {title && (
        <h4 className="text-xs font-bold text-text-dim uppercase tracking-wider mb-3">
          {title}
        </h4>
      )}
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
                external
                  ? "text-primary hover:text-primary-dark"
                  : "text-primary hover:text-primary-dark",
              )}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.text}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
