import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.radheyramansteelsuppliers.in"),
  title: "Radhey Raman Steel Suppliers Kanpur",
  description: "Authorized SAIL/RINL dealer in Kanpur, Uttar Pradesh.competitive prices, fast delivery. TMT rebars, MS plates, angles, channels - all your steel requirements since 1979.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Radhey Raman Steel Suppliers Kanpur",
    description: "Authorized SAIL/RINL dealer in Kanpur, Uttar Pradesh.competitive prices, fast delivery. TMT rebars, MS plates, angles, channels - all your steel requirements since 1979.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Radhey Raman Steel Suppliers Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Radhey Raman Steel Suppliers",
    "url": "https://www.radheyramansteelsuppliers.in",
    "logo": "https://www.radheyramansteelsuppliers.in/logo.png",
    "description": "Authorized SAIL/RINL dealer in Kanpur, Uttar Pradesh.competitive prices, fast delivery.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kanpur",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "telephone": "+91-7905245645"
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
