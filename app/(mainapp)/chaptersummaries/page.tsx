import { Metadata } from "next";
import Link from "next/link";
import { getAllChapters } from "../../lib/data";
// import { getAllChapters } from "./lib/dummydata";
import { GitaChapter } from "../../lib/gqltypes-d";
import { cookies } from "next/headers";
import {
  DEFAULT_ENGLISH_LTS_CHECKED,
  DEFAULT_HINDI_LTS_CHECKED,
  SETTINGS_COOKIE_NAME,
} from "../../constants/constants";
import { gitaAppCookieT } from "../../lib/addltypes-d";
// import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Chapter Summaries",
};

async function Page() {
  let data = await getAllChapters();
  let allGitaChapters: GitaChapter[] = data.allGitaChapters;

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
    <div>
      {/* <Suspense fallback={`Loading ...`}> */}
      <h2 className="">
        {englishLTSChecked && (
          <span className="block text-xl font-bold text-center mt-2">
            Bhagavad Gita Chapter Summaries
          </span>
        )}
        {hindiLTSChecked && (
          <span className="block text-3xl leading-10 font-bold text-center mt-4 mb-2">
            भगवत गीता अध्यायों का सारांश
          </span>
        )}
      </h2>
      {allGitaChapters.map((chapter) => (
        <div className="p-2" key={chapter.id}>
          <hr className="border border-gray-400 mb-4" />
          <div className=" flex w-fit border border-black bg-orange-300 hover:bg-orange-200 active:scale-95 p-2 rounded-md ">
            <Link href={`/chapter/${chapter.chapterNumber}`}>
              <div className="">
                <p className="font-semibold">{`Chapter ${chapter.chapterNumber}`}</p>
                <p></p>
                <p className="font-semibold mt-2">
                  <span>{chapter.nameTranslated}</span>
                  <span className="ml-8">{` ${chapter.name}`}</span>
                </p>
              </div>
            </Link>
          </div>
          {englishLTSChecked && (
            <>
              <h4 className="my-4 text-lg font-bold">English Summary</h4>
              <p className="my-4">{chapter.chapterSummary}</p>
            </>
          )}
          {hindiLTSChecked && (
            <>
              <h4 className="my-4 text-lg font-bold">हिन्दी सारांश</h4>
              <p className="my-4 ">{chapter.chapterSummaryHindi}</p>
            </>
          )}
          <div className=" border border-black bg-orange-300 hover:bg-orange-200 active:scale-95 p-2 rounded-md w-24">
            <Link href={`/chapter/${chapter.chapterNumber}`}>
              <p className="font-semibold">{`${chapter.versesCount} verses`}</p>
            </Link>
          </div>
        </div>
      ))}
      {/* </Suspense> */}
    </div>
  );
}
export default Page;
