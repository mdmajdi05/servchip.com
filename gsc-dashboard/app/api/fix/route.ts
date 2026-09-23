import { NextResponse } from "next/server";
import { spawn } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import type { Ledger, UrlEntry } from "../../../dashboard-types";

// Local-only helper: opens OpenCode (Plan agent) in the main site folder
// for the given index-coverage problem. Never part of the public site —
// the dashboard only listens on localhost:3200.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function loadLedger(): Ledger | null {
  const file = path.join(process.cwd(), "ledger.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8")) as Ledger;
  } catch {
    return null;
  }
}

/** Site root = the frontend/ folder (dashboard sits one level above it).
 *  Override with SITE_ROOT env if the layout differs. */
function siteRoot(): string | null {
  const root = process.env.SITE_ROOT ?? path.resolve(process.cwd(), "..");
  if (!existsSync(path.join(root, "package.json"))) return null;
  return root;
}

const STATE_LABEL: Record<string, string> = {
  BAD_CANONICAL:
    "page returns 200 but its canonical points at a different URL (or is missing)",
  NO_HREFLANG:
    "page has no/few hreflang alternates although it is a localized page",
  NOT_FOUND: "page returns HTTP 404 (dead route still referenced)",
  DUPLICATE_USER_SELECTED_CANONICAL:
    "Google sees this URL as a duplicate of the user-selected canonical",
  DUPLICATE_GOOGLE_SELECTED_CANONICAL:
    "Google selected a different canonical for this URL",
  DUPLICATE_INTERNAL: "Google sees this URL as an internal duplicate",
  CRAWLED_CURRENTLY_NOT_INDEXED: "URL was crawled but is not indexed",
  DISCOVERED_CURRENTLY_NOT_INDEXED: "URL is discovered but not crawled yet",
  PAGE_NOT_FOUND:
    "URL is present in your property but returns not found to Google",
};

function issueLabel(u: UrlEntry): string {
  const lg = u.latest;
  const stateKey = (s?: string | null) => (s ? s.replace(/-/g, "_") : null);
  if (lg.httpStatus === 200) {
    if (lg.isSelfCanonical === false) return "BAD_CANONICAL";
    if (!lg.coverageState && (lg.hreflangCount ?? 0) < 5) return "NO_HREFLANG";
  }
  if (lg.httpStatus === 404) return "NOT_FOUND";
  return lg.coverageState
    ? (stateKey(lg.coverageState) ?? "UNKNOWN")
    : "UNKNOWN";
}

/** Build the initial OpenCode prompt. Kept ASCII-only (no quotes/apostrophes)
 *  so it survives the PowerShell launcher verbatim. */
function promptFor(url: string, u: UrlEntry): string {
  const lg = u.latest;
  const issue = issueLabel(u);
  const issueText = STATE_LABEL[issue] ?? issue;
  const lines = [
    "GSC dashboard index-coverage issue on servchip.com. You are working in the site project (frontend/). Investigate this URL and its route, find the root cause, and prepare a fix.",
    "",
    `URL: ${url}`,
    `Issue: ${issue} (${issueText})`,
    `Probe: HTTP ${lg.httpStatus ?? "?"}, self-canonical=${lg.isSelfCanonical ?? "?"}, hreflang=${lg.hreflangCount ?? 0}, robots=${lg.robots ?? "?"}, coverageState=${lg.coverageState ?? "-"}, googleCanonical=${lg.googleCanonical ?? "-"}, lastCrawlTime=${lg.lastCrawlTime ?? "-"}`,
    "",
    "Workflow: start in Plan mode. Analyse, reproduce, and present a concrete plan. Do NOT edit project files until the user approves. After approval (user switches you to the Build agent), apply the fix, run `npm test` and `npm run typecheck` in the frontend folder, make sure both are green, and finish by telling the user exactly what to deploy.",
  ];
  // ASCII-only prompt: keeps the PowerShell single-quoted launcher safe.
  return lines.join("\n").replace(/[^\x20-\x7E\n]/g, "-");
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { url?: string } | null;
  const url = typeof body?.url === "string" ? body.url : "";
  if (!/^https:\/\/.*servchip\.com/.test(url)) {
    return NextResponse.json(
      { ok: false, error: "Invalid URL" },
      { status: 400 },
    );
  }
  const ledger = loadLedger();
  const entry = ledger?.urls?.[url];
  if (!entry) {
    return NextResponse.json(
      { ok: false, error: "URL not found in ledger. Run report.mjs first." },
      { status: 404 },
    );
  }
  const root = siteRoot();
  if (!root) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Main site folder not found. Run the dashboard from gsc-dashboard/, or set SITE_ROOT to the frontend folder.",
      },
      { status: 400 },
    );
  }

  const prompt = promptFor(url, entry);

  // Launcher script (temp) so the whole command is one parameter-free file:
  // the new PowerShell window just runs it. No user input ever reaches the
  // command line unescaped.
  const tmp = tmpdir();
  for (const f of readdirSync(tmp)) {
    if (f.startsWith("gsc-dashboard-fix-") && f.endsWith(".ps1")) {
      try {
        rmSync(path.join(tmp, f), { force: true });
      } catch {
        /* stale file, ignore */
      }
    }
  }
  const ps1 = path.join(tmp, `gsc-dashboard-fix-${Date.now()}.ps1`);
  const ps1Body = [
    `Set-Location -LiteralPath '${root}'`,
    `opencode mini --agent plan --prompt '${prompt.replace(/'/g, "''")}'`,
    "",
  ].join("\r\n");
  writeFileSync(ps1, ps1Body, "utf8");

  const launcher = `Start-Process powershell.exe -NoExit -ExecutionPolicy Bypass -File '${ps1}'`;

  const dryRun = new URL(req.url).searchParams.get("dryRun") === "1";
  if (dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, launcher, ps1, prompt });
  }

  const done = new Promise<boolean>((resolve) => {
    const child = spawn("powershell.exe", ["-Command", launcher], {
      detached: true,
      windowsHide: false,
      stdio: "ignore",
    });
    child.on("error", (err) => {
      console.error("open-fix spawn failed:", err);
      resolve(false);
    });
    child.once("spawn", () => {
      child.unref();
      resolve(true);
    });
  });

  const ok = await done;
  if (!ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not start PowerShell. Is opencode installed and on PATH?",
      },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, prompt });
}
