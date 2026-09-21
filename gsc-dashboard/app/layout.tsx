import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Servchip — Search Console Dashboard",
  description:
    "Local index-coverage dashboard for servchip.com (not part of the public site).",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
