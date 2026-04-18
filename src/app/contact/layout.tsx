import type { Metadata } from "next";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  title: "Contact Steel Supplier in Kanpur | Radhey Raman Steel Suppliers",
  description:
    "Get in touch for steel requirements, product pricing, bulk orders, and delivery support in Kanpur and Uttar Pradesh.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Steel Supplier in Kanpur | Radhey Raman Steel Suppliers",
    description:
      "Contact Radhey Raman Steel Suppliers for pricing, availability, and delivery support.",
    url: `${siteUrl}/contact`,
    type: "website",
    siteName: "Radhey Raman Steel Suppliers",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Steel Supplier in Kanpur | Radhey Raman Steel Suppliers",
    description:
      "Connect for steel quotes, product details, and order assistance.",
    images: ["/logo.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
