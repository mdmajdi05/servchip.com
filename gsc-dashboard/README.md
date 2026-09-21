# Servchip — GSC Dashboard (standalone Next.js + Tailwind mini-app)

Google Search Console ke index coverage ka checker + results **dashboard page**.
Ye **bilkul alag folder** hai — `frontend/` ki site ke `src/`/`scripts`/`package.json`
ko touch nahi karta. Main site ki tarah hi **Next.js 16 + Tailwind v4** par bana hai,
lekin apna alag project hai (apna `package.json`, apna server, apna port 3200).

```
gsc-dashboard/                  # iska apna Next.js project
├─ app/                        # dashboard page (Tailwind UI)
│  ├─ page.tsx                 # ledger.json ko server-side padhta hai
│  └─ dashboard-client.tsx     # search/filter/expandable history UI
├─ dashboard-types.ts          # ledger data types
├─ gsc-api.mjs                 # Google API client (zero deps)
├─ report.mjs                  # checker → ledger.json + SEARCH-CONSOLE-LEDGER.md
├─ notify.mjs                  # sitemap re-submit (= re-crawl signal)
├─ package.json · next.config.ts · postcss.config.mjs · tsconfig.json
└─ ledger.json                 # har run ka history (git-ignored, auto-generated)
```

## Pehli baar (setup)

```
cd gsc-dashboard
npm install
node report.mjs --probe-only     # live-site health check (bina credentials)
npm run dev                      # → http://localhost:3200
```

Dashboard page kholo → har sitemap URL ka http status, robots, self-canonical,
hreflang count aur (credentials ke saath) Google ka per-URL index status dikhega.

## Google ka per-URL index status (ek baar ka setup, ~10 min)

1. **Google Cloud Console** → apna project → **APIs & Services → Library** →
   **"Search Console API"** enable karo.
2. **IAM & Admin → Service Accounts → Create service account** → key JSON download.
3. **Search Console** → property (servchip.com) ke
   **Settings → Users and permissions → Add user** → service account ka email +
   permission **Full** (ya Owner).
4. **`gsc-dashboard/.env`** banao (git-se-ignore):
   ```
   GSC_SITE_URL=sc-domain:servchip.com
   GSC_SERVICE_ACCOUNT_JSON={"type":"service_account",...}   # poora JSON ek line mein
   ```
   (alternatively `GSC_SERVICE_ACCOUNT_FILE=C:/path/to/key.json`)
5. `node report.mjs` — ab coverage reasons bhi aayenge
   (Crawled-not-indexed, Duplicate, Page not found…) + Search Analytics data.

## Commands (gsc-dashboard/ folder se)

| command | kaam |
|---|---|
| `npm run dev` / `npm run build && npm start` | dashboard page → port 3200 |
| `node report.mjs` | probe + GSC (default 400 URLs, paced 250ms) |
| `node report.mjs --probe-only` | sirf live-site check (koi creds nahi chahiye) |
| `node report.mjs --full` / `--limit 150` / `--strict` | inspect options |
| `node notify.mjs` | sitemap re-submit → Google re-crawl |

## Har fix ke baad ka loop

```
1. report.mjs          → dekho kaunse URLs issues mein hain (dashboard par bhi)
2. code fix            → main site mein tests + build
3. deploy              → production par update
4. notify.mjs          → sitemap re-submit (re-crawl signal)
5. 2-4 din baad report.mjs → history batati hai: NOT_INDEXED → indexed hua ya nahi
```

## Playbook — coverage states

| coverage state | matlab | action |
|---|---|---|
| `INDEXED_ALLOWED` | index hone layak | kuch nahi; wait |
| `CRAWLED-CURRENTLY-NOT-INDEXED` | crawl ho chuka, index nahi hua | content unique + internal links + hreflang sahi? wait |
| `DISCOVERED-CURRENTLY-NOT-INDEXED` | pata hai, crawl nahi hua | `notify.mjs`, internal links add |
| `DUPLICATE-*` | canonical conflict | self-canonical + hreflang check (globally fixed; new pages verify) |
| `PAGE_NOT_FOUND` | real 404 | sitemap se hataya hai to thik; nahi to route fix |
| 200 + no canonical (soft-404) | ghost page | `notFound()` gate pattern (jaise `[country]/layout.tsx`) |

## Safety

- `gsc-dashboard` main app ke `tsconfig` (`"exclude": ["gsc-dashboard"]`) aur
  `eslint` (`globalIgnores`) se **bahar** hai — main site ka build/lint kabhi
  isse nahi chhootega.
- Dashboard `localhost:3200` par chalta hai, public nahi — site ke sitemap/
  robots mein iska koi hissa nahi hota.
- Credentials sirf `.env` mein (`.env*` root ke `.gitignore` mein hai).