import type { Metadata } from "next";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  title: "Request Steel Quote | Radhey Raman Steel Suppliers",
  description:
    "Request a competitive quote for TMT bars, structurals, pipes, and other steel products with quick response and reliable supply.",
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Request Steel Quote | Radhey Raman Steel Suppliers",
    description:
      "Get fast, competitive quotations for steel products and bulk requirements in Kanpur and Uttar Pradesh.",
    url: `${siteUrl}/quote`,
    type: "website",
    siteName: "Radhey Raman Steel Suppliers",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Steel Quote | Radhey Raman Steel Suppliers",
    description:
      "Submit your requirement and receive a fast steel quotation.",
    images: ["/logo.png"],
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
