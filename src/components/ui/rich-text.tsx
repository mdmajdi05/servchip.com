import { Fragment, type ReactNode } from "react";
import { AppLink as Link } from "./AppLink";

const INLINE_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]*|\/[^)]*)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

function renderBold(segment: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = new RegExp(BOLD_RE.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;
  let k = 0;
  while ((match = re.exec(segment)) !== null) {
    if (match.index > last) {
      out.push(
        <Fragment key={`${keyPrefix}-t${k++}`}>
          {segment.slice(last, match.index)}
        </Fragment>,
      );
    }
    out.push(
      <strong key={`${keyPrefix}-b${k++}`} className="font-semibold text-text">
        {match[1]}
      </strong>,
    );
    last = re.lastIndex;
  }
  if (last < segment.length) {
    out.push(
      <Fragment key={`${keyPrefix}-t${k++}`}>{segment.slice(last)}</Fragment>,
    );
  }
  return out;
}

/**
 * Render `[label](/path)` links (locale-aware via AppLink) and `**bold**`
 * markers inside CMS-style strings. Plain strings pass through untouched.
 */
export function renderRichText(text: string): ReactNode {
  if (!text.includes("**") && (!text.includes("[") || !text.includes("]("))) {
    return text;
  }
  const out: ReactNode[] = [];
  const re = new RegExp(INLINE_LINK_RE.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;
  let k = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      out.push(...renderBold(text.slice(last, match.index), `pre${k}`));
    }
    out.push(
      <Link
        key={`link${k++}`}
        href={match[2]}
        className="text-primary hover:text-primary-dark underline underline-offset-4 transition-colors"
      >
        {match[1]}
      </Link>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) {
    out.push(...renderBold(text.slice(last), "post"));
  }
  return <>{out}</>;
}
