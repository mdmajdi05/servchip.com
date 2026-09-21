// GSC API client — zero dependencies (Node 18+ built-in crypto + fetch).
//
// Credentials: a Google service account with "Owner" (or at least "Full")
// permission on the Search Console property. Provide them via a local
// gsc-dashboard/.env file (ignored by git):
//
//   GSC_SITE_URL=sc-domain:servchip.com          (domain property — recommended)
//   GSC_SITE_URL=https://servchip.com/            (URL-prefix property)
//   GSC_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
//   GSC_SERVICE_ACCOUNT_FILE=C:/path/service-account.json
//
// Auth flow: RS256 JWT -> OAuth2 token for scope https://www.googleapis.com/auth/webmasters
// (covers Search Analytics, URL Inspection and Sitemaps read/write).

import { createSign } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://www.googleapis.com/webmasters/v3";

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
      env.GOOGLE_APPLICATION_CREDENTIALS,
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

let cachedToken = null;
let cachedUntil = 0;

async function token() {
  if (cachedToken && Date.now() < cachedUntil) return cachedToken;
  const account = loadServiceAccount(loadEnv());
  const t = await getAccessToken(account);
  cachedToken = t;
  cachedUntil = Date.now() + 50 * 60 * 1000; // refresh before 1h expiry
  return t;
}

async function api(method, urlPath, body) {
  const bearer = await token();
  const resp = await fetch(API_BASE + urlPath, {
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

/** Per-URL index inspection (coverageState, canonical, last crawl...). */
export async function inspectUrl(inspectionUrl) {
  const site = siteUrlFromEnv();
  return api("POST", `/sites/${encodeURIComponent(site)}/urlInspection/index:inspect`, {
    inspectionUrl,
    siteUrl: site,
  });
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