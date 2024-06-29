import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getChapter } from "../lib/data";
// import { getChapter } from "../lib/dummydata";
import Link from "next/link";
import { getValNumericChapterNumber } from "../lib/util";

async function Page({ params }) {
  const chapterNumber = params.chapternumber;

  const valChapterNumber = getValNumericChapterNumber(chapterNumber);
  if (!valChapterNumber.valid) {
    notFound();
  }
  const numericChapterNumber = valChapterNumber.numericChapterNumber;

  let data = await getChapter(chapterNumber);
  let gitaChapter = data.gitaChapter;

  return (
    <div>
      <Suspense fallback={`Loading ...`}>
        <h3>{`Chapter ${chapterNumber}: ${gitaChapter.nameTranslated} ${gitaChapter.name}`}</h3>
        <h4>English Summary</h4>
        <p>{gitaChapter.chapterSummary}</p>
        <h4>हिन्दी सारांश</h4>
        <p>{gitaChapter.chapterSummaryHindi}</p>
        <h4>{`${gitaChapter.versesCount} verses`}</h4>
        <hr />
        {gitaChapter.gitaVersesByChapterId.nodes.map((verse) => (
          <div key={verse.id}>
            <Link href={`/verse/${verse.id}`}>
              <h3>{`Verse ${verse.verseNumber}`}</h3>
            </Link>
            <h4>Text</h4>
            <p>{verse.text}</p>
            <h4>Transliteration</h4>
            <p>{verse.transliteration}</p>
            <h4>Word Meanings</h4>
            <p>{verse.wordMeanings}</p>
            <h4>{`English translation by ${verse.gitaTranslationsByVerseId.nodes[0].authorName}`}</h4>
            <p>{verse.gitaTranslationsByVerseId.nodes[0].description}</p>
            <Link href={`/verse/${verse.id}`}>
              Commentaries and more translations
            </Link>
            <hr />
          </div>
        ))}
        <p>{`Chapter ${chapterNumber}: ${gitaChapter.nameTranslated} ${gitaChapter.name}`}</p>
      </Suspense>
    </div>
  );
}
export default Page;
