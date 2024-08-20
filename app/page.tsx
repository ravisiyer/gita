import ChapterTiles from "./ui/chaptertiles";
// import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import {
  DEFAULT_ENGLISH_LTS_CHECKED,
  DEFAULT_HINDI_LTS_CHECKED,
  SETTINGS_COOKIE_NAME,
} from "./constants/constants";
import { gitaAppCookieT } from "./lib/addltypes-d";

export default function Home() {
  const cookieStore = cookies();
  const tmp = cookieStore.get(SETTINGS_COOKIE_NAME)?.value;
  let gitaAppCookie: gitaAppCookieT = tmp ? JSON.parse(tmp) : tmp;
  let englishLTSChecked = gitaAppCookie
    ? gitaAppCookie.englishLTSChecked
    : DEFAULT_ENGLISH_LTS_CHECKED;
  let hindiLTSChecked = gitaAppCookie
    ? gitaAppCookie.hindiLTSChecked
    : DEFAULT_HINDI_LTS_CHECKED;
  if (!englishLTSChecked && !hindiLTSChecked) {
    console.log(
      "Both english and hindi LTS are false! Making englishLTS true."
    );
    englishLTSChecked = true;
  }

  return (
    <main className="mx-auto scroll-mt-16 min-h-[calc(100vh-45px)] bg-yellow-100 max-w-full">
      <div className="flex justify-center ">
        <Image
          src="/hero-desktop.jpg"
          alt="Hero Image"
          width={2792}
          height={1262}
          className="hidden md:block"
          priority={true}
        />
        <Image
          src="/hero-mobile.jpg"
          alt="Hero Image"
          width={1204}
          height={1262}
          className="block md:hidden"
          priority={true}
        />
      </div>
      <div className="">
        <h1 className="font-bold italic text-yellow-200 bg-slate-700 mt-2 p-2 rounded-md">
          <span className="block text-3xl">
            Bhagavad Gita - The Song of God
          </span>
          <span className="block text-xl">
            Sacred Hindu Scripture, Revered Across Millennia
          </span>
        </h1>
        <Link href="/chaptersummaries">
          <div className=" border border-black bg-orange-400 hover:bg-orange-300 active:scale-95 p-2 my-2 rounded-md">
            <h3 className="text-lg font-bold">
              {englishLTSChecked && (
                <span className="block">Chapter Summaries</span>
              )}
              {hindiLTSChecked && (
                <span className="block">अध्यायों का सारांश</span>
              )}
            </h3>
          </div>
        </Link>

        {/* <Suspense fallback={`Loading ...`}> */}
        <ChapterTiles />
        {/* </Suspense> */}
        <hr className="border border-gray-400 mt-2" />
        <p className="text-xs text-right">
          Top of page photo by{" "}
          <a href="https://unsplash.com/@drone4inspection?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Oleg Churakov
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/a-statue-of-a-religious-figure-AKR89I3xf94?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </p>
      </div>
    </main>
  );
}
