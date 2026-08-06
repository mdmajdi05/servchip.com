"use client";

import type { BlogSection, ContentBlock } from "@/blog/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { BlogTable, BlogCodeBlock, BlogCallout, BlogLinkList } from "./blocks";

const GpuCalculator = dynamic(
  () =>
    import("./blocks/GpuCalculator").then((m) => ({
      default: m.GpuCalculator,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.02] to-transparent p-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-primary/10 rounded" />
          <div className="h-10 w-full bg-primary/5 rounded" />
          <div className="h-20 w-full bg-primary/5 rounded" />
        </div>
      </div>
    ),
  },
);

const INLINE_LINK_RE = /\[([^\]]+)\]\((\/[^)]*)\)/g;

function renderRichText(text: string) {
  if (!text.includes("[") || !text.includes("](")) return text;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  const re = new RegExp(INLINE_LINK_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const anchor = match[1];
    const href = match[2];
    parts.push(
      <Link
        key={key++}
        href={href}
        className="text-primary hover:text-primary-dark underline underline-offset-4 transition-colors"
      >
        {anchor}
      </Link>,
    );
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

function toAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="text-text-muted leading-relaxed mb-4">
          {renderRichText(block.text)}
        </p>
      );
    case "heading":
      return block.level === 3 ? (
        <h3 key={idx} className="text-base font-semibold text-text mb-3 mt-6">
          {block.text}
        </h3>
      ) : (
        <h2
          key={idx}
          className="text-xl lg:text-2xl font-bold text-text mb-4 mt-8"
        >
          {block.text}
        </h2>
      );
    case "bulletList":
      return (
        <ul key={idx} className="space-y-2 my-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-text-muted">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{renderRichText(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "numberedList":
      return (
        <ol key={idx} className="space-y-2 my-4 list-decimal list-inside">
          {block.items.map((item, i) => (
            <li key={i} className="text-text-muted">
              {renderRichText(item)}
            </li>
          ))}
        </ol>
      );
    case "table":
      return <BlogTable key={idx} headers={block.headers} rows={block.rows} />;
    case "code":
      return (
        <BlogCodeBlock key={idx} language={block.language} code={block.code} />
      );
    case "image":
      return (
        <figure key={idx} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-xl border border-border"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="text-xs text-text-dim text-center mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <BlogCallout key={idx} variant={block.variant} text={block.text} />
      );
    case "faq":
      return (
        <div key={idx} className="space-y-6 my-6">
          {block.items.map((item, i) => (
            <div key={i}>
              <h3 className="text-base font-semibold text-text mb-2">
                {item.question}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {renderRichText(item.answer)}
              </p>
            </div>
          ))}
        </div>
      );
    case "linkList":
      return <BlogLinkList key={idx} title={block.title} links={block.links} />;
    case "html":
      return (
        <div
          key={idx}
          className="my-6"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "calculator":
      return <GpuCalculator key={idx} />;
    default:
      return null;
  }
}

export function PostContent({ sections }: { sections: BlogSection[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-10">
      {sections.map((section, idx) => (
        <div key={idx} id={toAnchor(section.heading)}>
          <h2 className="text-xl lg:text-2xl font-bold text-text mb-4">
            {section.heading}
          </h2>

          {section.content ? (
            <div>{section.content.map(renderBlock)}</div>
          ) : section.heading.toLowerCase().includes("frequently asked") ? (
            (section.paragraphs || []).map((p, i) => {
              const sep = p.indexOf("? ");
              const question = sep !== -1 ? p.substring(0, sep + 1) : "";
              const answer = sep !== -1 ? p.substring(sep + 2) : p;
              return (
                <div key={i} className="mb-6 last:mb-0">
                  <h3 className="text-base font-semibold text-text mb-2">
                    {renderRichText(question)}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {renderRichText(answer)}
                  </p>
                </div>
              );
            })
          ) : (
            (section.paragraphs || []).map((p, i) => (
              <p key={i} className="text-text-muted leading-relaxed mb-4">
                {renderRichText(p)}
              </p>
            ))
          )}

          {!section.content && section.bullets && (
            <ul className="space-y-2 mt-4">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-text-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{renderRichText(b)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 md:p-8">
        <h2 className="text-base font-bold text-text mb-3">
          Servchip global availability
        </h2>
        <p className="text-sm text-text-muted leading-relaxed mb-4">
          Enterprise NVIDIA, AMD and Intel hardware is available through
          Servchip across these regions. Browse local availability, delivery
          details and region-specific sourcing:
        </p>
        <ul className="flex flex-wrap gap-2">
          {COUNTRIES.map((country) => (
            <li key={country.slug}>
              <Link
                href={`/countries/${country.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-body px-3 py-1.5 text-xs text-text-muted hover:border-primary/40 hover:text-primary transition-colors"
              >
                <span className="text-sm leading-none">{country.flag}</span>
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
