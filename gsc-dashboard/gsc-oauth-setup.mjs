// One-time interactive OAuth setup for the GSC dashboard.
//
// NO Google Cloud billing / payment method needed for this path — you only
// need an OAuth "Desktop app" client (free to create in Google Cloud Console).
//
// Usage:
//   node gsc-dashboard/gsc-oauth-setup.mjs
//   node gsc-dashboard/gsc-oauth-setup.mjs --client-id XXX --client-secret YYY
//
// What it does:
//   1. Reads Client ID / Secret from flags, .env, or prompts for them.
//   2. Starts a local loopback callback server and prints a consent URL.
//   3. You sign in with the Google account that OWNS the Search Console
//      property, click Allow, and the browser redirects back to this server.
//   4. The script exchanges the code for a refresh token, stores it in
//      gsc-dashboard/.env (GSC_OAUTH_REFRESH_TOKEN + client id/secret), then
//      verifies by listing the property's sitemaps.

import { createServer } from "node:http";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import path from "node:path";

const DIR = import.meta.dirname;
const ENV_FILE = path.join(DIR, ".env");
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

function readEnv() {
  const out = {};
  if (!existsSync(ENV_FILE)) return out;
  for (const line of readFileSync(ENV_FILE, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

function writeEnv(env) {
  const lines = Object.entries(env)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => (v.includes("\n") || v.includes('"') ? `${k}="${v}"` : `${k}=${v}`));
  writeFileSync(ENV_FILE, lines.join("\n") + "\n", "utf8");
}

function parseCliArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a.startsWith("--")) args[a.slice(2)] = argv[i + 1];
  }
  return args;
}

const rl = readline.createInterface({ input: stdin, output: stdout });
async function ask(q) {
  const ans = await rl.question(q);
  return ans.trim();
}

function waitForCode(port, state) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, `http://127.0.0.1:${port}`);
      if (
        url.pathname === "/" &&
        url.searchParams.get("state") === state &&
        url.searchParams.get("code")
      ) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          "<h3 style='font-family:sans-serif'>✅ Login successful — ye window band kar sakte ho.</h3>",
        );
        server.close(() => resolve(url.searchParams.get("code")));
      } else if (url.pathname === "/" && url.searchParams.get("error")) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h3 style='font-family:sans-serif'>Login cancelled / error.</h3>");
        server.close(() => resolve("__error__"));
      } else {
        res.writeHead(400);
        res.end("bad request");
      }
    });
    server.listen(port, "127.0.0.1");
    server.on("error", reject);
  });
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const env = readEnv();

  let clientId = args["client-id"] ?? env.GSC_OAUTH_CLIENT_ID;
  let clientSecret = args["client-secret"] ?? env.GSC_OAUTH_CLIENT_SECRET;
  if (!clientId) clientId = await ask("OAuth Client ID (Google Cloud Console se): ");
  if (!clientSecret) clientSecret = await ask("OAuth Client Secret: ");
  if (!clientId || !clientSecret) {
    console.error("Client ID aur Client Secret dono chahiye.");
    process.exit(1);
  }

  const port = 8787 + Math.floor(Math.random() * 400);
  const redirectUri = `http://127.0.0.1:${port}/`;
  const state = randomBytes(16).toString("hex");
  const authUrl =
    `${AUTH_URL}?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code&scope=${encodeURIComponent(SCOPE)}` +
    `&access_type=offline&prompt=consent&state=${state}`;

  console.log("\n1) Ye URL browser mein kholo aur GSC-owner Google account se sign in karo:");
  console.log("   " + authUrl);
  console.log("\n2) Allow par click karo — ye script callback khud capture kar legi.\n");

  const code = await waitForCode(port, state);
  if (code === "__error__") {
    console.error("Login cancel hua. Dobara chalao.");
    process.exit(1);
  }

  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  const tokens = await resp.json();
  if (!resp.ok || !tokens.refresh_token) {
    console.error("Token exchange failed:", JSON.stringify(tokens));
    process.exit(1);
  }

  env.GSC_OAUTH_CLIENT_ID = clientId;
  env.GSC_OAUTH_CLIENT_SECRET = clientSecret;
  env.GSC_OAUTH_REFRESH_TOKEN = tokens.refresh_token;
  writeEnv(env);

  console.log("\n.env me refresh token store ho gaya. Ab verify karta hoon…\n");

  // Verify by listing sitemaps of sc-domain:servchip.com (uses the stored creds).
  const { listSitemaps } = await import("./gsc-api.mjs");
  try {
    const sitemaps = await listSitemaps();
    const names = (sitemaps?.sitemap ?? []).map((s) => s.path).join(", ") || "(koi sitemap submit na ho)";
    console.log("✅ Credentials kaam kar rahe hain — property ke sitemaps:");
    console.log("   " + names);
    console.log("\nAb chalao: node gsc-dashboard/report.mjs");
  } catch (e) {
    console.error("✗ Credentials store ho gaye, par verify fail hua:", e.message);
    console.error("  Check: Search Console → Settings → Users & permissions → kya ye");
    console.error("  account/email property par hai (Full/Owner) — aur GSC_SITE_URL sahi hai.");
    process.exit(1);
  }
}

main().finally(() => rl.close());