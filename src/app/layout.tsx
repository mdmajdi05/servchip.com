import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ColorProvider } from "@/providers/ColorProvider";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
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

const baseUrl = "https://servchip.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Servchip — Authorized NVIDIA Distributor",
    default: "Servchip — Authorized NVIDIA Chip Distributor & Technology Partner",
  },
  description:
    "Premium distributor of authentic NVIDIA chips — H100, H200, B200, RTX 6000 Ada, AI accelerators, networking & more. Global delivery, enterprise support.",
  keywords: [
    "NVIDIA distributor",
    "NVIDIA chips",
    "H100",
    "H200",
    "B200",
    "RTX 6000 Ada",
    "AI GPUs",
    "data center GPUs",
    "GPU distributor",
    "enterprise GPU",
    "AI hardware",
  ],
  authors: [{ name: "Servchip Inc." }],
  creator: "Servchip Inc.",
  publisher: "Servchip Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Servchip",
    title: "Servchip — Authorized NVIDIA Chip Distributor",
    description:
      "Premium distributor of authentic NVIDIA chips. Global delivery, enterprise support.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servchip — Authorized NVIDIA Distributor",
    description:
      "Premium distributor of authentic NVIDIA chips. Global delivery, enterprise support.",
    images: ["/og-image.png"],
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
    apple: "/apple-touch-icon.png",
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
        <script
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-bg-body text-text antialiased`}>
        <ThemeProvider>
          <ColorProvider>
            <QueryProvider>
              <TopBar />
              <Header />
              <main>{children}</main>
              <Footer />
            </QueryProvider>
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
