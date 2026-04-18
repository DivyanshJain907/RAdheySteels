import type { Metadata } from "next";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  title: "About Us | Radhey Raman Steel Suppliers",
  description:
    "Learn about Radhey Raman Steel Suppliers, trusted SAIL/RINL authorized steel supplier serving Kanpur and Uttar Pradesh with quality products and reliable service.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Radhey Raman Steel Suppliers",
    description:
      "Learn about Radhey Raman Steel Suppliers, trusted SAIL/RINL authorized steel supplier serving Kanpur and Uttar Pradesh.",
    url: `${siteUrl}/about`,
    type: "website",
    siteName: "Radhey Raman Steel Suppliers",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Radhey Raman Steel Suppliers",
    description:
      "Trusted steel supplier in Kanpur and Uttar Pradesh with a focus on quality and on-time delivery.",
    images: ["/logo.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
