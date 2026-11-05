import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders a real country flag image (bundled under /public/flags).
 *
 * Uses actual flag graphics instead of emoji, so flags render identically on
 * every OS/browser - including Windows, where flag emoji are unsupported and
 * used to render as boxes or broken "?" marks.
 */
const FLAG_ASSETS: Record<string, string> = {
  uk: "/flags/gb.png",
  in: "/flags/in.svg",
};

interface CountryFlagProps {
  /** ISO 3166-1 alpha-2 code ("ae", "us", ...). "uk" is normalized to "gb". */
  code: string;
  className?: string;
  alt?: string;
}

export function CountryFlag({ code, className, alt = "" }: CountryFlagProps) {
  const iso = code?.toLowerCase();
  if (!iso) return null;
  const src = FLAG_ASSETS[iso] ?? `/flags/${iso}.png`;
  return (
    <span
      className={cn(
        "relative inline-block w-[22px] h-[15px] shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10 align-[-3px] bg-surface",
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes="32px" className="object-cover" />
    </span>
  );
}
