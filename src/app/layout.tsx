import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rial Parmar | Full Stack Developer",
  description: "An Accomplished Full Stack Developer with expertise in both Front-End and Back-End Technologies. View my portfolio to see my latest projects and skills.",
  keywords: "Rial Parmar, Full Stack Developer, Web Developer, Software Engineer, React, Node.js, TypeScript",
  authors: [{ name: "Rial Parmar" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rialparmar.dev",
    siteName: "Rial Parmar Portfolio",
    title: "Rial Parmar | Full Stack Developer",
    description: "An Accomplished Full Stack Developer with expertise in both Front-End and Back-End Technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rial Parmar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rial Parmar | Full Stack Developer",
    description: "An Accomplished Full Stack Developer with expertise in both Front-End and Back-End Technologies.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-black text-white antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(0, 0, 0, 0.9)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}