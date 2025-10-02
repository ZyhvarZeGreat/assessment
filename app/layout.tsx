import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const seravekNormal = localFont({
  src: "../public/fonts/Seravek.otf",
  variable: "--font-seravek",
  display: "swap",
});

const seravekMedium = localFont({
  src: "../public/fonts/Seravek-Medium.otf",
  variable: "--font-seravek-medium",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aplite - Connect with People",
  description: "Professional networking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${seravekNormal.variable} ${seravekMedium.variable} antialiased bg-gray-50`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 md:pl-56">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
