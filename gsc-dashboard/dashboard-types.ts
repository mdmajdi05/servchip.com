export interface Snapshot {
  at: string;
  httpStatus: number | null;
  robots: string | null;
  isSelfCanonical: boolean | null;
  hreflangCount: number;
  pageFetchState: string | null;
  coverageState: string | null;
  verdict: string | null;
  googleCanonical: string | null;
  userCanonical: string | null;
  lastCrawlTime: string | null;
}

export interface UrlEntry {
  firstSeen: string;
  lastSeen: string;
  history: Snapshot[];
  latest: Snapshot;
  analytics: {
    clicks: number;
    impressions: number;
    position: number | null;
  } | null;
}

export interface Ledger {
  updatedAt: string | null;
  property: string;
  mode: string;
  urls: Record<string, UrlEntry>;
}
