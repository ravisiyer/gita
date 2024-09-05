import "@/app/ui/global.css";
import type { Metadata } from "next";
import clsx from "clsx";
import { gitaAppCookieT } from "@/app/lib/addltypes-d";
import { cookies } from "next/headers";
import {
  DEFAULT_FULL_WINDOW_WIDTH_CHECKED,
  SETTINGS_COOKIE_NAME,
  MAIN_CONTAINER_MAX_WIDTH_TAILWIND,
} from "@/app/constants/constants";

export const metadata: Metadata = {
  title: {
    template: "%s | Bhagavad Gita",
    default: "Bhagavad Gita",
  },
  description: "Bhagavad Gita web app",
};

export default function MainAppLayout({
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
    <main
      className={clsx(
        "mx-auto p-2 scroll-mt-16 min-h-[calc(100vh-45px)] bg-yellow-100",
        fullWindowWidthChecked
          ? " max-w-full"
          : MAIN_CONTAINER_MAX_WIDTH_TAILWIND
      )}
    >
      {children}
    </main>
  );
}
