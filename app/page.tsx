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
  // const cookieStore = cookies();
  // const tmp = cookieStore.get(SETTINGS_COOKIE_NAME)?.value;
  // let gitaAppCookie: gitaAppCookieT = tmp ? JSON.parse(tmp) : tmp;
  // let englishLTSChecked = gitaAppCookie
  //   ? gitaAppCookie.englishLTSChecked
  //   : DEFAULT_ENGLISH_LTS_CHECKED;
  // let hindiLTSChecked = gitaAppCookie
  //   ? gitaAppCookie.hindiLTSChecked
  //   : DEFAULT_HINDI_LTS_CHECKED;
  // if (!englishLTSChecked && !hindiLTSChecked) {
  //   console.log(
  //     "Both english and hindi LTS are false! Making englishLTS true."
  //   );
  //   englishLTSChecked = true;
  // }

  return (
    <main className="mx-auto scroll-mt-16 min-h-[calc(100vh-45px)] bg-yellow-100 max-w-full">
      {/* <div className="flex justify-center ">
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
      </div> */}
      <div className="">
        <h1 className="font-bold italic text-yellow-200 bg-slate-700 mt-2 p-2 rounded-md">
          <span className="block text-3xl">
            Bhagavad Gita - The Song of God
          </span>
          {/* <span className="block text-xl">
            Sacred Hindu Scripture, Revered Across Millennia
          </span> */}
        </h1>
        <h1 className="mt-2 text-2xl">Note: App backend data service is not working</h1>
        <p className="mt-4 mb-4"> On 30 Nov. 2025, I found that the backend data service -&nbsp; 
          <a href="https://gql.bhagavadgita.io/graphql" 
          className="bg-orange-400 hover:bg-orange-300 active:scale-95">https://gql.bhagavadgita.io/graphql</a>
           &nbsp;- provided by somebody else, and so not in my control, is not working. 
           This app is dependent on this service to get Bhagavad Gita data to be shown to the user.
        </p>
        <p className="mt-4 mb-4">
          I do not think an alternative graphql backend service for Bhagavad Gita data is available, as of now. 
          So this app is not functional at this time.
        </p>
        <p className="mt-4 mb-4">
          I have&nbsp; 
          <a href="https://github.com/gita/bhagavad-gita-graphql/issues/3"
          className="text-blue-600 hover:text-blue-800 underline">
          put up an issue
          </a>
          &nbsp;in this GitHub repo -&nbsp; 
          <a href="https://github.com/gita/bhagavad-gita-graphql"
          className="bg-orange-400 hover:bg-orange-300 active:scale-95">
             https://github.com/gita/bhagavad-gita-graphql</a>
           &nbsp;- which seems to be for the above service. But I do not know if or when it will be fixed.
        </p>
        <p className="mt-4 mb-4">
          To see screenshots of the app when the backend data service was working, please visit my blog post&nbsp; 
          <a href="https://raviswdev.blogspot.com/2024/08/gita-web-app-nextjs-open-source-v14.html"
          className="text-blue-600 hover:text-blue-800 underline">
          Gita web app (Next.js, open source) v1.4.1...</a>.
        </p>
        {/* <Link href="/chaptersummaries">
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
        </Link> */}

        {/* <Suspense fallback={`Loading ...`}> */}
        {/* <ChapterTiles /> */}
        {/* </Suspense> */}
        {/* <hr className="border border-gray-400 mt-2" />
        <p className="text-xs text-right">
          Top of page photo by{" "}
          <a href="https://unsplash.com/@drone4inspection?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Oleg Churakov
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/a-statue-of-a-religious-figure-AKR89I3xf94?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </p> */}
      </div>
    </main>
  );
}
