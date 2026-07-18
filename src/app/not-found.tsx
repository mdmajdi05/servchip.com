import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { NotFoundContent } from "@/components/ui/NotFoundContent";

export const metadata: Metadata = {
  title: `404 — Page Not Found | ${SITE.name}`,
  description:
    "The page you are looking for does not exist or has been moved. Browse enterprise chips, AI accelerators, and semiconductor procurement solutions at Servchip.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
