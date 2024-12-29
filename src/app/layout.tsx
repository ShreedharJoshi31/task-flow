import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { LayoutWithSidebar } from "@/components/layout-with-sidebar";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AI-Powered BPO Workflow System",
  description: "Streamline claims processing with AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <LayoutWithSidebar>{children}</LayoutWithSidebar>
        <Toaster />
      </body>
    </html>
  );
}
