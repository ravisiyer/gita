"use client";
import Link from "next/link";
// import { getVerse } from "@/app/lib/dummydata";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  capitalizeFirstLetter,
  getCVNumbersFromVerseId,
  getValNumericVerseId,
} from "@/app/lib/util";
import { GitaVerse } from "@/app/lib/gqltypes-d";
import { getAppSettings } from "../providers";

function Verse({ gitaVerse }: { gitaVerse: GitaVerse }) {
  const numericChapterNumber = Number(gitaVerse.chapterNumber);
  const appSettings = getAppSettings();
  const languageIds = appSettings.languageIds;

  function filterVerseByLanguageId() {
    let i = gitaVerse.gitaTranslationsByVerseId.nodes.length;
    while (i--) {
      if (
        !languageIds.includes(
          Number(gitaVerse.gitaTranslationsByVerseId.nodes[i]?.languageId)
        ) //Number() used to avoid TS error; Need to figure out how to do it without using Number() unnecessarily
      ) {
        gitaVerse.gitaTranslationsByVerseId.nodes.splice(i, 1);
      }
    }
    i = gitaVerse.gitaCommentariesByVerseId.nodes.length;
    while (i--) {
      if (
        !languageIds.includes(
          Number(gitaVerse.gitaCommentariesByVerseId.nodes[i]?.languageId)
        ) //Number() used to avoid TS error; Need to figure out how to do it without using Number() unnecessarily
        // gitaVerse.gitaCommentariesByVerseId.nodes[i]?.languageId !== languageId
      ) {
        gitaVerse.gitaCommentariesByVerseId.nodes.splice(i, 1);
      }
    }
  }

  if (languageIds?.length) filterVerseByLanguageId();

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
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center ">
          <span className="text-xl font-bold sm:mb-4">Commentaries</span>
          <span className="text-right sm:text-left text-red-600 mb-4 ">
            Note: ? replaced by , character.{" "}
            <Link href="/qmarkissue" className="underline">
              More Info
            </Link>
          </span>
        </div>
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
export default Verse;
