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
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: `%s | ${SITE.name}`,
    default: SITE.defaultTitle,
  },
  description: SITE.defaultDescription,
  keywords: [...SITE.defaultKeywords],
  authors: [{ name: SITE.companyName }],
  creator: SITE.companyName,
  publisher: SITE.companyName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
    description:
      "ISO 9001 certified enterprise chip distributor. Buy NVIDIA H100/H200/B200, AMD MI300X, Intel Xeon & Gaudi 3. Global shipping from India & UAE to 150+ countries.",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip — Enterprise Chip Distributor",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
    description:
      "ISO 9001 certified enterprise chip distributor. Buy NVIDIA H100, AMD MI300X, Intel Xeon & Gaudi 3. Semiconductor procurement & data center GPU distributor.",
    images: [{ url: OG_IMAGE, alt: "Servchip — Enterprise Chip Distributor" }],
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
    "geo.region": SITE.geo.region,
    "geo.placename": SITE.geo.placename,
    "geo.position": SITE.geo.position,
    ICBM: SITE.geo.position,
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
        {/* Hreflang */}
        <link rel="alternate" href={SITE.url} hrefLang="en-in" />
        <link rel="alternate" href={SITE.url} hrefLang="en-ae" />
        <link rel="alternate" href={SITE.url} hrefLang="en" />
        <link rel="alternate" href={SITE.url} hrefLang="x-default" />
        {/* Preconnect hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* GA */}
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
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={organizationSchema()}
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-none"
        >
          Skip to main content
        </a>
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
