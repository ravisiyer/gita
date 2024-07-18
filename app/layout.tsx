import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import type { Metadata } from "next";
import Navbar from "./ui/navbar";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Bhagavad Gita (Simple App)",
  description: "Simple Bhagavad Gita web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased mx-2 mb-2 break-words`}>
        <NextTopLoader color="rgb(251 146 60)" />
        <Navbar />
        <main className="mx-auto max-w-4xl p-2 scroll-mt-16 bg-yellow-100">
          {children}
        </main>
      </body>
    </html>
  );
}
