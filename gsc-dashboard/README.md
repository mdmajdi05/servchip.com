# Servchip — GSC Dashboard (standalone Next.js + Tailwind mini-app)

Google Search Console ke index coverage ka checker + results **dashboard page**.
Ye **bilkul alag folder** hai — `frontend/` ki site ke `src/`/`scripts`/`package.json`
ko touch nahi karta. Main site ki tarah hi **Next.js 16 + Tailwind v4** par bana hai,
lekin apna alag project hai (apna `package.json`, apna server, apna port 3200).

```
gsc-dashboard/                  # iska apna Next.js project
├─ app/                        # dashboard page (Tailwind UI)
│  ├─ page.tsx                 # ledger.json ko server-side padhta hai
│  ├─ dashboard-client.tsx     # search/filter/expandable history UI
│  └─ api/fix/route.ts         # "Fix" button → opencode (Plan mode) launcher
├─ dashboard-types.ts          # ledger data types
├─ gsc-api.mjs                 # Google API client (zero deps, OAuth + service account)
├─ gsc-oauth-setup.mjs         # one-time OAuth setup (no Google Cloud billing) → .env
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

### Rasta A — OAuth (recommended, Google Cloud se payment method NAHI mangega)

1. **console.cloud.google.com** → apna (ya naya) project.
2. **APIs & Services → Library → "Search Console API" → Enable**
   (enable karne ke liye billing nahi chahiye).
3. **APIs & Services → OAuth consent screen** → External → app name + support
   email → Save. **Audience → Add users** mein apna Google email (jo Search
   Console ka owner hai) **Test user** ke roop mein add karo.
4. **APIs & Services → Credentials → Create credentials → OAuth client ID** →
   **Application type: Desktop app** → Create → **Client ID + Client Secret**
   copy karo (ye kahin save kar lo).
5. Ye chalao (Client ID/Secret ke saath):
   ```
   node gsc-dashboard/gsc-oauth-setup.mjs --client-id <CLIENT_ID> --client-secret <CLIENT_SECRET>
   ```
   → browser mein URL khulega → **GSC-owner account** se sign in → **Allow** →
   script refresh token `.env` mein store karke verify karega.
6. `node report.mjs` — ab coverage reasons bhi aayenge
   (Crawled-not-indexed, Duplicate, Page not found…) + Search Analytics data.

Note: agar consent screen **Testing** mode mein hai to refresh token **7 din** baad
ghat jaata hai — phir setup script dobara chalao. Lambi term ke liye consent
screen ko **Publish app** (production) par le jao; warning screen aayegi, par
apne liye fine hai aur token expiry nahi hogi.

### Rasta B — Service account (Google Cloud project chahiye)

1. **APIs & Services → Library → Search Console API** enable.
2. **IAM & Admin → Service Accounts → Create service account** → key JSON download.
3. **Search Console → property → Settings → Users & permissions → Add user** →
   service account ka email + permission **Full** (ya Owner).
4. `gsc-dashboard/.env` mein (git-se-ignore):
   ```
   GSC_SITE_URL=sc-domain:servchip.com
   GSC_SERVICE_ACCOUNT_FILE=C:/path/to/key.json
   ```
   (alternatively `GSC_SERVICE_ACCOUNT_JSON={"type":"service_account",...}` one line)
5. `node report.mjs` — ab coverage reasons bhi aayenge.

## Commands (gsc-dashboard/ folder se)

| command | kaam |
|---|---|
| `npm run dev` / `npm run build && npm start` | dashboard page → port 3200 |
| `node report.mjs` | probe + GSC (default 400 URLs, paced 250ms) |
| `node report.mjs --probe-only` | sirf live-site check (koi creds nahi chahiye) |
| `node report.mjs --full` / `--limit 150` / `--strict` | inspect options |
| `node notify.mjs` | sitemap re-submit → Google re-crawl |

## Fix button (+ opencode launcher)

Dashboard ke **Needs attention** table mein har problem row ke side mein **Fix**
button hai. Click karo to:

1. **PowerShell ki nayi window** khulti hai (sirf isi machine par — live site
   par kuch nahi hota).
2. Usme `frontend/` folder (main site) mein `opencode mini --agent plan --prompt
   "<issue brief>"` start hota hai — **Plan mode** se (plan agent project files
   edit nahi karta).
3. Agent issue analyse karke **plan** banata hai → aap approve karo
   (**Shift+Tab** se Build agent par jao aur "apply karo" bolo) → fix apply
   hota hai + `npm test`/`npm run typecheck` chalta hai.

Note:
- opencode console se call hota hai — uski **model/API key aapki opencode config**
  se aati hai (koi naya setup nahi).
- Launcher prompt ASCII mein build hota hai (PowerShell quoting ke liye).
- Dashboard kabhi bhi page ke ki tarah public deploy nahi hota — ye sirf
  localhost:3200 par chalta hai (alag folder, main site ke build me nahi).
- Agar main site `gsc-dashboard/` ke upar nahi hai to `SITE_ROOT` env set karo:
  `SITE_ROOT=C:\path\to\frontend`.
- Test ke liye dry-run: `POST /api/fix?dryRun=1` body `{"url":"https://servchip.com/..."}`

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