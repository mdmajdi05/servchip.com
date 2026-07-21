# DOs and DON'Ts — Universal Project Checklist

> Har project ke root mein copy karo aur project type ke hisaab se relevant sections follow karo.

---

## 1. SEO

| #   | DO                                                                                                                 | DON'T                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| 1   | Root layout / `_app` / `_document` mein **Google Site Verification** meta tag daalo                                | Har page mein alag se mat daalo — ek hi jagah kaafi hai            |
| 2   | **Google Analytics (gtag)** root layout mein daalo + `GAClient` component har route change par pageview track kare | Sirf gtag script daal ke mat chhodo — SPA navigation miss hota hai |
| 3   | Har page ka **unique title** + **meta description** do (`Metadata` export in Next.js)                              | Sab pages par same title/description mat rakho                     |
| 4   | **Canonical URL** har page par set karo                                                                            | Duplicate content mat chhodo — canonical zaroori hai               |
| 5   | **Open Graph** (`og:title`, `og:description`, `og:image`) + **Twitter Cards** daalo                                | Social share pe broken preview mat chhodo                          |
| 6   | **structured data** (JSON-LD) daalo — `Product`, `BreadcrumbList`, `Organization`, `LocalBusiness`                 | Structured data ke bina Google rich results nahi dikhayega         |
| 7   | `robots.ts` / `robots.txt` banake `sitemap.xml` ka link do                                                         | Sitemap ke bina pages index time more hota hai                     |
| 8   | **Semantic HTML** use karo — `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`                   | Pure `<div>` se page mat banao                                     |
| 9   | Images ke liye hamesha `alt` text do                                                                               | Accessible aur SEO dono ke liye `alt` zaroori hai                  |
| 10  | **Heading hierarchy** sahi rakho — single `<h1>`, phir `<h2>`, `<h3>`                                              | Multiple `<h1>` ya skip headings mat karo                          |

---

## 2. Performance

| #   | DO                                                                                      | DON'T                                                                         |
| --- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | **Dynamic imports** karo (`next/dynamic`) heavy components ke liye                      | Sab kuch eagerly import mat karo — bundle size bht hota hai                   |
| 2   | **Loading skeletons** (`loading.tsx`) daalo har route ke liye                           | Bina loading state ke user ko blank screen mat dikhao                         |
| 3   | `initial={false}` use karo framer-motion me — content pehle dikho, baad me animate karo | Entrance animation ka wait mat karwao — user pehle content dekhe              |
| 4   | Images ko **WebP/AVIF** me convert karo, `next/image` use karo                          | RAW PNGs / JPEGs seedha serve mat karo                                        |
| 5   | **Font subsetting** karo, `display: swap` use karo                                      | Pura font family load mat karo — sirf needed glyphs rakho                     |
| 6   | **Bundle analyzer** chalao kabhi kabhi — large dependencies check karo                  | 500KB+ library sirf ek feature ke liye mat daalo                              |
| 7   | API calls ko **server component** me karo, client me nahi                               | Client-side waterfall API calls mat banao                                     |
| 8   | Debounce / throttle karo search, resize, scroll events                                  | Har keystroke / scroll par API mat chhodo                                     |
| 9   | CSS **animations prefer karo** JS animations par (`transform`, `opacity`)               | `width`, `height`, `top`, `left` animate mat karo — layout thrashing hota hai |
| 10  | **Tree-shakeable** imports use karo — `import { Button } from "@/components/ui"`        | Pura library import mat karo — `import * from "lucide-react"` nahi            |

---

## 3. Code Quality & Architecture

| #   | DO                                                                                                 | DON'T                                                            |
| --- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | Types / Interfaces banake rakho — `AnyProduct`, `ChipProduct`, etc.                                | `any` type use mat karo — type safety foreach                    |
| 2   | Type guards use karo (`isChipProduct`, `isServerProduct`)                                          | Runtime par type check ke liye `in` operator direct mat use karo |
| 3   | **Server & Client** components ka separation rakho — server me data fetch, client me interactivity | Server component me `useEffect`, `useState` mat daalo            |
| 4   | **Environment variables** `.env.local` me rakho, `.env.example` banao                              | Secrets ko code me hardcode mat karo                             |
| 5   | Git hooks (husky + lint-staged) daalo — auto format + lint on commit                               | Dirty code push mat karo                                         |
| 6   | **Feature branch** banao, `main` par direct commit mat karo (unless solo project)                  | Bina review ke production par push mat karo                      |
| 7   | Error boundaries daalo — `error.tsx` + `global-error.tsx`                                          | Unhandled errors se blank page / crash mat aane do               |
| 8   | `console.log` production build me remove karo                                                      | Debug logs production me mat chhodo                              |
| 9   | Component files ko **atomic design** me rakho — `ui/`, `layout/`, `shared/`, `products/`           | Saare components ek folder me mat daalo                          |
| 10  | Constants ko central file me rakho — `SITE.url`, `SITE.name`                                       | Hardcoded strings har jagah mat chhido                           |

---

## 4. React / Next.js Best Practices

| #   | DO                                                                         | DON'T                                                               |
| --- | -------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1   | `"use client"` sirf tab lagao jab browser APIs / hooks chahiye             | Har component ko client component mat banao                         |
| 2   | **Server Actions** use karo for form submissions (App Router)              | API route har form ke liye mat banao                                |
| 3   | `generateMetadata()` use karo dynamic SEO ke liye                          | `useEffect` me document.title set mat karo                          |
| 4   | `Link` component use karo navigation ke liye                               | `<a>` ya `window.location` mat use karo internal links ke liye      |
| 5   | `next/image` use karo — automatic optimization + lazy loading              | `<img>` seedha use mat karo                                         |
| 6   | `next/font` use karo — font optimization built-in hai                      | Google Fonts ko `<link>` se manually mat daalo                      |
| 7   | `useMemo` / `useCallback` sirf tab lagao jab profiled performance issue ho | Har function ko memoize mat karo — unnecessary complexity           |
| 8   | **Props drilling** se bacho — Context / Provider use karo                  | 5+ level deep props pass mat karo                                   |
| 9   | `Suspense` boundary daalo jahan `useSearchParams()` use ho                 | `useSearchParams()` bina Suspense ke static generation tod deta hai |
| 10  | Route groups `(marketing)`, `(dashboard)` use karo for layout isolation    | Ek hi layout sabke liye mat lagao                                   |

---

## 5. CSS / Styling

| #   | DO                                                                       | DON'T                                                        |
| --- | ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| 1   | Tailwind utility classes prefer karo custom CSS par                      | Har component ke liye alag `.css` file mat banao             |
| 2   | CSS variables use karo theming ke liye — `--color-primary`, `--color-bg` | Hardcoded colors har jagah mat chhido                        |
| 3   | `gap`, `flex`, `grid` use karo layout ke liye                            | `margin-top` / negative margins se spacing mat karo          |
| 4   | Responsive design — mobile-first approach                                | Desktop pehle banao, phir mobile adjust mat karo             |
| 5   | `@media (prefers-reduced-motion)` ka respect karo                        | Sab users ko animations force mat karo                       |
| 6   | `z-index` ko centralized rakho (e.g. modal: 50, tooltip: 40)             | Random `z-index: 999999` har jagah mat daalo                 |
| 7   | Dark mode support daalo — Tailwind `dark:` class                         | Light mode only mat rakho — dark mode aaj kal expected hai   |
| 8   | `:focus-visible` styles daalo keyboard navigation ke liye                | Sirf `:focus` mat lagao — mouse users ko bhi outline dikhega |

---

## 6. Accessibility (a11y)

| #   | DO                                                     | DON'T                                                           |
| --- | ------------------------------------------------------ | --------------------------------------------------------------- |
| 1   | **Keyboard navigation** test karo — Tab, Enter, Escape | Mouse ke bina site usable nahi hai to mat publish karo          |
| 2   | **ARIA labels** daalo jahan semantic HTML kaafi nahi   | Over-ARIA mat karo — `role="button"` on `<button>` is redundant |
| 3   | Color contrast — text/bg至少有 4.5:1 (AA)              | Light grey text on white background mat daalo                   |
| 4   | Form inputs ke saath `<label>` ya `aria-label` zaroori | Placeholder ko label ki tarah use mat karo                      |
| 5   | Focus trap in modals / drawers                         | Tab karte hi focus background par nahi jaana chahiye            |
| 6   | Skip to content link daalo                             | Har page par "Skip to main content" link hota hai               |
| 7   | `aria-live` for dynamic content updates                | Screen readers ko pata nahi chalega content change hua          |

---

## 7. Security

| #   | DO                                                   | DON'T                                                     |
| --- | ---------------------------------------------------- | --------------------------------------------------------- |
| 1   | API routes me **input validation** karo (zod / yup)  | User input ko bina validate kiye trust mat karo           |
| 2   | **Rate limiting** daalo API routes / forms par       | Unlimited form submissions se spam / abuse aayega         |
| 3   | Secrets in `.env.local` — do NOT commit `.env` files | `.env` file ko git me kabhi mat daalo                     |
| 4   | **CORS** properly configure karo                     | `Access-Control-Allow-Origin: *` in production mat daalo  |
| 5   | `dangerouslySetInnerHTML` avoid karo                 | User content ko `dangerouslySetInnerHTML` me mat daalo    |
| 6   | CSP (Content Security Policy) headers set karo       | Inline scripts ke liye CSP exception properly manage karo |

---

## 8. Deployment & CI/CD

| #   | DO                                                     | DON'T                                                     |
| --- | ------------------------------------------------------ | --------------------------------------------------------- |
| 1   | Build locally test karo `next build` / `npm run build` | Deploy karke broken build dekho — pehle local verify karo |
| 2   | Lint + TypeScript check CI me daalo                    | Red / yellow warnings ke saath deploy mat karo            |
| 3   | Lighthouse score check karo — 90+ target               | Performance / SEO low hai to deploy mat karo              |
| 4   | Production build ka size monitor karo                  | 500KB+ JS bundle unexpected nahi hona chahiye             |
| 5   | `.env` vars CI/CD me set karo                          | Missing env vars se build fail hoga                       |

---

## 9. Git & Version Control

> Is project mein **feature branches nahi** — sab kuch `main` branch par direct commit hota hai.

| #   | DO                                                                      | DON'T                                             |
| --- | ----------------------------------------------------------------------- | ------------------------------------------------- |
| 1   | Small, atomic commits karo — ek commit = ek logical change              | Ek commit me 20 files change mat karo             |
| 2   | Descriptive commit messages — "feat: add login", "fix: broken nav link" | Vague messages "fixed stuff", "changes" mat likho |
| 3   | `.gitignore` properly set karo — `node_modules/`, `.next/`, `.env`      | Build artifacts / node_modules commit mat karo    |
| 4   | Commit se pehle `git status` + `git diff` dekh lo                       | `git add .` blindly mat karo                      |
| 5   | Husky / lint-staged hai to `next build` local me test karo pehle        | Broken code `main` par push mat karo              |

---

## Quick Pre-Deploy Checklist

- [ ] `next build` passes (no TS errors, no warnings)
- [ ] Lighthouse — Performance ≥ 90, SEO ≥ 90, Accessibility ≥ 85
- [ ] All routes render correctly (no 404 / 500)
- [ ] Google Analytics tracking working (all pages)
- [ ] Meta tags / OG image present on all pages
- [ ] Mobile responsive — test on 375px, 768px, 1440px
- [ ] No `console.log` in production
- [ ] No hardcoded secrets / API keys
- [ ] Images optimized (WebP, responsive sizes)
- [ ] Sitemap submitted to Google Search Console
