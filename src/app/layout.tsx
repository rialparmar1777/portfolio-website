import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description: "A creative portfolio showcasing innovative web development and design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className="bg-black text-white">
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}