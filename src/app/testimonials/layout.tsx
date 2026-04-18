import type { Metadata } from "next";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

export const metadata: Metadata = {
  title: "Customer Testimonials | Radhey Raman Steel Suppliers",
  description:
    "Read customer testimonials for Radhey Raman Steel Suppliers and learn why builders and contractors trust our steel supply services.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Customer Testimonials | Radhey Raman Steel Suppliers",
    description:
      "See what customers say about our product quality, pricing, and delivery reliability.",
    url: `${siteUrl}/testimonials`,
    type: "website",
    siteName: "Radhey Raman Steel Suppliers",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Testimonials | Radhey Raman Steel Suppliers",
    description:
      "Customer feedback on steel product quality and service experience.",
    images: ["/logo.png"],
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
