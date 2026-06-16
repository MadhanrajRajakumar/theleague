import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THE LEAGUE | Identity Engine",
  description: "Discover your archetype, uncover your biggest limitation, and join ambitious people building stronger lives.",
  openGraph: {
    title: "THE LEAGUE | Identity Engine",
    description: "Discover your archetype, uncover your biggest limitation, and join ambitious people building stronger lives.",
    url: "https://theleague.app",
    siteName: "THE LEAGUE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE LEAGUE | Identity Engine",
    description: "Discover your archetype, uncover your biggest limitation, and join ambitious people building stronger lives.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FAFAF8] text-[#111111] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
