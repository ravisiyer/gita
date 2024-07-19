import { Metadata } from "next";
import { getVerse } from "@/app/lib/data";
// import { getVerse } from "@/app/lib/dummydata";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  capitalizeFirstLetter,
  getCVNumbersFromVerseId,
  getValNumericVerseId,
} from "@/app/lib/util";
import { GitaVerse } from "@/app/lib/gqltypes-d";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const chapVerseNumbers = getCVNumbersFromVerseId(params.id);
  return {
    title: `Chapter ${chapVerseNumbers.chapterNumber}, Verse ${chapVerseNumbers.verseNumber}`,
  };
}

async function Page({ params }: { params: { id: string } }) {
  const verseId = params.id;

  const valVerseId = getValNumericVerseId(verseId);
  if (!valVerseId.valid) {
    notFound();
  }
  const numericVerseId = valVerseId.numericVerseId;

  let data = await getVerse(verseId);
  let gitaVerse: GitaVerse = data.gitaVerse;

  const numericChapterNumber = Number(gitaVerse.chapterNumber);
  return (
    <div>
      <Suspense fallback={`Loading ...`}>
        <h3 className="text-2xl font-bold text-center mt-2">
          {`Chapter ${gitaVerse.chapterNumber}, Verse ${gitaVerse.verseNumber}`}
        </h3>
        <h4 className="my-4 text-xl font-bold">Text</h4>
        <p className={`my-4 text-3xl leading-10`}>{gitaVerse.text}</p>
        <h4 className="my-4 text-xl font-bold">Transliteration</h4>
        <p className="my-4 text-lg ">{gitaVerse.transliteration}</p>
        <h4 className="my-4 text-xl font-bold">Word Meanings</h4>
        <p className="my-4 text-lg ">{gitaVerse.wordMeanings}</p>
        <hr className="border border-gray-400" />
        <h4 className="my-4 text-xl font-bold">Translations</h4>
        {gitaVerse.gitaTranslationsByVerseId.nodes.map((translation) => (
          <div key={translation!.authorId}>
            <p className="text-lg font-bold italic">
              In {capitalizeFirstLetter(translation!.language!)} by{" "}
              {translation!.authorName}
            </p>
            <p className="my-4 ">{translation!.description}</p>
          </div>
        ))}
        <hr className="border border-gray-400" />
        <h4 className="my-4 text-xl font-bold">Commentaries</h4>
        {gitaVerse.gitaCommentariesByVerseId.nodes.map((commentary) => (
          <div key={commentary!.authorId}>
            <p className="text-lg font-bold italic">
              In {capitalizeFirstLetter(commentary!.language!)} by{" "}
              {commentary!.authorName}
            </p>
            {/* Hack to partially fix ? characters instead of , characters in all
            commentaries. Disadvantage is that even ? chars that should be ? will be 
            changed to , chars. But such cases may be very few. */}
            <p className="my-4 ">
              {commentary!.description!.replace(/\?/g, ",")}
            </p>
            {/* Hack to partially fix ? characters instead of , characters in Swami Sivananda
            commentaries. Disadvantage is that even ? chars that should be ? will be 
            changed to , chars. But such cases seem to be very few. */}
            {/* {commentary!
              .authorName!.toLowerCase()
              .includes("swami sivananda") ? (
              <p className="my-4 ">
                {commentary!.description!.replace(/\?/g, ",")}
              </p>
            ) : (
              <p className="my-4 ">{commentary!.description}</p>
            )} */}
            {/* <p className="my-4 ">{commentary!.description}</p> */}
          </div>
        ))}
        <hr className="border border-gray-400" />
      </Suspense>
    </div>
  );
}
export default Page;
