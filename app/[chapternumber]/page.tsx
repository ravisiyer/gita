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
        <h3 className="my-4 text-lg font-bold">{`Chapter ${chapterNumber}: ${gitaChapter.nameTranslated} ${gitaChapter.name}`}</h3>
        <h4 className="my-4 font-bold">English Summary</h4>
        <p className="my-4 leading-[1.1]">{gitaChapter.chapterSummary}</p>
        <h4 className="my-4 font-bold">हिन्दी सारांश</h4>
        <p className="my-4 leading-snug">{gitaChapter.chapterSummaryHindi}</p>
        <h4 className="my-4 font-bold">{`${gitaChapter.versesCount} verses`}</h4>
        <hr className="border border-gray-400" />
        {gitaChapter.gitaVersesByChapterId.nodes.map((verse) => (
          <div key={verse!.id}>
            <Link
              href={`/verse/${verse!.id}`}
              className="text-blue-700 visited:text-purple-900 underline"
            >
              <h3 className="my-4 text-lg font-bold">{`Verse ${
                verse!.verseNumber
              }`}</h3>
            </Link>
            <h4 className="my-4 font-bold">Text</h4>
            <p className="my-4 leading-snug">{verse!.text}</p>
            <h4 className="my-4 font-bold">Transliteration</h4>
            <p className="my-4 leading-[1.1]">{verse!.transliteration}</p>
            <h4 className="my-4 font-bold">Word Meanings</h4>
            <p className="my-4 leading-[1.1]">{verse!.wordMeanings}</p>
            <h4 className="my-4 font-bold">{`English translation by ${
              verse!.gitaTranslationsByVerseId.nodes[0]!.authorName
            }`}</h4>
            <p className="my-4 leading-[1.1]">
              {verse!.gitaTranslationsByVerseId.nodes[0]!.description}
            </p>
            <Link
              href={`/verse/${verse!.id}`}
              className="text-blue-700 visited:text-purple-900 underline"
            >
              Commentaries and more translations
            </Link>
            <hr className="border border-gray-400" />
          </div>
        ))}
        <p className="my-4 leading-[1.1]">{`Chapter ${chapterNumber}: ${gitaChapter.nameTranslated} ${gitaChapter.name}`}</p>
      </Suspense>
    </div>
  );
}
export default Page;
