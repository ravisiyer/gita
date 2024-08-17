import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import type { Metadata } from "next";
import Navbar from "./ui/navbar";
import NextTopLoader from "nextjs-toploader";
import clsx from "clsx";
import { gitaAppCookieT } from "@/app/lib/addltypes-d";
import { cookies } from "next/headers";
import {
  DEFAULT_FULL_WINDOW_WIDTH_CHECKED,
  SETTINGS_COOKIE_NAME,
} from "@/app/constants";

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
  const cookieStore = cookies();
  const tmp = cookieStore.get(SETTINGS_COOKIE_NAME)?.value;
  const gitaAppCookie: gitaAppCookieT = tmp ? JSON.parse(tmp) : tmp;
  const fullWindowWidthChecked = gitaAppCookie
    ? gitaAppCookie.fullWindowWidthChecked
    : DEFAULT_FULL_WINDOW_WIDTH_CHECKED;

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased mx-2 break-words`}>
        <NextTopLoader color="rgb(251 146 60)" />
        <Navbar />
        <main
          className={clsx(
            "mx-auto p-2 scroll-mt-16 min-h-[calc(100vh-45px)] bg-yellow-100",
            fullWindowWidthChecked ? " max-w-full" : " max-w-4xl"
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
