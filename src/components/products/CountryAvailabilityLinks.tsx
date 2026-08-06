import Link from "next/link";
import { COUNTRIES } from "@/data/countries";

export function CountryAvailabilityLinks({
  productName,
  className,
  limit = 6,
}: {
  productName: string;
  className?: string;
  limit?: number;
}) {
  const countries = COUNTRIES.slice(0, limit);
  return (
    <div className={`border-t border-border/60 pt-5 ${className ?? ""}`}>
      <p className="text-sm font-semibold text-text mb-3">
        {productName} — available in
      </p>
      <ul className="flex flex-wrap gap-2">
        {countries.map((country) => (
          <li key={country.slug}>
            <Link
              href={`/countries/${country.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span className="text-sm leading-none">{country.flag}</span>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
