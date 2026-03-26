import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://radhey-steels.vercel.app"),
  title: "Radhey Raman Steel Suppliers- Premium Steel Products",
  description: "Authorized RINL/SAIL dealer - Premium steel products and solutions since 1979",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Radhey Raman Steel Suppliers- Premium Steel Products",
    description: "Authorized RINL/SAIL dealer - Premium steel products and solutions since 1979",
    images: [
      {
        url: "/logo.png",
        width: 200,
        height: 200,
        alt: "Radhey Raman Steels Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-700 pt-16 md:pt-32">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
