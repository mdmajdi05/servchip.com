"use client";

import { Lightbulb, AlertTriangle, Info } from "lucide-react";

const config = {
  tip: {
    icon: Lightbulb,
    bg: "bg-amber/5",
    border: "border-amber/20",
    text: "text-amber",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-error/5",
    border: "border-error/20",
    text: "text-error",
  },
  info: {
    icon: Info,
    bg: "bg-primary/5",
    border: "border-primary/20",
    text: "text-primary",
  },
};

export function BlogCallout({
  variant,
  text,
}: {
  variant: "tip" | "warning" | "info";
  text: string;
}) {
  const c = config[variant];
  const Icon = c.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg} ${c.border} my-6`}
    >
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${c.text}`} />
      <p className="text-sm text-text-muted leading-relaxed">{text}</p>
    </div>
  );
}
