import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Radhey Raman Steel Suppliers- Premium Steel Products",
  description: "Authorized RINL/SAIL dealer - Premium steel products and solutions since 1979",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-darkGray">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
