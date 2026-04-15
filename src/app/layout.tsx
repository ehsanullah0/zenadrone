import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Preloader } from "../components/ui/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZenaDrone 1000 | Autonomous Drones for Inspection & Security",
  description: "ZenaDrone 1000 Autonomous Drones deliver real-time monitoring, safer sites, and faster insights—so your team works smarter, not harder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-white">
        <Preloader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
