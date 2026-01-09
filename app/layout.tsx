import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { ScrollAwareDock } from "@/components/scroll-aware-dock";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edward Diesta",
  description: "Portfolio of Edward Diesta",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Edward Diesta",
    description: "Portfolio of Edward Diesta",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Edward Diesta Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edward Diesta",
    description: "Portfolio of Edward Diesta",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white`}
      >
        {children}
        <Footer />
        <ScrollAwareDock />
      </body>
    </html>
  );
}
