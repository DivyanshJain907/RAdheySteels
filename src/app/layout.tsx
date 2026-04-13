import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Radhey Raman Steel Suppliers | Authorised SAIL/RINL Dealer in Uttar Pradesh",
    template: "%s | Radhey Raman Steel Suppliers",
  },
  description: "Authorised dealer of SAIL/RINL in Uttar Pradesh. Competitive prices, fast delivery. TMT rebars, MS plates, angles, channels - all your steel requirements since decade.",
  applicationName: "Radhey Raman Steel Suppliers",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Radhey Raman Steel Suppliers",
    "SAIL dealer Uttar Pradesh",
    "RINL dealer Uttar Pradesh",
    "steel supplier Kanpur",
    "TMT bars Kanpur",
    "MS plates supplier",
    "steel wholesale Uttar Pradesh",
  ],
  authors: [{ name: "Radhey Raman Steel Suppliers" }],
  creator: "Radhey Raman Steel Suppliers",
  publisher: "Radhey Raman Steel Suppliers",
  category: "Steel Supplier",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  verification: {
    google: "google7335ea3e6df0c5c0",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Radhey Raman Steel Suppliers",
    title: "Radhey Raman Steel Suppliers | Authorised SAIL/RINL Dealer in Uttar Pradesh",
    description: "Authorised dealer of SAIL/RINL in Uttar Pradesh. Competitive prices, fast delivery. TMT rebars, MS plates, angles, channels - all your steel requirements since decade.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Radhey Raman Steel Suppliers Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radhey Raman Steel Suppliers | Authorised SAIL/RINL Dealer in Uttar Pradesh",
    description: "Authorised dealer of SAIL/RINL in Uttar Pradesh. Competitive prices, fast delivery.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EA580C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Radhey Raman Steel Suppliers",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "description": "Authorised dealer of SAIL/RINL in Uttar Pradesh. Competitive prices, fast delivery.",
        "telephone": "+91-7905245645",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kanpur",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        },
        "areaServed": "Uttar Pradesh"
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        "name": "Radhey Raman Steel Suppliers",
        "url": siteUrl,
        "image": `${siteUrl}/logo.png`,
        "description": "Authorised dealer of SAIL/RINL in Uttar Pradesh.",
        "telephone": "+91-7905245645",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kanpur",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        },
        "priceRange": "$$"
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Radhey Raman Steel Suppliers",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18052344301"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18052344301');
          `}
        </Script>

        {/* JSON-LD Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        
        {/* Preload Google Fonts to avoid render blocking */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Georgia:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-700 pt-16 md:pt-32">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
