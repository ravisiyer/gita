import "@/app/ui/global.css";
import type { Metadata } from "next";
import Navbar from "./ui/navbar";

export const metadata: Metadata = {
  title: "Bhagavad Gita (Simple App)",
  description: "Simple but functional Bhagavad Gita web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-2 mb-2 break-words">
        <Navbar />
        <main className="mx-auto max-w-4xl p-4 scroll-mt-16">{children}</main>
      </body>
    </html>
  );
}
