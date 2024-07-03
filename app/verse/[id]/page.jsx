import { getVerse } from "@/app/lib/data";
// import { getVerse } from "@/app/lib/dummydata";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { capitalizeFirstLetter } from "@/app/lib/util";
import { getValNumericVerseId } from "@/app/lib/util";

async function Page({ params }) {
  const verseId = params.id;

  const valVerseId = getValNumericVerseId(verseId);
  if (!valVerseId.valid) {
    notFound();
  }
  const numericVerseId = valVerseId.numericVerseId;

  let data = await getVerse(verseId);
  let gitaVerse = data.gitaVerse;

  const numericChapterNumber = Number(gitaVerse.chapterNumber);
  return (
    <div>
      <Suspense fallback={`Loading ...`}>
        <h3 className="my-4 text-lg font-bold">{`Chapter ${gitaVerse.chapterNumber}, Verse ${gitaVerse.verseNumber}`}</h3>
        <h4 className="my-4 font-bold">Text</h4>
        <p className="my-4 leading-snug">{gitaVerse.text}</p>
        <h4 className="my-4 font-bold">Transliteration</h4>
        <p className="my-4 leading-[1.1]">{gitaVerse.transliteration}</p>
        <h4 className="my-4 font-bold">Word Meanings</h4>
        <p className="my-4 leading-[1.1]">{gitaVerse.wordMeanings}</p>
        <hr className="border border-gray-400" />
        <h4 className="my-4 font-bold">Translations</h4>
        {gitaVerse.gitaTranslationsByVerseId.nodes.map((translation) => (
          <div key={translation.authorId}>
            <b>
              <i>
                In {capitalizeFirstLetter(translation.language)} by{" "}
                {translation.authorName}
              </i>
            </b>
            <p className="my-4 leading-snug">{translation.description}</p>
          </div>
        ))}
        <hr className="border border-gray-400" />
        <h4 className="my-4 font-bold">Commentaries</h4>
        {gitaVerse.gitaCommentariesByVerseId.nodes.map((commentary) => (
          <div key={commentary.authorId}>
            <b>
              <i>
                In {capitalizeFirstLetter(commentary.language)} by{" "}
                {commentary.authorName}
              </i>
            </b>
            <p className="my-4 leading-snug">{commentary.description}</p>
          </div>
        ))}
        <hr className="border border-gray-400" />
        <p className="my-4 leading-[1.1]">{`Chapter ${gitaVerse.chapterNumber}, Verse ${gitaVerse.verseNumber}`}</p>
      </Suspense>
    </div>
  );
}
export default Page;
