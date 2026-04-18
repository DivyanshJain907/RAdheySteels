import type { Metadata } from "next";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  title: "TMT Bars Supplier in Kanpur | MS Angle, MS Channel, Roofing Sheets",
  description:
    "Browse TMT bars, MS angle, MS channel, roofing sheets, pipes, and other steel products from a trusted iron and steel wholesaler in Kanpur.",
  keywords: [
    "TMT bars supplier in Kanpur",
    "TMT bars price today Kanpur",
    "MS angle supplier Kanpur",
    "MS channel dealer Kanpur",
    "Roofing sheet supplier Kanpur",
    "Iron and steel wholesaler Kanpur",
    "sariya shop in Kanpur",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "TMT Bars Supplier in Kanpur | MS Angle, MS Channel, Roofing Sheets",
    description:
      "Kanpur steel products: TMT bars, MS angle, MS channel, roofing sheets, pipes, and structural steel.",
    url: `${siteUrl}/products`,
    type: "website",
    siteName: "Radhey Raman Steel Suppliers",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TMT Bars Supplier in Kanpur | MS Angle, MS Channel, Roofing Sheets",
    description:
      "Find TMT bars, MS sections, and roofing sheets in Kanpur with competitive pricing.",
    images: ["/logo.png"],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
