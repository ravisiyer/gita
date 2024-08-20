import { Metadata } from "next";
import { notFound } from "next/navigation";
// import { Suspense } from "react";
import { getChapter } from "../../../lib/data";
// import { getChapter } from "../lib/dummydata";
import Link from "next/link";
import {
  capitalizeFirstLetter,
  getValNumericChapterNumber,
} from "../../../lib/util";
import { GitaChapter } from "../../../lib/gqltypes-d";
import { cookies } from "next/headers";
import {
  DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR,
  DEFAULT_ENGLISH_LTS_CHECKED,
  DEFAULT_HINDI_LTS_CHECKED,
  SETTINGS_COOKIE_NAME,
} from "@/app/constants/constants";
import { gitaAppCookieT } from "@/app/lib/addltypes-d";

export async function generateMetadata({
  params,
}: {
  params: { chapternumber: string };
}): Promise<Metadata> {
  return {
    title: `Chapter ${params.chapternumber}`,
  };
}

async function Page({ params }: { params: { chapternumber: string } }) {
  const chapterNumber: string = params.chapternumber;

  const valChapterNumber = getValNumericChapterNumber(chapterNumber);
  if (!valChapterNumber.valid) {
    notFound();
  }
  const numericChapterNumber = valChapterNumber.numericChapterNumber;

  const cookieStore = cookies();
  const tmp = cookieStore.get(SETTINGS_COOKIE_NAME)?.value;
  const gitaAppCookie: gitaAppCookieT = tmp ? JSON.parse(tmp) : tmp;

  const chapterPageTranslatorAuthorIdStr: string = gitaAppCookie
    ? gitaAppCookie.chapterPageTranslatorAuthorIdStr
    : DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR;

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

  let data = await getChapter(chapterNumber, chapterPageTranslatorAuthorIdStr);
  let gitaChapter: GitaChapter = data.gitaChapter;

  return (
    <div>
      {/* <Suspense fallback={`Loading ...`}> */}
      <h3 className="">
        <span className="block text-xl font-bold text-center mt-2">{`Chapter ${chapterNumber}`}</span>
        <span className="block text-3xl font-bold text-center mt-2">{`${gitaChapter.nameTranslated}`}</span>
        <span className="block text-3xl leading-10 font-bold text-center mt-4">{`${gitaChapter.name}`}</span>
      </h3>
      {englishLTSChecked && (
        <>
          <h4 className="my-4 text-xl font-bold">English Summary</h4>
          <p className="my-4 text-base ">{gitaChapter.chapterSummary}</p>
        </>
      )}
      {hindiLTSChecked && (
        <>
          <h4 className="my-4 text-xl font-bold">हिन्दी सारांश</h4>
          <p className="my-4 text-base ">{gitaChapter.chapterSummaryHindi}</p>
        </>
      )}
      <h4 className="my-4 text-xl font-bold">{`${gitaChapter.versesCount} verses`}</h4>
      <hr className="border border-gray-400 mb-2" />
      {gitaChapter.gitaVersesByChapterId.nodes.map((verse) => (
        <div className="p-2" key={verse!.id}>
          <Link href={`/verse/${verse!.id}`}>
            <div className=" border border-black bg-orange-300 hover:bg-orange-200 active:scale-95 p-2 rounded-md w-24">
              <h3 className="text-base font-semibold">{`Verse ${
                verse!.verseNumber
              }`}</h3>
            </div>
          </Link>
          <h4 className="my-4 text-lg font-bold">Text</h4>
          <p className="my-4 text-xl ">{verse!.text}</p>
          <h4 className="my-4 text-lg font-bold">Transliteration</h4>
          <p className="my-4 ">{verse!.transliteration}</p>
          <h4 className="my-4 text-lg font-bold">Word Meanings</h4>
          <p className="my-4 ">{verse!.wordMeanings}</p>
          <h4 className="my-4 text-lg font-bold">{`${capitalizeFirstLetter(
            verse!.gitaTranslationsByVerseId.nodes[0]!.language!
          )} translation by ${
            verse!.gitaTranslationsByVerseId.nodes[0]!.authorName
          }`}</h4>
          <p className="my-4 ">
            {verse!.gitaTranslationsByVerseId.nodes[0]!.description}
          </p>
          <Link href={`/verse/${verse!.id}`}>
            <div className=" border border-black bg-orange-300 hover:bg-orange-200 active:scale-95 p-2 mt-2 rounded-md w-16 text-base font-semibold">
              More
            </div>
          </Link>
          <hr className="border border-gray-400 mt-4" />
        </div>
      ))}
      {/* </Suspense> */}
    </div>
  );
}
export default Page;
