import type { Metadata } from "next";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  title: "Steel Products | TMT Bars, Structurals, Pipes",
  description:
    "Browse steel products including TMT bars, MS plates, channels, angles, and pipes from Radhey Raman Steel Suppliers in Kanpur.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Steel Products | TMT Bars, Structurals, Pipes",
    description:
      "Quality steel products for builders and industries: TMT bars, structurals, MS plates, channels, and pipes.",
    url: `${siteUrl}/products`,
    type: "website",
    siteName: "Radhey Raman Steel Suppliers",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Products | TMT Bars, Structurals, Pipes",
    description:
      "Find quality steel products with competitive pricing and fast delivery.",
    images: ["/logo.png"],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
