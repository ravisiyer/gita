import "@/app/ui/global.css";
export const dynamic = "force-dynamic";
// Above line is to disable static generation for whole app as backend data service is not working
// and so even with home page showing suitable message, the build process fails for other pages.
import { inter } from "@/app/ui/fonts";
import type { Metadata } from "next";
import Navbar from "./ui/navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Bhagavad Gita",
    default: "Bhagavad Gita",
  },
  description: "Bhagavad Gita web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased mx-2 break-words `}>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
