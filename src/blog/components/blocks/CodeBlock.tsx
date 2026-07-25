"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function BlogCodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-xl border border-border bg-bg-dark overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface/50">
        <span className="text-[11px] font-mono text-text-dim uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-text-dim hover:text-text transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-text-muted leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
