interface GtagConfig {
  page_path?: string;
  [key: string]: unknown;
}

interface Window {
  gtag: (
    command: "config" | "set" | "js" | "event",
    targetId: string,
    config?: GtagConfig,
  ) => void;
  dataLayer: unknown[];
}
