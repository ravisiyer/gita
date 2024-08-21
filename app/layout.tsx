import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import type { Metadata } from "next";
import Navbar from "./ui/navbar";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    template: "%s | Bhagavad Gita",
    default: "Bhagavad Gita",
  },
  description: "Simple Bhagavad Gita web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased mx-2 break-words `}>
        {/* rgb(251 146 60) bg-orange-400 */}
        <NextTopLoader
          color="rgb(251 146 60)"
          height={10}
          initialPosition={0.5}
          showSpinner={false}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
