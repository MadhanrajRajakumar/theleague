import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["800"],
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0D0D0D] text-[#8A8880] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
