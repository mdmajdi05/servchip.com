// Re-submit the sitemap to Google Search Console — our "request crawl" lever.
// Google can't be forced to crawl via API on normal sites; re-submitting a
// sitemap makes Google re-read it promptly, which refreshes discovery of all
// URLs inside. For urgent individual URLs use "URL Inspection → Request
// Indexing" once in the GSC UI; afterwards monitor here.
//
// Usage:
//   node gsc-dashboard/notify.mjs                  # submit sitemap + show status
//   node gsc-dashboard/notify.mjs --quiet          # nothing but the result line
//   node gsc-dashboard/notify.mjs --path robots/system.xml

import { listSitemaps, submitSitemap } from "./gsc-api.mjs";

const SITE_URL = process.env.SITE_URL ?? "https://servchip.com";

async function main() {
  const quiet = process.argv.includes("--quiet");
  const pi = process.argv.indexOf("--path");
  const feedPath = pi >= 0 ? process.argv[pi + 1] : "sitemap.xml";

  // 1) Show what Google currently knows.
  const existing = await listSitemaps();
  const sitemaps = existing?.sitemap ?? [];
  if (!quiet) {
    console.log(`Sitemaps known to Search Console (${sitemaps.length}):`);
    for (const s of sitemaps) {
      const status = s.isPending
        ? `PENDING (submitted ${s.lastSubmitted ?? "?"})`
        : `errors=${s.errors ?? 0} warnings=${s.warnings ?? 0} (${s.lastSubmitted ?? "?"})`;
      console.log(`  ${s.path}  →  ${status}`);
    }
  }

  // 2) Re-submit so Google re-reads it. The API accepts several feedpath
  //    forms; try them until one sticks.
  const host = new URL(SITE_URL).host;
  const candidates = [feedPath, `${host}/${feedPath}`, `${SITE_URL}/${feedPath}`];
  let done = false;
  for (const c of candidates) {
    try {
      await submitSitemap(c);
      console.log(`✅ Sitemap re-submitted: ${c} (Google will re-crawl it shortly)`);
      done = true;
      break;
    } catch {
      /* try next form */
    }
  }
  if (!done) {
    throw new Error(
      `Could not submit sitemap '${feedPath}' with any feedpath form. Check GSC credentials + property in gsc-dashboard/.env.`,
    );
  }

  if (!quiet) {
    const found = sitemaps.find((s) => s.path.endsWith(`/${feedPath}`));
    console.log(
      found
        ? `Last submission on record: ${found.lastSubmitted ?? "unknown"}`
        : "The sitemap did not exist before — it will appear in the next list call.",
    );
  }
}

main().catch((err) => {
  console.error(`\n✗ notify failed: ${err?.message ?? err}`);
  process.exitCode = 1;
});