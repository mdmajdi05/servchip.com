// GSC API client — zero dependencies (Node 18+ built-in crypto + fetch).
//
// Two credential modes (both stored in a local gsc-dashboard/.env, git-ignored):
//
//   A) OAuth user mode (RECOMMENDED — no Google Cloud billing needed):
//        GSC_OAUTH_CLIENT_ID=<OAuth client id (Desktop app)>
//        GSC_OAUTH_CLIENT_SECRET=<client secret>
//        GSC_OAUTH_REFRESH_TOKEN=<get via: node gsc-dashboard/gsc-oauth-setup.mjs>
//      Contact flow: OAuth consent -> refresh token -> access token.
//
//   B) Service account mode (needs a Google Cloud project):
//        GSC_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
//        GSC_SERVICE_ACCOUNT_FILE=C:/path/service-account.json
//      Auth flow: RS256 JWT -> OAuth2 token.
//
// Both use scope https://www.googleapis.com/auth/webmasters (Search
// Analytics, URL Inspection and Sitemaps read/write).

import { createSign } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://www.googleapis.com/webmasters/v3";
const SC_BASE = "https://searchconsole.googleapis.com/v1"; // URL Inspection API lives here

export class GscError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function loadEnv() {
  const env = { ...process.env };
  const files = [
    path.join(import.meta.dirname, ".env"),
    path.resolve(process.cwd(), ".env.local"),
  ];
  for (const f of files) {
    try {
      if (!existsSync(f)) continue;
      for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    } catch {
      /* best effort */
    }
  }
  return env;
}

export function hasCredentials(env = loadEnv()) {
  return Boolean(
    env.GSC_SERVICE_ACCOUNT_JSON ||
      env.GSC_SERVICE_ACCOUNT_FILE ||
      env.GOOGLE_APPLICATION_CREDENTIALS ||
      loadOAuthEnv(env),
  );
}

/** OAuth user-mode env is considered present when all three parts exist. */
function loadOAuthEnv(env) {
  return Boolean(
    env.GSC_OAUTH_REFRESH_TOKEN &&
      env.GSC_OAUTH_CLIENT_ID &&
      env.GSC_OAUTH_CLIENT_SECRET,
  );
}

function loadServiceAccount(env) {
  let raw = env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw && env.GSC_SERVICE_ACCOUNT_FILE) {
    raw = readFileSync(path.resolve(process.cwd(), env.GSC_SERVICE_ACCOUNT_FILE), "utf8");
  }
  if (!raw && env.GOOGLE_APPLICATION_CREDENTIALS) {
    raw = readFileSync(path.resolve(process.cwd(), env.GOOGLE_APPLICATION_CREDENTIALS), "utf8");
  }
  if (!raw) {
    throw new GscError(
      "No GSC credentials found. Set GSC_SERVICE_ACCOUNT_JSON or GSC_SERVICE_ACCOUNT_FILE in gsc-dashboard/.env",
    );
  }
  return JSON.parse(raw);
}

function b64url(input) {
  return Buffer.from(input).toString("base64url");
}

function signJwt(account) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: account.client_email,
    scope: WEBMASTERS_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };
  const unsigned = b64url(JSON.stringify(header)) + "." + b64url(JSON.stringify(claim));
  const sign = createSign("RSA-SHA256");
  sign.update(unsigned);
  return unsigned + "." + sign.sign(account.private_key, "base64url");
}

async function getAccessToken(account) {
  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signJwt(account),
    }),
  });
  const data = await resp.json();
  if (!resp.ok || !data.access_token) {
    throw new GscError(
      `OAuth token failed (HTTP ${resp.status}): ${data?.error_description ?? JSON.stringify(data)}`,
      resp.status,
    );
  }
  return data.access_token;
}

/** OAuth user-mode: exchange the stored refresh token for an access token. */
async function getOAuthAccessToken(env) {
  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GSC_OAUTH_CLIENT_ID,
      client_secret: env.GSC_OAUTH_CLIENT_SECRET,
      refresh_token: env.GSC_OAUTH_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await resp.json();
  if (!resp.ok || !data.access_token) {
    throw new GscError(
      `OAuth refresh failed (HTTP ${resp.status}): ${data?.error_description ?? JSON.stringify(data)}`,
      resp.status,
    );
  }
  return data.access_token;
}

let cachedToken = null;
let cachedUntil = 0;

async function token() {
  if (cachedToken && Date.now() < cachedUntil) return cachedToken;
  const env = loadEnv();
  let t;
  if (loadOAuthEnv(env)) {
    t = await getOAuthAccessToken(env);
  } else {
    t = await getAccessToken(loadServiceAccount(env));
  }
  cachedToken = t;
  cachedUntil = Date.now() + 50 * 60 * 1000; // refresh before 1h expiry
  return t;
}

async function api(method, urlPath, body, base = API_BASE) {
  const bearer = await token();
  const resp = await fetch(base + urlPath, {
    method,
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await resp.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!resp.ok) {
    throw new GscError(
      `GSC API ${method} ${urlPath} failed (HTTP ${resp.status}): ${typeof data === "string" ? data : JSON.stringify(data)}`,
      resp.status,
    );
  }
  return data;
}

export const siteUrlFromEnv = (env = loadEnv()) =>
  env.GSC_SITE_URL ?? "sc-domain:servchip.com";

/** List every site the authenticated account can access (diagnostics). */
export async function listSites() {
  return api("GET", "/sites");
}

/** Recent Search Analytics rows (dimension: page). */
export async function searchAnalytics({ startDate, endDate, rowLimit = 25000 } = {}) {
  const site = siteUrlFromEnv();
  const end = endDate ?? daysAgo(1);
  return api("POST", `/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
    startDate: startDate ?? daysAgo(28),
    endDate: end,
    dimensions: ["page"],
    rowLimit,
  });
}

/** Per-URL index inspection (coverageState, canonical, last crawl...).
 *  Uses the Search Console v1 endpoint: site goes in the body, not the path. */
export async function inspectUrl(inspectionUrl) {
  const site = siteUrlFromEnv();
  return api(
    "POST",
    "/urlInspection/index:inspect",
    { inspectionUrl, siteUrl: site },
    SC_BASE,
  );
}

export async function listSitemaps() {
  const site = siteUrlFromEnv();
  return api("GET", `/sites/${encodeURIComponent(site)}/sitemaps`);
}

/** Re-submitting a sitemap makes Google re-read it soon (our "request crawl" lever). */
export async function submitSitemap(feedpath) {
  const site = siteUrlFromEnv();
  return api("PUT", `/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(feedpath)}`);
}

export async function deleteSitemap(feedpath) {
  const site = siteUrlFromEnv();
  return api("DELETE", `/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(feedpath)}`);
}

function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}