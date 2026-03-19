import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetalForge - Premium Metal Products",
  description: "Luxury metal products for demanding customers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">
        {children}
      </body>
    </html>
  );
}
