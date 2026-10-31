import { Suspense } from "react";
import { Instrument_Serif, Poppins } from "next/font/google";
import { AnnouncementBar } from "@/components/ads/announcement-bar";
import { EventPromo } from "@/components/ads/event-promo";
import { PromoPopup } from "@/components/ads/promo-popup";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/content/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | 3SC",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@3SCIndia",
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${instrument.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-brand-500 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Suspense fallback={null}>
          <PromoPopup />
          <EventPromo />
        </Suspense>
      </body>
    </html>
  );
}
