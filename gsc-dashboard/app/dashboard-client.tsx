"use client";

import { useMemo, useState } from "react";
import type { Ledger, Snapshot, UrlEntry } from "../dashboard-types";

type Tone = "green" | "yellow" | "red" | "gray" | "blue" | "purple";

const STATE_UI: Record<string, { label: string; tone: Tone }> = {
  INDEXED: { label: "Indexed", tone: "green" },
  INDEXED_ALLOWED: { label: "Indexed", tone: "green" },
  CRAWLED_CURRENTLY_NOT_INDEXED: {
    label: "Crawled – not indexed",
    tone: "yellow",
  },
  DISCOVERED_CURRENTLY_NOT_INDEXED: {
    label: "Discovered – not indexed",
    tone: "yellow",
  },
  DUPLICATE_USER_SELECTED_CANONICAL: { label: "Duplicate (user)", tone: "red" },
  DUPLICATE_GOOGLE_SELECTED_CANONICAL: {
    label: "Duplicate (google)",
    tone: "red",
  },
  DUPLICATE_INTERNAL: { label: "Duplicate (internal)", tone: "red" },
  PAGE_NOT_FOUND: { label: "Page not found", tone: "red" },
  PAGE_WITH_REDIRECT: { label: "Redirect", tone: "gray" },
  SOFT_404: { label: "Soft 404", tone: "yellow" },
  NOINDEX: { label: "Noindex", tone: "gray" },
  BAD_CANONICAL: { label: "Canonical issue", tone: "red" },
  NO_HREFLANG: { label: "Hreflang issue", tone: "yellow" },
  NOT_FOUND: { label: "HTTP 404", tone: "red" },
  UNAVAILABLE: { label: "Unavailable", tone: "gray" },
  NEUTRAL: { label: "Neutral", tone: "gray" },
  PARTIAL: { label: "Partial", tone: "yellow" },
  healthy: { label: "Healthy", tone: "green" },
};

const TONE_CLS: Record<Tone, string> = {
  green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  yellow: "bg-amber-500/15 text-amber-400 border border-amber-500/40",
  red: "bg-rose-500/15 text-rose-400 border border-rose-500/40",
  gray: "bg-neutral-500/15 text-neutral-400 border border-neutral-600/40",
  blue: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
  purple: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
};

const fmtDate = (s?: string | null) => (s ? new Date(s).toLocaleString() : "—");

// Mirror of report.mjs COVERAGE: Google's human readable coverageState -> codes.
const COVERAGE_NORM: Record<string, string> = {
  "submitted and indexed": "INDEXED_ALLOWED",
  "crawled - currently not indexed": "CRAWLED_CURRENTLY_NOT_INDEXED",
  "crawled but not indexed": "CRAWLED_CURRENTLY_NOT_INDEXED",
  "not indexed": "CRAWLED_CURRENTLY_NOT_INDEXED",
  "discovered - currently not indexed": "DISCOVERED_CURRENTLY_NOT_INDEXED",
  "duplicate, google chose different canonical than user":
    "DUPLICATE_GOOGLE_SELECTED_CANONICAL",
  "duplicate, user-selected canonical": "DUPLICATE_USER_SELECTED_CANONICAL",
  "duplicate without user-selected canonical": "DUPLICATE_INTERNAL",
  "page with redirect": "PAGE_WITH_REDIRECT",
  "page with soft 404": "SOFT_404",
  "url is marked noindex": "NOINDEX",
  "not found (404)": "PAGE_NOT_FOUND",
  "url is unknown to google": "PAGE_NOT_FOUND",
};

const stateKey = (s?: string | null) => {
  if (!s) return null;
  return (
    COVERAGE_NORM[s.toLowerCase().trim()] ??
    s.replace(/[\s.,]+/g, "_").toUpperCase()
  );
};

function issueOf(u: UrlEntry): string | null {
  const lg = u.latest;
  if (lg.httpStatus === 200) {
    if (lg.isSelfCanonical === false) return "BAD_CANONICAL";
    if (!lg.coverageState && lg.hreflangCount < 5) return "NO_HREFLANG";
  }
  if (lg.httpStatus === 404) return "NOT_FOUND";
  if (!lg.coverageState) return null;
  const key = stateKey(lg.coverageState);
  // Indexed/healthy states attention mein count nahi hote.
  if (key === "INDEXED_ALLOWED" || key === "INDEXED") return null;
  return key;
}

function Tag({ id }: { id: string }) {
  const meta = STATE_UI[id] ?? { label: id || "unknown", tone: "gray" as Tone };
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TONE_CLS[meta.tone]}`}
    >
      {meta.label}
    </span>
  );
}

function DetailBox({ u, colSpan }: { u: UrlEntry; colSpan: number }) {
  const lg = u.latest;
  const grid: Array<{ k: string; v: string }> = [
    { k: "verdict", v: lg.verdict ?? "—" },
    { k: "indexing state", v: lg.coverageState ?? "—" },
    { k: "google canonical", v: lg.googleCanonical ?? "—" },
    { k: "user canonical", v: lg.userCanonical ?? "—" },
    { k: "robots", v: lg.robots ?? "—" },
    { k: "fetch state", v: lg.pageFetchState ?? "—" },
    { k: "first seen", v: fmtDate(u.firstSeen) },
    { k: "last seen", v: fmtDate(u.lastSeen) },
    {
      k: "clicks / impressions",
      v: u.analytics
        ? `${u.analytics.clicks ?? 0} / ${u.analytics.impressions ?? 0}`
        : "—",
    },
  ].filter((x) => x.v !== "" && x.v !== "—" && x.v !== null);

  const hist = (u.history ?? []).map((h: Snapshot, i: number) => (
    <tr key={i} className="border-b border-neutral-800/70">
      <td className="p-2 pl-4 text-xs text-neutral-400">{fmtDate(h.at)}</td>
      <td className="p-2 text-xs">
        {h.coverageState ? <Tag id={stateKey(h.coverageState)!} /> : "—"}
      </td>
      <td className="p-2 text-xs">{h.httpStatus ?? "?"}</td>
      <td className="p-2 text-xs">
        {h.isSelfCanonical === false
          ? "✗"
          : h.isSelfCanonical === true
            ? "✓"
            : "—"}
      </td>
      <td className="p-2 text-xs">{h.hreflangCount ?? 0}</td>
    </tr>
  ));

  return (
    <td colSpan={colSpan} className="bg-neutral-900/60">
      <div className="p-4 pl-6">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {grid.map(({ k, v }) => (
            <div
              key={k}
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2"
            >
              <div className="text-[10px] uppercase tracking-wide text-neutral-500">
                {k}
              </div>
              <div className="mt-0.5 break-all text-xs text-neutral-200">
                {v}
              </div>
            </div>
          ))}
        </div>
        {hist.length > 0 && (
          <div className="mt-3 max-h-52 overflow-auto rounded-lg border border-neutral-800">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-neutral-900">
                <tr className="text-[10px] uppercase tracking-wide text-neutral-500">
                  <th className="p-2 pl-4">run time</th>
                  <th className="p-2">coverage</th>
                  <th className="p-2">http</th>
                  <th className="p-2">self-canonical</th>
                  <th className="p-2">hreflang</th>
                </tr>
              </thead>
              <tbody>{hist}</tbody>
            </table>
          </div>
        )}
      </div>
    </td>
  );
}

function UrlRow({
  url,
  u,
  expanded,
  onToggle,
  withFix = false,
  fixingText,
  onFix,
  colSpan,
}: {
  url: string;
  u: UrlEntry;
  expanded: boolean;
  onToggle: () => void;
  withFix?: boolean;
  fixingText?: string;
  onFix?: (url: string) => void;
  colSpan: number;
}) {
  const lg = u.latest;
  const issue = issueOf(u);
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-neutral-800/70 hover:bg-neutral-900/60"
      >
        <td className="p-2 pl-4 font-mono text-xs break-all text-sky-300">
          {decodeURI(url)}
        </td>
        <td className="p-2">
          {issue ? <Tag id={issue} /> : <Tag id="healthy" />}
        </td>
        <td className="p-2 text-xs text-neutral-300">{lg.httpStatus ?? "?"}</td>
        <td className="p-2 text-xs">
          {lg.coverageState ? <Tag id={stateKey(lg.coverageState)!} /> : "—"}
        </td>
        <td className="p-2 text-xs">
          {lg.isSelfCanonical === false ? "✗" : "✓"}
        </td>
        <td className="p-2 text-xs">{lg.hreflangCount ?? 0}</td>
        <td className="p-2 text-xs text-neutral-400">
          {fmtDate(lg.lastCrawlTime || lg.at)}
        </td>
        <td className="p-2 text-xs text-neutral-500">
          {u.history?.length ?? 1}
        </td>
        {withFix && onFix && (
          <td className="p-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFix(url);
              }}
              className="inline-flex items-center gap-1 rounded-md border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold text-sky-300 transition hover:bg-sky-500/25"
            >
              {fixingText === url
                ? "Opening…"
                : fixingText
                  ? "✓ opened"
                  : "Fix"}
            </button>
          </td>
        )}
      </tr>
      {expanded && (
        <tr className="border-b border-neutral-800/70">
          <DetailBox u={u} colSpan={colSpan} />
        </tr>
      )}
    </>
  );
}

export default function Dashboard({ ledger }: { ledger: Ledger }) {
  const entries = useMemo(
    () =>
      Object.entries(ledger.urls ?? {}).filter(
        ([, u]) => !u.removed, // sitemap se hata di gayi legacy URLs (intended 404) — stats mein count nahi karte
      ),
    [ledger.urls],
  );
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [fixing, setFixing] = useState<Record<string, string>>({});
  const [attQuery, setAttQuery] = useState("");
  const [attState, setAttState] = useState("");
  const [allQuery, setAllQuery] = useState("");
  const [allState, setAllState] = useState("");

  const toggle = (url: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  };

  const requestFix = async (url: string) => {
    setFixing((m) => ({ ...m, [url]: "opening" }));
    try {
      const res = await fetch("/api/fix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setFixing((m) => ({ ...m, [url]: "done" }));
      } else {
        setFixing((m) => ({ ...m, [url]: "err" }));
        console.error("fix failed:", data?.error ?? res.status);
      }
    } catch (e) {
      setFixing((m) => ({ ...m, [url]: "err" }));
      console.error("fix request failed:", e);
    }
  };

  const stats = useMemo(() => {
    let healthy = 0;
    let attention = 0;
    let notFound = 0;
    let impressions = 0;
    const dist = new Map<string, number>();
    for (const [, u] of entries) {
      const issue = issueOf(u);
      if (issue === "NOT_FOUND") notFound += 1;
      if (issue) {
        attention += 1;
        const label = STATE_UI[issue]?.label ?? issue;
        dist.set(label, (dist.get(label) ?? 0) + 1);
      } else {
        healthy += 1;
        dist.set("Healthy / indexed", (dist.get("Healthy / indexed") ?? 0) + 1);
      }
      impressions += u.analytics?.impressions ?? 0;
    }
    return { healthy, attention, notFound, impressions, dist };
  }, [entries]);

  const stateOptions = useMemo(() => {
    const set = new Set<string>(["healthy"]);
    for (const [, u] of entries) {
      const issue = issueOf(u);
      if (issue && !set.has(issue)) set.add(issue);
    }
    return [...set].sort();
  }, [entries]);

  const selectCls =
    "rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-200 outline-none focus:border-sky-500";
  const inputCls =
    "w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-200 outline-none placeholder:text-neutral-500 focus:border-sky-500";

  const matches = (url: string, u: UrlEntry, q: string, s: string) => {
    const issue = issueOf(u);
    const okState = s === "" || (s === "healthy" ? !issue : issue === s);
    return decodeURI(url).toLowerCase().includes(q.toLowerCase()) && okState;
  };

  const attRows = entries.filter(
    ([url, u]) => issueOf(u) && matches(url, u, attQuery, attState),
  );
  const allRows = entries.filter(([url, u]) =>
    matches(url, u, allQuery, allState),
  );

  const headCells = [
    "URL",
    "status",
    "http",
    "coverage",
    "canonical",
    "hreflang",
    "last crawl",
    "runs",
  ];

  const thCls = "p-2 pl-4";
  const thClsR = "p-2";

  const renderHead = (extra?: string) => (
    <tr className="text-left text-[10px] uppercase tracking-wider text-neutral-500">
      {headCells.map((h, i) => (
        <th key={h} className={i === 0 ? thCls : thClsR}>
          {h}
        </th>
      ))}
      {extra && <th className={thClsR}>{extra}</th>}
    </tr>
  );

  const emptyRow = (cols: number) => (
    <tr>
      <td colSpan={cols} className="p-6 text-center text-sm text-neutral-500">
        Koi matching rows nahi. 🎉
      </td>
    </tr>
  );

  const attentionCols = headCells.length + 1;

  const maxDist = Math.max(1, ...stats.dist.values());

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold sm:text-2xl">
            Servchip{" "}
            <span className="text-neutral-500">— Search Console Dashboard</span>
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            Local tool ka dashboard — public site ka hissa nahi
            (localhost:3200).
          </p>
        </div>
        <div className="text-right text-xs leading-5 text-neutral-500">
          updated{" "}
          <span className="font-medium text-neutral-200">
            {fmtDate(ledger.updatedAt)}
          </span>
          <br />
          {ledger.property} · mode:{" "}
          <span className="text-neutral-200">{ledger.mode}</span>
        </div>
      </header>

      {/* KPI cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {[
          { label: "Sitemap URLs", value: entries.length, cls: "text-sky-400" },
          { label: "Healthy", value: stats.healthy, cls: "text-emerald-400" },
          {
            label: "Needs attention",
            value: stats.attention,
            cls: "text-amber-400",
          },
          { label: "HTTP 404", value: stats.notFound, cls: "text-rose-400" },
          {
            label: "Impressions (28d)",
            value: stats.impressions.toLocaleString(),
            cls: "text-neutral-100",
          },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"
          >
            <div className="text-[11px] uppercase tracking-wide text-neutral-500">
              {c.label}
            </div>
            <div className={`mt-1 text-2xl font-bold ${c.cls}`}>{c.value}</div>
          </div>
        ))}
      </div>
      {(() => {
        const removed = Object.values(ledger.urls ?? {}).filter(
          (u) => u.removed,
        ).length;
        if (!removed) return null;
        return (
          <p className="mt-2 text-[11px] text-neutral-500">
            ℹ️ {removed} URLs sitemap mein nahi hain (intended 404 — phantom
            countries hata diye gaye) — stats mein exclude hain, history ke liye
            sirf ledger mein rakhe gaye.
          </p>
        );
      })()}

      {/* Distribution */}
      <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900">
        <h2 className="border-b border-neutral-800 px-4 py-3 text-sm font-semibold text-neutral-200">
          Coverage distribution
        </h2>
        <div className="space-y-2 p-4">
          {[...stats.dist.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => {
              const meta = STATE_UI[k] ?? { tone: "blue" as Tone };
              const col: Record<Tone, string> = {
                green: "bg-emerald-500",
                yellow: "bg-amber-500",
                red: "bg-rose-500",
                gray: "bg-neutral-600",
                blue: "bg-sky-500",
                purple: "bg-purple-500",
              };
              return (
                <div key={k} className="flex items-center gap-3">
                  <div className="w-44 truncate px-1 font-mono text-xs text-neutral-300">
                    {k}
                  </div>
                  <div className="h-4 flex-1 overflow-hidden rounded bg-neutral-800">
                    <div
                      className={`h-full rounded ${col[meta.tone]}`}
                      style={{ width: `${Math.round((v / maxDist) * 100)}%` }}
                    />
                  </div>
                  <div className="w-10 text-right text-xs text-neutral-500">
                    {v}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Needs attention */}
      <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900">
        <h2 className="border-b border-neutral-800 px-4 py-3 text-sm font-semibold text-neutral-200">
          Needs attention
        </h2>
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 p-3">
          <input
            className={inputCls + " max-w-sm"}
            placeholder="Search URL…"
            value={attQuery}
            onChange={(e) => setAttQuery(e.target.value)}
          />
          <select
            className={selectCls}
            value={attState}
            onChange={(e) => setAttState(e.target.value)}
          >
            <option value="">all states</option>
            {stateOptions
              .filter((s) => s !== "healthy")
              .map((s) => (
                <option key={s} value={s}>
                  {STATE_UI[s]?.label ?? s}
                </option>
              ))}
          </select>
        </div>
        <div className="max-h-[480px] overflow-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-neutral-900/95">
              {renderHead("fix")}
            </thead>
            <tbody>
              {attRows.length === 0
                ? emptyRow(attentionCols)
                : attRows.map(([url, u]) => (
                    <UrlRow
                      key={url}
                      url={url}
                      u={u}
                      expanded={expanded.has(url)}
                      onToggle={() => toggle(url)}
                      withFix
                      fixingText={fixing[url]}
                      onFix={requestFix}
                      colSpan={attentionCols}
                    />
                  ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-neutral-800 px-4 py-3 text-xs leading-5 text-neutral-500">
          <span className="font-semibold text-sky-400">Fix</span> → local
          PowerShell window khulti hai,{" "}
          <code className="rounded bg-neutral-800 px-1.5 py-0.5">
            frontend/
          </code>{" "}
          folder mein{" "}
          <code className="rounded bg-neutral-800 px-1.5 py-0.5">opencode</code>{" "}
          <span className="text-neutral-300">Plan mode</span> mein is problem ke
          brief ke saath start hota hai. Plan approve karne ke liye agent ko
          plan bana kar batane do, phir{" "}
          <span className="text-neutral-300">Shift+Tab</span> se Build agent par
          jao aur fix apply karwao. OpenCode sir isi machine par chalta hai —
          live site par kabhi nahi.
        </p>
      </section>

      {/* All URLs */}
      <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900">
        <h2 className="border-b border-neutral-800 px-4 py-3 text-sm font-semibold text-neutral-200">
          All URLs <span className="text-neutral-500">({entries.length})</span>
        </h2>
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 p-3">
          <input
            className={inputCls + " max-w-sm"}
            placeholder="Search URL…"
            value={allQuery}
            onChange={(e) => setAllQuery(e.target.value)}
          />
          <select
            className={selectCls}
            value={allState}
            onChange={(e) => setAllState(e.target.value)}
          >
            <option value="">all states</option>
            {stateOptions.map((s) => (
              <option key={s} value={s}>
                {s === "healthy"
                  ? "Healthy / indexed"
                  : (STATE_UI[s]?.label ?? s)}
              </option>
            ))}
          </select>
        </div>
        <div className="max-h-[560px] overflow-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-neutral-900/95">
              {renderHead()}
            </thead>
            <tbody>
              {allRows.length === 0
                ? emptyRow(headCells.length)
                : allRows.map(([url, u]) => (
                    <UrlRow
                      key={url}
                      url={url}
                      u={u}
                      expanded={expanded.has(url)}
                      onToggle={() => toggle(url)}
                      colSpan={headCells.length}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to use */}
      <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-400">
        <h2 className="mb-2 text-sm font-semibold text-neutral-200">
          Kaise use kare
        </h2>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Data refresh:{" "}
            <code className="rounded bg-neutral-800 px-1.5 py-0.5 text-neutral-100">
              node gsc-dashboard/report.mjs
            </code>{" "}
            (Google index status ke liye{" "}
            <code className="rounded bg-neutral-800 px-1.5 py-0.5 text-neutral-100">
              gsc-dashboard/.env
            </code>{" "}
            mein credentials)
          </li>
          <li>Ye page refresh karo — dashboard naya ledger.json dikhayega.</li>
          <li>
            Issue fix: problem row ke <span className="text-sky-400">Fix</span>{" "}
            button par click → opencode Plan mode (frontend folder) → plan
            approve → Build agent se fix → tests.
          </li>
          <li>
            Har fix + deploy ke baad{" "}
            <code className="rounded bg-neutral-800 px-1.5 py-0.5 text-neutral-100">
              node gsc-dashboard/notify.mjs
            </code>{" "}
            sitemap re-submit karta hai taaki Google re-crawl kare.
          </li>
          <li>
            Kisi bhi URL par click karo — uski poori history dekho (kaisi badli
            over time).
          </li>
        </ol>
      </section>
    </div>
  );
}
