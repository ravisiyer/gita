import Providers from "./providers";
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
      <body className={`${inter.className} antialiased mx-2 mb-2 break-words`}>
        <NextTopLoader color="rgb(251 146 60)" />
        <DummyTopLevel> {children} </DummyTopLevel>
        {/* <Providers> */}
        {/* <Navbar />
          <main className="mx-auto max-w-4xl p-2 scroll-mt-16 bg-yellow-100">
            {children}
            {/* <Providers>{children}</Providers> */}
        {/* </main>  */}
        {/* </Providers> */}
      </body>
    </html>
  );
}

function DummyTopLevel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl p-2 scroll-mt-16 bg-yellow-100">
        {children}
        {/* <Providers>{children}</Providers> */}
      </main>
    </>
  );
}
