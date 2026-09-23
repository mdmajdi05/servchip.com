// GSC coverage checker + on-site health probe. Self-contained in gsc-dashboard/.
//
// Two tiers:
//  1. ON-SITE PROBE (always)          – fetches the live sitemap and checks every
//     URL's HTTP status, robots meta, self-canonical and hreflang count. Detects
//     soft-404s and missing canonicals without any credentials.
//  2. GSC INDEX REPORT (needs creds)  – URL Inspection API gives each URL's exact
//     coverage reason (Crawled/Discovered not indexed, Duplicate, Page not found…)
//     plus Search Analytics impressions/clicks. Results land in ledger.json and
//     are rendered into SEARCH-CONSOLE-LEDGER.md (both here in gsc-dashboard/).
//
// Usage (from the frontend/ repo root or the gsc-dashboard folder):
//   node gsc-dashboard/report.mjs                 # probe + GSC (limit 400 URLs)
//   node gsc-dashboard/report.mjs --probe-only    # skip GSC, works without creds
//   node gsc-dashboard/report.mjs --full          # GSC-inspect every sitemap URL
//   node gsc-dashboard/report.mjs --limit 150     # cap GSC inspections
//   node gsc-dashboard/report.mjs --days 28       # analytics window
//
// Credentials (needed only for tier 2): see README.md in this folder.

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { inspectUrl, searchAnalytics, hasCredentials, siteUrlFromEnv } from "./gsc-api.mjs";

const SITE_URL = process.env.SITE_URL ?? "https://servchip.com";
const DIR = import.meta.dirname;
const LEDGER_FILE = path.join(DIR, "ledger.json");
const LEDGER_MD = path.join(DIR, "SEARCH-CONSOLE-LEDGER.md");
const PROPERTY = siteUrlFromEnv(); // reads gsc-dashboard/.env (GSC_SITE_URL)

const CONCURRENCY = 6;
const GSC_PACE_MS = 250;

function usage() {
  console.log(
    `GSC coverage checker

Usage:
  node gsc-dashboard/report.mjs [options]

Options:
  --probe-only      Skip GSC API calls (works without credentials)
  --full            Inspect every sitemap URL via URL Inspection API
  --limit N         Cap GSC inspections to N URLs (default 400)
  --days N          Search Analytics lookback window (default 28)
  --strict          Exit code 1 when action-needed URLs are found
  --help            Show this help
`,
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function parseArgs(argv) {
  const args = { limit: 400, days: 28, probeOnly: false, full: false, strict: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--probe-only") args.probeOnly = true;
    else if (a === "--full") args.full = true;
    else if (a === "--strict") args.strict = true;
    else if (a === "--help") return { help: true, ...args };
    else if (a === "--limit") args.limit = Number(argv[++i]) || 400;
    else if (a === "--days") args.days = Number(argv[++i]) || 28;
  }
  return args;
}

async function fetchSitemapUrls() {
  const resp = await fetch(`${SITE_URL}/sitemap.xml`, { redirect: "follow" });
  if (!resp.ok) {
    throw new Error(`sitemap.xml fetch failed: HTTP ${resp.status}`);
  }
  const xml = await resp.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/gs)].map((m) => m[1].trim());
  const unique = [...new Set(urls)];
  if (unique.length === 0) throw new Error("sitemap.xml contains no <loc> entries");
  return unique;
}

function probeOne(pageUrl) {
  return fetch(pageUrl, { redirect: "follow" })
    .then(async (resp) => {
      let html = "";
      try {
        html = await resp.text();
      } catch {
        /* keep partial */
      }
      const canonicalEl =
        html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i)?.[0] ?? "";
      const canonical = canonicalEl.match(/href=["']([^"']+)["']/i)?.[1] ?? "";
      const robots =
        html.match(/<meta[^>]*name=["']robots["'][^>]*>/i)?.[0] ?? "";
      const robotsContent = robots.match(/content=["']([^"']+)["']/i)?.[1] ?? "";
      const hreflangCount = (
        html.match(
          /rel=["']alternate["'][^>]*hreflang|hreflang[^>]*rel=["']alternate["']/gi,
        ) ?? []
      ).length;
      return {
        httpStatus: resp.status,
        canonical: canonical || "",
        isSelfCanonical: canonical.replace(/\/$/, "") === pageUrl.replace(/\/$/, ""),
        robots: robotsContent || null,
        hreflangCount,
      };
    })
    .catch((err) => ({
      httpStatus: -1,
      canonical: "",
      isSelfCanonical: false,
      robots: null,
      hreflangCount: 0,
      fetchError: String(err?.message ?? err),
    }));
}

async function probeAll(urls) {
  const map = new Map();
  let cursor = 0;
  const worker = async () => {
    while (cursor < urls.length) {
      const url = urls[cursor];
      cursor += 1;
      map.set(url, await probeOne(url));
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return map;
}

function coverageReason(detail) {
  const s = detail?.indexStatusResult ?? {};
  return {
    coverageState: s.coverageState ?? null,
    verdict: s.verdict ?? null,
    indexingState: s.indexingState ?? null,
    robotsTxtState: s.robotsTxtState ?? null,
    lastCrawlTime: s.lastCrawlTime ?? null,
    googleCanonical: s.googleCanonical ?? null,
    userCanonical: s.userCanonical ?? null,
    pageFetchState: s.pageFetchState ?? null,
    inspectionTime: detail?.inspectionTime ?? null,
  };
}

// Google's URL Inspection returns human-readable coverageState strings.
// Normalize them to stable codes everywhere (report + dashboard share the mapping).
const COVERAGE = {
  "submitted and indexed": "INDEXED_ALLOWED",
  "crawled - currently not indexed": "CRAWLED_CURRENTLY_NOT_INDEXED",
  "crawled but not indexed": "CRAWLED_CURRENTLY_NOT_INDEXED",
  "not indexed": "CRAWLED_CURRENTLY_NOT_INDEXED",
  "discovered - currently not indexed": "DISCOVERED_CURRENTLY_NOT_INDEXED",
  "duplicate, google chose different canonical than user": "DUPLICATE_GOOGLE_SELECTED_CANONICAL",
  "duplicate, user-selected canonical": "DUPLICATE_USER_SELECTED_CANONICAL",
  "duplicate without user-selected canonical": "DUPLICATE_INTERNAL",
  "page with redirect": "PAGE_WITH_REDIRECT",
  "page with soft 404": "SOFT_404",
  "url is marked noindex": "NOINDEX",
  "not found (404)": "PAGE_NOT_FOUND",
  "url is unknown to google": "PAGE_NOT_FOUND",
};

function normCoverage(s) {
  if (!s) return s;
  return COVERAGE[s.toLowerCase().trim()] ?? s.replace(/[\s.,]+/g, "_").toUpperCase();
}

const NEEDS_ACTION = new Set([
  "CRAWLED_CURRENTLY_NOT_INDEXED",
  "DISCOVERED_CURRENTLY_NOT_INDEXED",
  "DUPLICATE_USER_SELECTED_CANONICAL",
  "DUPLICATE_GOOGLE_SELECTED_CANONICAL",
  "DUPLICATE_INTERNAL",
  "PAGE_NOT_FOUND",
  "NOINDEX",
  "SOFT_404",
]);

export function isActionNeeded(u) {
  const lg = u?.latest ?? {};
  if (lg.httpStatus === 200 && lg.isSelfCanonical === false) return true;
  if (lg.httpStatus === 200 && lg.coverageState === null && lg.hreflangCount === 0) return true;
  if (lg.coverageState && NEEDS_ACTION.has(normCoverage(lg.coverageState))) return true;
  return false;
}

export function flagFor(u) {
  const lg = u?.latest ?? {};
  if (lg.httpStatus === 200) {
    if (lg.isSelfCanonical === false) return "BAD_CANONICAL";
    if (lg.coverageState === null && lg.hreflangCount === 0) return "NO_HREFLANG";
  }
  if (lg.coverageState && NEEDS_ACTION.has(normCoverage(lg.coverageState))) return normCoverage(lg.coverageState);
  return null;
}

async function run() {
  const args = await parseArgs(process.argv.slice(2));
  if (args.help) return usage();

  console.log(`Site:     ${SITE_URL}`);
  console.log(`Property: ${PROPERTY}`);
  console.log(`Probe-only: ${args.probeOnly} | GSC credentials: ${hasCredentials()}`);

  const urls = await fetchSitemapUrls();
  console.log(`sitemap.xml URLs: ${urls.length}`);

  console.log("Probing live site…");
  const probes = await probeAll(urls);
  const probeStats = { ok: 0, notFound: 0, badCanonical: 0, soft404: 0, hreflangWarn: 0 };
  for (const p of probes.values()) {
    if (p.httpStatus === 200) probeStats.ok += 1;
    else if (p.httpStatus === 404) probeStats.notFound += 1;
    if (!p.isSelfCanonical) probeStats.badCanonical += 1;
    if (p.httpStatus === 200 && !p.canonical) probeStats.soft404 += 1;
    if (p.hreflangCount > 0 && p.hreflangCount < 5) probeStats.hreflangWarn += 1;
  }
  console.log(
    `probe → 200:${probeStats.ok} 404:${probeStats.notFound} badCanonical:${probeStats.badCanonical} soft404-ish:${probeStats.soft404} hreflang<5:${probeStats.hreflangWarn}`,
  );

  const gsc = { inspected: 0, errors: [] };
  let analytics = [];
  if (!args.probeOnly && hasCredentials()) {
    console.log(`URL Inspection (pace ${GSC_PACE_MS}ms)…`);
    const targets = args.full ? urls : urls.slice(0, args.limit);
    for (let i = 0; i < targets.length; i += 1) {
      const url = targets[i];
      try {
        const res = await inspectUrl(url);
        probes.set(url, {
          ...(probes.get(url) ?? {}),
          gsc: coverageReason(res?.inspectionResult),
        });
        gsc.inspected += 1;
      } catch (err) {
        gsc.errors.push(`${url}: ${err?.message ?? err}`);
      }
      if ((i + 1) % 20 === 0 || i === targets.length - 1) {
        console.log(`  inspected ${i + 1}/${targets.length}`);
      }
      await sleep(GSC_PACE_MS);
    }
    console.log("Search Analytics…");
    try {
      const res = await searchAnalytics({ startDate: daysAgo(args.days), endDate: daysAgo(1) });
      analytics = res?.rows ?? [];
    } catch (err) {
      gsc.errors.push(`analytics: ${err?.message ?? err}`);
    }
  }

  let ledger = { updatedAt: null, property: PROPERTY, urls: {} };
  if (existsSync(LEDGER_FILE)) {
    try {
      ledger = JSON.parse(readFileSync(LEDGER_FILE, "utf8"));
      ledger.property = PROPERTY; // keep in sync when .env/property changes
    } catch {
      /* reset on corrupt */
    }
  }
  // Re-probe ledger URLs that are no longer in the sitemap (e.g. phantom
  // country roots that now 404) so their `latest` state stays current instead
  // of going stale and triggering wrong flags like BAD_CANONICAL.
  const legacyUrls = Object.keys(ledger.urls).filter((u) => !probes.has(u));
  const legacySet = new Set(legacyUrls);
  if (legacyUrls.length > 0) {
    const legacyProbes = await probeAll(legacyUrls);
    for (const [u, p] of legacyProbes) probes.set(u, p);
  }

  const now = new Date().toISOString();
  const iMap = new Map(
    analytics.map((r) => [
      r.keys?.[0],
      {
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        position: r.position ?? null,
      },
    ]),
  );

  for (const [url, p] of probes) {
    const prev = ledger.urls[url] ?? { firstSeen: now, history: [] };
    const entry = {
      at: now,
      httpStatus: p.httpStatus ?? null,
      robots: p.robots ?? null,
      isSelfCanonical: p.isSelfCanonical ?? null,
      hreflangCount: p.hreflangCount ?? 0,
      pageFetchState: p.gsc?.pageFetchState ?? null,
      coverageState: p.gsc?.coverageState ?? null,
      verdict: p.gsc?.verdict ?? null,
      googleCanonical: p.gsc?.googleCanonical ?? null,
      userCanonical: p.gsc?.userCanonical ?? null,
      lastCrawlTime: p.gsc?.lastCrawlTime ?? null,
    };
    ledger.urls[url] = {
      firstSeen: prev.firstSeen ?? now,
      lastSeen: now,
      history: [...(prev.history ?? []).slice(-39), entry],
      latest: entry,
      removed: legacySet.has(url) ? true : undefined,
      analytics: iMap.get(url) ?? prev.analytics ?? null,
    };
  }
  ledger.updatedAt = now;
  ledger.mode = args.probeOnly || !hasCredentials() ? "probe-only" : "gsc+probe";
  mkdirSync(DIR, { recursive: true });
  writeFileSync(LEDGER_FILE, JSON.stringify(ledger, null, 2));

  renderLedger(ledger, { urls, probeStats, inspected: gsc.inspected, gscErrors: gsc.errors, args });

  const actionNeeded = Object.values(ledger.urls).filter(isActionNeeded);
  console.log(`\nAction-needed URLs: ${actionNeeded.length}`);
  if (args.strict && actionNeeded.length > 0) process.exitCode = 1;
}

function renderLedger(ledger, { urls, probeStats, inspected, gscErrors, args }) {
  const byState = new Map();
  const flagged = [];
  for (const [url, u] of Object.entries(ledger.urls)) {
    const f = flagFor(u);
    if (f) {
      flagged.push({ url, u, f });
      const key = f === "BAD_CANONICAL" || f === "NO_HREFLANG" ? "ON-SITE ISSUE" : f;
      byState.set(key, (byState.get(key) ?? 0) + 1);
    }
  }
  byState.set("indexed/ok", Object.keys(ledger.urls).length - flagged.length);

  const lines = [];
  lines.push(`# Search Console Ledger — servchip.com`);
  lines.push("");
  lines.push(`- Updated: ${ledger.updatedAt ?? "—"}`);
  lines.push(`- Property: ${ledger.property}`);
  lines.push(`- Mode: ${ledger.mode}`);
  lines.push(`- Sitemap URLs scanned: ${urls.length} | GSC-inspected: ${inspected}`);
  lines.push(`- Probe: 200=${probeStats.ok} 404=${probeStats.notFound} badCanonical=${probeStats.badCanonical}`);
  lines.push("");
  lines.push(`## Coverage state distribution`);
  lines.push("");
  lines.push(`| state | count |`);
  lines.push(`|---|---:|`);
  for (const [s, n] of [...byState.entries()].sort((a, b) => b[1] - a[1])) {
    lines.push(`| ${s} | ${n} |`);
  }
  lines.push("");
  if (gscErrors.length) {
    lines.push(`## GSC API errors`);
    lines.push("");
    for (const e of gscErrors.slice(0, 20)) lines.push(`- \`${e}\``);
    lines.push("");
  }
  lines.push(`## Needs attention (${flagged.length})`);
  lines.push("");
  if (flagged.length === 0) {
    lines.push("_Nothing flagged in this run._");
  } else {
    lines.push(`| URL | issue | http | canonical | robots | hreflang | last crawl |`);
    lines.push(`|---|---|---|---|---|---|---|`);
    for (const { url, u, f } of flagged.slice(0, 120)) {
      const lg = u.latest ?? {};
      lines.push(
        `| ${url} | ${f} | ${lg.httpStatus ?? "?"} | ${
          lg.isSelfCanonical === false ? "WRONG/MISSING" : "ok"
        } | ${lg.robots ?? "—"} | ${lg.hreflangCount ?? 0} | ${lg.lastCrawlTime ?? "—"} |`,
      );
    }
  }
  if (args.probeOnly || !hasCredentials()) {
    lines.push("");
    lines.push("> **GSC tier disabled** — add service-account credentials (see README.md in this folder) to get per-URL coverage reasons.");
  }
  lines.push("");
  writeFileSync(LEDGER_MD, lines.join("\n"));
}

function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

run().catch((err) => {
  console.error(`\n✗ report failed: ${err?.message ?? err}`);
  process.exitCode = 1;
});