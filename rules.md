# Servchip Frontend — Coding Rules & Conventions

> Follow these rules strictly. Every new file, edit, or PR must comply.

---

## 1. TypeScript — Zero Tolerance

- **`strict: true`** is enabled in `tsconfig.json`. Every file must compile cleanly.
- **Never use `as unknown as` casts** to bypass type errors. Use proper type guards instead.
- **Never use `any`**. If a type is complex, define an interface or use discriminated unions.
- All product types (`ChipProduct`, `ServerProduct`, etc.) live in `src/types/chip.ts`.
- **Reusable type guards** (`isChipProduct`, `isServerProduct`, etc.) live in `src/types/guards.ts`.
  - Always import from `@/types` (re-exported in `index.ts`), never directly from `@/types/guards`.
  - Never redefine type guards locally in component files — use the shared ones.

```tsx
// CORRECT
import { isChipProduct, isServerProduct } from "@/types";

// WRONG — never duplicate type guards
function isChip(p: AnyProduct): p is ChipProduct { ... }
```

---

## 2. Component Props — Always Future-Ready

- Every card/list item component **must** accept an optional `index?: number` prop.
  - This enables staggered animations, analytics tracking, and virtualization.
  - Use `_index` prefix if not consumed yet to suppress lint warnings.

```tsx
interface Props {
  chip: ChipProduct;
  index?: number; // Always include — future-ready
}
```

- Props interfaces must be **explicitly typed** — no inline object types in function params for complex objects.
- Prefer `interface` over `type` for component props.

---

## 3. Union Types — Proper Narrowing

When working with `AnyProduct` (or any union type), always narrow with type guards:

```tsx
// CORRECT — type-safe narrowing
if (isChipProduct(product)) {
  return <span>{product.specifications.memory}</span>;
}

// WRONG — unsafe casting
const p = product as unknown as Record<string, unknown>;
return <span>{String(p.specifications.memory)}</span>;
```

- Extract complex JSX into sub-components for each union branch (see `WorkloadSolutions.tsx` → `ProductChipSpecs`).
- Use `getProductTypeLabel()` from `@/types` to get a human-readable label.

---

## 4. Unused Variables & Imports

- **Never leave unused imports** in files. Remove them immediately.
- **Never destructure unused variables** from `.map()` callbacks:

```tsx
// CORRECT
{
  items.map((item) => <div key={item.id}>{item.name}</div>);
}

// WRONG — unused `index`
{
  items.map((item, index) => <div key={item.id}>{item.name}</div>);
}
```

- If an `index` is needed only for `key`, use `item.id` instead.
- Prefix intentionally unused params with `_` (e.g., `_index`).

---

## 5. File Structure & Organization

```
src/
  types/          # All TypeScript interfaces & type guards
    chip.ts       # Product types + AnyProduct union
    guards.ts     # Reusable type guard functions
    index.ts      # Central re-exports
  components/
    ui/           # Generic UI primitives (Button, Badge, Tilt3D, etc.)
    home/         # Homepage-specific components
    chips/        # Chip product components (ChipCard, ChipGrid, etc.)
    products/     # All product type cards + detail views
    layout/       # Header, Footer, navigation
  data/           # Static data + helpers (products, categories, etc.)
  app/            # Next.js App Router pages
```

- Component file naming: `PascalCase.tsx` (e.g., `ChipCard.tsx`).
- Utility/data file naming: `camelCase.ts` or `kebab-case.ts`.
- Each component file = one exported component (except small helpers).

---

## 6. Imports

- Use `@/` path alias for all internal imports (configured in `tsconfig.json`).
- Import order: React/Next → third-party → internal `@/` → relative.
- Always use `type` keyword for type-only imports:

```tsx
import type { ChipProduct, AnyProduct } from "@/types";
import { isChipProduct } from "@/types";
```

---

## 7. Images

- Use `next/image` `<Image />` component instead of `<img>` for optimized delivery.
- If external images are untrusted, use `unoptimized` prop or a custom loader.
- Always include `alt` text and `width`/`height` or `fill`.

---

## 8. Styling

- Use **Tailwind CSS** utility classes only — no inline styles (except dynamic values).
- Use `cn()` helper (if available) or template literals for conditional classes.
- Follow the design token system: `text-text`, `text-text-dim`, `text-text-muted`, `bg-surface`, `border-border`, `text-primary`.
- Responsive: mobile-first. Use `sm:`, `md:`, `lg:`, `xl:` breakpoints.

---

## 9. Animation

- Use **Framer Motion** for all animations.
- Staggered list animations: use `index * 0.05` delay pattern.
- AnimatePresence for enter/exit transitions.
- Always wrap motion components in `"use client"`.

---

## 10. Build & Deploy

- **Build must pass** (`npm run build`) with zero TypeScript errors before any push.
- **Lint must pass** (`npm run lint`) with zero errors (warnings are acceptable).
- Never commit `node_modules/`, `.next/`, or `.env` files.
- Netlify deploys on push to `main` — keep main branch production-ready.

---

## 11. Data Architecture

- All product data is static (in `src/data/products/`).
- Each product type has its own data file + index aggregator.
- `AnyProduct` union type covers all product variants.
- Type guards determine product type at runtime via property checks.

---

## 12. Quick Reference — Adding a New Product Type

1. Define interface in `src/types/chip.ts`
2. Add to `AnyProduct` union in `src/types/chip.ts`
3. Add type guard in `src/types/guards.ts` (e.g., `isNewProduct()`)
4. Export from `src/types/index.ts`
5. Create card component in `src/components/products/NewCard.tsx` (with `index?: number` prop)
6. Create detail component in `src/components/products/NewDetail.tsx`
7. Register in `ProductCard.tsx` routing
8. Register in `products/[slug]/page-client.tsx` routing
9. Register in `categories/[slug]/page-client.tsx` grouping
10. Add data file in `src/data/products/`
