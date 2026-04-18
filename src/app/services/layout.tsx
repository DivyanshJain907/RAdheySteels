import type { Metadata } from "next";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  title: "Construction Steel Supplier Near Me | Steel Services in Kanpur",
  description:
    "Explore steel supply services in Kanpur including TMT bars, MS angle, MS channel, structurals, roofing sheets, and bulk project delivery from an authorised SAIL/RINL dealer.",
  keywords: [
    "Construction steel supplier near me",
    "steel supplier in Kanpur",
    "MS steel supplier near me",
    "building material supplier Kanpur",
    "RINL steel distributor near me",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Construction Steel Supplier Near Me | Steel Services in Kanpur",
    description:
      "Kanpur steel supply services for TMT bars, MS angle, MS channel, roofing sheets, and bulk requirements.",
    url: `${siteUrl}/services`,
    type: "website",
    siteName: "Radhey Raman Steel Suppliers",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Steel Supplier Near Me | Steel Services in Kanpur",
    description:
      "Steel services in Kanpur for construction projects with fast supply and competitive rates.",
    images: ["/logo.png"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
