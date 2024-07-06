import "@/app/ui/global.css";
import type { Metadata } from "next";
import Navbar from "./ui/navbar";

export const metadata: Metadata = {
  title: "Bhagavad Gita (Simple App using Tailwind and TypeScript)",
  description:
    "Simple but functional Bhagavad Gita web app using Tailwind and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-2 break-words">
        <Navbar />
        {children}
        <Navbar idSuffix="2" />
      </body>
    </html>
  );
}
