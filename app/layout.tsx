import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* =========================
   SEO METADATA
========================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://lavelleventure.com"),

  title: {
    default: "Lavelle Venture | Premium Real Estate in Bangalore",
    template: "%s | Lavelle Venture",
  },

  description:
    "Lavelle Venture delivers premium real estate developments in Bangalore where peace meets modern architecture. Discover luxury villas, residential layouts, and high-return investment properties.",

  keywords: [
    "Lavelle Venture",
    "Real Estate Bangalore",
    "Luxury Villas Bangalore",
    "Modern Architecture Homes",
    "Residential Layouts",
    "Property Investment India",
    "Premium Housing Projects",
  ],

  authors: [{ name: "Lavelle Venture" }],
  creator: "Lavelle Venture",
  publisher: "Lavelle Venture",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" }, // MUST exist in /public
      { url: "/images/iconlogo.png", type: "image/png", sizes: "32x32" },
      { url: "/images/iconlogo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/iconlogo.png",
  },

  openGraph: {
    type: "website",
    url: "https://lavelleventure.com",
    siteName: "Lavelle Venture",
    title: "Lavelle Venture | Premium Real Estate in Bangalore",
    description:
      "Discover luxury villas and premium real estate projects by Lavelle Venture in Bangalore.",
    images: [
      {
        url: "https://lavelleventure.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lavelle Venture Premium Real Estate",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Lavelle Venture | Premium Real Estate",
    description:
      "Luxury real estate venture where peace meets modern architecture.",
    images: ["https://lavelleventure.com/images/og-image.jpg"],
  },

  alternates: {
    canonical: "https://lavelleventure.com",
  },

  category: "Real Estate",
};

/* =========================
   VIEWPORT
========================= */

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/* =========================
   ROOT LAYOUT
========================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 🔥 Google Organization Structured Data (For Logo in Search) */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lavelle Venture",
              url: "https://lavelleventure.com",
              logo: "https://lavelleventure.com/images/iconlogo.png",
              sameAs: [],
            }),
          }}
        />

        <Navbar />
        <FloatingContact />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}