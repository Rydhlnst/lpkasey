import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
