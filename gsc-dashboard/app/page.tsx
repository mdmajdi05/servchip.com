import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Ledger } from "../dashboard-types";
import DashboardClient from "./dashboard-client";

// Always re-read ledger.json on refresh — no caching of a local report.
export const dynamic = "force-dynamic";

function loadLedger(): Ledger | null {
  const file = path.join(process.cwd(), "ledger.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8")) as Ledger;
  } catch {
    return null;
  }
}

export default function Page() {
  const ledger = loadLedger();
  if (!ledger) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-2xl font-semibold">Search Console Dashboard</h1>
        <p className="mt-3 rounded-xl border border-neutral-800 bg-neutral-900 p-5 text-neutral-300">
          Abhi tak koi data nahi hai. Pehle ek checker run karo —
          <br />
          <code className="mt-2 inline-block rounded bg-neutral-800 px-2 py-1 text-neutral-100">
            node gsc-dashboard/report.mjs --probe-only
          </code>
          <br />
          <span className="mt-1 block text-sm text-neutral-400">
            Phir ye page refresh karo. Credentials laga lo to Google ka per-URL
            index status bhi aayega.
          </span>
        </p>
      </main>
    );
  }
  return <DashboardClient ledger={ledger} />;
}
