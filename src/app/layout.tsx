import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Best Steel Supplier in Kanpur | TMT Bars, Structurals, Pipes",
    template: "%s | Radhey Raman Steel Suppliers",
  },
  description: "Radhey Raman Steel Suppliers is a trusted steel supplier in Kanpur for TMT bars, MS angle, MS channel, roofing sheets, and bulk construction steel. Authorised dealer of Steel Authority of India Limited (SAIL) and Rashtriya Ispat Nigam Limited (RINL).",
  applicationName: "Radhey Raman Steel Suppliers",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Radhey Raman Steel Suppliers",
    "TMT bars supplier in Kanpur",
    "Best steel supplier in Kanpur",
    "SAIL steel dealer in Kanpur",
    "RINL steel distributor near me",
    "MS angle supplier Kanpur",
    "MS channel dealer Kanpur",
    "Roofing sheet supplier Kanpur",
    "Iron and steel wholesaler Kanpur",
    "TMT bars price today Kanpur",
    "Construction steel supplier near me",
    "steel supplier Kanpur",
    "steel shop near me",
    "iron shop in Kanpur",
    "TMT bar dealer near me",
    "MS steel supplier near me",
    "sariya shop in Kanpur",
    "steel market in Kanpur",
    "building material supplier Kanpur",
    "TMT bars Kanpur",
    "MS plates supplier",
    "steel wholesale Uttar Pradesh",
    "Steel Authority of India Limited dealer",
    "Rashtriya Ispat Nigam Limited dealer",
  ],
  authors: [{ name: "Radhey Raman Steel Suppliers" }],
  creator: "Radhey Raman Steel Suppliers",
  publisher: "Radhey Raman Steel Suppliers",
  category: "Steel Supplier",
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
    title: "Best Steel Supplier in Kanpur | TMT Bars, Structurals, Pipes",
    description: "Trusted steel supplier in Kanpur for TMT bars, MS angle, MS channel, roofing sheets, and bulk supply. Authorised dealer of Steel Authority of India Limited (SAIL) and Rashtriya Ispat Nigam Limited (RINL).",
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
    title: "Best Steel Supplier in Kanpur | TMT Bars, Structurals, Pipes",
    description: "Kanpur steel supplier for TMT bars, MS angle, MS channel, and roofing sheets. Authorised SAIL and RINL dealer.",
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
        "description": "Steel supplier in Kanpur for TMT bars, MS angle, MS channel, and roofing sheets. Authorised dealer of Steel Authority of India Limited (SAIL) and Rashtriya Ispat Nigam Limited (RINL).",
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
        "description": "Construction steel supplier near me in Kanpur for TMT bars, MS sections, and roofing sheets. Authorised SAIL and RINL dealer.",
        "telephone": "+91-7905245645",
        "areaServed": "Uttar Pradesh",
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
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/products?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        },
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
      </head>
      <body className="bg-white text-gray-700 pt-16 md:pt-32">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
