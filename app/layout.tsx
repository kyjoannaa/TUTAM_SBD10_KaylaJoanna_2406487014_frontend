import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoodWatches",
  description: "Track your favorite and watched movies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {}
        <main className="pt-24 px-6 max-w-7xl mx-auto min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}