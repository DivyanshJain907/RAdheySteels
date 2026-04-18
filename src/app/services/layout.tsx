import type { Metadata } from "next";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  title: "Steel Supply Services in Kanpur | Radhey Raman Steel Suppliers",
  description:
    "Explore steel supply services including TMT bars, structurals, pipes, bulk supply, and consultation in Kanpur and across Uttar Pradesh.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Steel Supply Services in Kanpur | Radhey Raman Steel Suppliers",
    description:
      "TMT bars, structurals, pipes, and bulk steel supply services for residential, commercial, and industrial projects.",
    url: `${siteUrl}/services`,
    type: "website",
    siteName: "Radhey Raman Steel Suppliers",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Supply Services in Kanpur | Radhey Raman Steel Suppliers",
    description:
      "Bulk steel supply and consultation services in Kanpur and Uttar Pradesh.",
    images: ["/logo.png"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
