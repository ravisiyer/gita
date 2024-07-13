import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getChapter } from "../lib/data";
// import { getChapter } from "../lib/dummydata";
import Link from "next/link";
import { getValNumericChapterNumber } from "../lib/util";
import { GitaChapter } from "../lib/gqltypes-d";

async function Page({ params }: { params: { chapternumber: string } }) {
  const chapterNumber: string = params.chapternumber;

  const valChapterNumber = getValNumericChapterNumber(chapterNumber);
  if (!valChapterNumber.valid) {
    notFound();
  }
  const numericChapterNumber = valChapterNumber.numericChapterNumber;

  let data = await getChapter(chapterNumber);
  let gitaChapter: GitaChapter = data.gitaChapter;

  return (
    <div>
      <Suspense fallback={`Loading ...`}>
        <h3 className="">
          {/* <h3 className="my-4 text-2xl font-bold"> */}
          <p className="text-xl font-bold text-center mt-2">{`Chapter ${chapterNumber}`}</p>
          <p className="text-3xl font-bold text-center mt-2">{`${gitaChapter.nameTranslated}`}</p>
          <p className="text-3xl font-bold text-center mt-4">{`${gitaChapter.name}`}</p>
        </h3>
        {/* <h3 className="my-4 text-lg font-bold">{`Chapter ${chapterNumber}: ${gitaChapter.nameTranslated} ${gitaChapter.name}`}</h3> */}
        <h4 className="my-4 text-xl font-bold">English Summary</h4>
        <p className="my-4 text-lg leading-[1.1]">
          {gitaChapter.chapterSummary}
        </p>
        <h4 className="my-4 text-xl font-bold">हिन्दी सारांश</h4>
        <p className="my-4 text-lg leading-snug">
          {gitaChapter.chapterSummaryHindi}
        </p>
        <h4 className="my-4 text-xl font-bold">{`${gitaChapter.versesCount} verses`}</h4>
        <hr className="border border-gray-400 mb-2" />
        {gitaChapter.gitaVersesByChapterId.nodes.map((verse) => (
          <div className="p-2" key={verse!.id}>
            <Link
              href={`/verse/${verse!.id}`}
              // className="text-blue-700 visited:text-purple-900 underline"
            >
              <div className=" border border-black bg-orange-400 hover:bg-orange-300 p-2 rounded-md w-24">
                <h3 className="text-lg font-bold">{`Verse ${
                  verse!.verseNumber
                }`}</h3>
              </div>
            </Link>
            <h4 className="my-4 text-lg font-bold">Text</h4>
            <p className="my-4 text-2xl leading-snug">{verse!.text}</p>
            <h4 className="my-4 text-lg font-bold">Transliteration</h4>
            <p className="my-4 leading-[1.1]">{verse!.transliteration}</p>
            <h4 className="my-4 text-lg font-bold">Word Meanings</h4>
            <p className="my-4 leading-[1.1]">{verse!.wordMeanings}</p>
            <h4 className="my-4 text-lg font-bold">{`English translation by ${
              verse!.gitaTranslationsByVerseId.nodes[0]!.authorName
            }`}</h4>
            <p className="my-4 text-xl leading-[1.1]">
              {verse!.gitaTranslationsByVerseId.nodes[0]!.description}
            </p>
            <Link
              href={`/verse/${verse!.id}`}
              // className="text-blue-700 visited:text-purple-900 underline"
            >
              <div className=" border border-black bg-orange-400 hover:bg-orange-300 p-2 mt-2 rounded-md w-[306px] text-lg font-bold">
                Commentaries and more translations
              </div>
            </Link>
            <hr className="border border-gray-400 mt-4" />
          </div>
        ))}
      </Suspense>
    </div>
  );
}
export default Page;
