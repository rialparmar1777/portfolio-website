import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundaryWrapper from "./components/ErrorBoundaryWrapper";
import { useThemeStyles } from "./hooks/useThemeStyles";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rialparmar.vercel.app'),
  title: "Rial Parmar | Full Stack Developer",
  description: "Portfolio of Rial Parmar, a passionate Full Stack Developer specializing in modern web technologies and creating exceptional digital experiences.",
  keywords: "Full Stack Developer, Web Development, React, Next.js, TypeScript, Portfolio",
  authors: [{ name: "Rial Parmar" }],
  creator: "Rial Parmar",
  publisher: "Rial Parmar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rialparmar.vercel.app",
    title: "Rial Parmar | Full Stack Developer",
    description: "Portfolio of Rial Parmar, a passionate Full Stack Developer specializing in modern web technologies and creating exceptional digital experiences.",
    siteName: "Rial Parmar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rial Parmar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rial Parmar | Full Stack Developer",
    description: "Portfolio of Rial Parmar, a passionate Full Stack Developer specializing in modern web technologies and creating exceptional digital experiences.",
    images: ["/og-image.jpg"],
    creator: "@rialparmar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth overflow-x-hidden`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-black text-white antialiased">
        <ErrorBoundaryWrapper>
          <ThemeProvider>
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
          </ThemeProvider>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}