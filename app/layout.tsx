import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"]
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "CUIVRÉ",
  description:
    "A considered copper peptide moisturizer built with GHK-Cu, ceramides, and shea butter."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
