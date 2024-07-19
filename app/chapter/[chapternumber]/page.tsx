import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getChapter } from "../../lib/data";
// import { getChapter } from "../lib/dummydata";
import Link from "next/link";
import { getValNumericChapterNumber } from "../../lib/util";
import { GitaChapter } from "../../lib/gqltypes-d";

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

  let data = await getChapter(chapterNumber);
  let gitaChapter: GitaChapter = data.gitaChapter;

  return (
    <div>
      <Suspense fallback={`Loading ...`}>
        <h3 className="">
          <span className="block text-xl font-bold text-center mt-2">{`Chapter ${chapterNumber}`}</span>
          <span className="block text-3xl font-bold text-center mt-2">{`${gitaChapter.nameTranslated}`}</span>
          <span className="block text-3xl leading-10 font-bold text-center mt-4">{`${gitaChapter.name}`}</span>
        </h3>
        <h4 className="my-4 text-xl font-bold">English Summary</h4>
        <p className="my-4 text-lg ">{gitaChapter.chapterSummary}</p>
        <h4 className="my-4 text-xl font-bold">हिन्दी सारांश</h4>
        <p className="my-4 text-lg ">{gitaChapter.chapterSummaryHindi}</p>
        <h4 className="my-4 text-xl font-bold">{`${gitaChapter.versesCount} verses`}</h4>
        <hr className="border border-gray-400 mb-2" />
        {gitaChapter.gitaVersesByChapterId.nodes.map((verse) => (
          <div className="p-2" key={verse!.id}>
            <Link href={`/verse/${verse!.id}`}>
              <div className=" border border-black bg-orange-400 hover:bg-orange-300 active:scale-95 p-2 rounded-md w-24">
                <h3 className="text-lg font-bold">{`Verse ${
                  verse!.verseNumber
                }`}</h3>
              </div>
            </Link>
            <h4 className="my-4 text-lg font-bold">Text</h4>
            <p className="my-4 text-2xl ">{verse!.text}</p>
            <h4 className="my-4 text-lg font-bold">Transliteration</h4>
            <p className="my-4 ">{verse!.transliteration}</p>
            <h4 className="my-4 text-lg font-bold">Word Meanings</h4>
            <p className="my-4 ">{verse!.wordMeanings}</p>
            <h4 className="my-4 text-lg font-bold">{`English translation by ${
              verse!.gitaTranslationsByVerseId.nodes[0]!.authorName
            }`}</h4>
            <p className="my-4 text-xl ">
              {verse!.gitaTranslationsByVerseId.nodes[0]!.description}
            </p>
            <Link href={`/verse/${verse!.id}`}>
              <div className=" border border-black bg-orange-400 hover:bg-orange-300 active:scale-95 p-2 mt-2 rounded-md w-[330px] text-lg font-bold">
                More Translations & Commentaries
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
