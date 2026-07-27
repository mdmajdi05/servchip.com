import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ColorProvider } from "@/providers/ColorProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadGenProviders } from "@/components/lead-gen/LeadGenProviders";
import { GAClient } from "@/components/shared/GAClient";
import { SITE } from "@/lib/constants";
import { OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: `%s | ${SITE.name} — Enterprise Chip Distributor`,
    default: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers | Buy NVIDIA H100, AMD MI300X, Intel Xeon`,
  },
  description:
    "ISO 9001 certified enterprise chip distributor supplying NVIDIA H100, AMD Instinct MI300X, Intel Xeon & Gaudi 3 accelerators. Buy AI chips, semiconductor procurement & data center hardware with global shipping.",
  keywords: [
    "enterprise chip distributor",
    "buy AI chips",
    "semiconductor procurement",
    "NVIDIA H100 distributor India",
    "AMD Instinct distributor",
    "data center GPU distributor",
    "AI infrastructure provider",
    "GPU server supplier",
    "AI accelerator distributor",
    "enterprise IT hardware supplier",
    "HPC hardware solutions",
    "server components wholesale",
    "bulk semiconductor purchasing",
    "HBM memory supplier",
    "data center hardware procurement",
    "enterprise AI hardware India",
    "NVIDIA distributor",
    "AMD distributor",
    "Intel distributor",
    "AI accelerators",
    "data center GPUs",
    "enterprise GPU",
    "ISO 9001 certified IT distributor",
    "enterprise chip sourcing",
  ],
  authors: [{ name: "Servchip Inc." }],
  creator: "Servchip Inc.",
  publisher: "Servchip Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
    description:
      "ISO 9001 certified enterprise chip distributor. Buy NVIDIA H100, AMD MI300X, Intel Xeon. Semiconductor procurement & data center GPU distributor with global shipping.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip — Enterprise Chip Distributor for AI, HPC & Data Centers",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
    description:
      "ISO 9001 certified enterprise chip distributor. Buy NVIDIA H100, AMD MI300X, Intel Xeon. Semiconductor procurement & data center hardware.",
    images: [OG_IMAGE],
    site: "@servchip",
    creator: "@servchip",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="fXyQ-7TkmRajJRw1z6CixmK1zspDKkhBgmgUgFJF42k"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W9W5CX2KPN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W9W5CX2KPN');
          `}
        </Script>
        <link
          rel="preload"
          as="image"
          href="/images/server-room-1.webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={organizationSchema()}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={localBusinessSchema()}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={websiteSchema()}
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('servchip-theme');
                  if (t === 'dark') document.documentElement.classList.add('dark');
                  else document.documentElement.classList.remove('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-bg-body text-text antialiased`}
      >
        <ThemeProvider>
          <ColorProvider>
            <QueryProvider>
              <Header />
              <main id="main-content">{children}</main>
              <Footer />
              <LeadGenProviders />
              <GAClient />
            </QueryProvider>
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
