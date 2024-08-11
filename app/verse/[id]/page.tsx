import { Metadata } from "next";
import Link from "next/link";
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
import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE_ID } from "@/app/constants";
import { IoMdSettings } from "react-icons/io";
import { LANGUAGE_SELECTIONS_COOKIE_NAME } from "@/app/constants";
import { LSCookieElementT } from "@/app/lib/addltypes-d";

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
  const cookieStore = cookies();
  // const tmp = cookieStore.get("selectedLanguageIds")?.value;
  const tmp = cookieStore.get(LANGUAGE_SELECTIONS_COOKIE_NAME)?.value;
  // const selectedLanguageIds = tmp ? JSON.parse(tmp) : [];
  const lSCookie: LSCookieElementT[] = tmp ? JSON.parse(tmp) : [];
  // if (!selectedLanguageIds.length) {
  if (!lSCookie.length) {
    // selectedLanguageIds.push(DEFAULT_LANGUAGE_ID); // Default if no languages in selected Languages
    // Use defaultcookie????
  }
  // console.log(`selectedLanguageIds: ${selectedLanguageIds}`);
  console.log(`lSCookie: ${lSCookie}`);

  function filterVerseByLanguageSelections() {
    //Deep copy
    const filteredGitaVerse = JSON.parse(JSON.stringify(gitaVerse));
    let i = filteredGitaVerse.gitaTranslationsByVerseId.nodes.length;
    // let verseFiltered = false;
    while (i--) {
      const languageId =
        filteredGitaVerse.gitaTranslationsByVerseId.nodes[i]?.languageId;
      const lSCookieElement = lSCookie.find(
        (element) => element.languageId === languageId
      );
      let translationsLanguageSelected = false;
      if (lSCookieElement !== undefined) {
        lSCookieElement.selectedTranslators.length &&
          (translationsLanguageSelected = true);
      }
      if (!translationsLanguageSelected) {
        filteredGitaVerse.gitaTranslationsByVerseId.nodes.splice(i, 1);
        // verseFiltered = true;
      }
      // above code could be simplified .. plan to do that later
    }
    i = filteredGitaVerse.gitaCommentariesByVerseId.nodes.length;
    while (i--) {
      const languageId =
        filteredGitaVerse.gitaCommentariesByVerseId.nodes[i]?.languageId;
      const lSCookieElement = lSCookie.find(
        (element) => element.languageId === languageId
      );
      let commentariesLanguageSelected = false;
      if (lSCookieElement !== undefined) {
        lSCookieElement.selectedCommentators.length &&
          (commentariesLanguageSelected = true);
      }
      if (!commentariesLanguageSelected) {
        filteredGitaVerse.gitaCommentariesByVerseId.nodes.splice(i, 1);
        // verseFiltered = true;
      }
      // above code could be simplified .. plan to do that later
    }
    //   if (
    //     !selectedLanguageIds.includes(
    //       filteredGitaVerse.gitaCommentariesByVerseId.nodes[
    //         i
    //       ]?.languageId.toString()
    //     )
    //   ) {
    //     filteredGitaVerse.gitaCommentariesByVerseId.nodes.splice(i, 1);
    //   }
    // }
    return filteredGitaVerse;
  }

  let displayGitaVerse = gitaVerse;
  if (lSCookie.length) {
    displayGitaVerse = filterVerseByLanguageSelections();
  }
  // if (selectedLanguageIds?.length) {
  //   displayGitaVerse = filterVerseByLanguageSelections();
  // }

  return (
    <div>
      <Suspense fallback={`Loading ...`}>
        <h3 className="text-2xl font-bold text-center mt-2">
          {`Chapter ${displayGitaVerse.chapterNumber}, Verse ${displayGitaVerse.verseNumber}`}
        </h3>
        <h4 className="my-4 text-xl font-bold">Text</h4>
        <p className={`my-4 text-3xl leading-10`}>{displayGitaVerse.text}</p>
        <h4 className="my-4 text-xl font-bold">Transliteration</h4>
        <p className="my-4 text-lg ">{displayGitaVerse.transliteration}</p>
        <h4 className="my-4 text-xl font-bold">Word Meanings</h4>
        <p className="my-4 text-lg ">{displayGitaVerse.wordMeanings}</p>
        <hr className="border border-gray-400" />
        <p className="my-4 text-orange-800">
          Note: To change languages of translations and commentaries below, go
          to{" "}
          <Link href="/settings" className="underline">
            <IoMdSettings className="size-5 inline" />
            Settings
          </Link>
        </p>
        <hr className="border border-gray-400" />
        <h4 className="my-4 text-xl font-bold">Translations</h4>
        {displayGitaVerse.gitaTranslationsByVerseId.nodes.map((translation) => (
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
        {displayGitaVerse.gitaCommentariesByVerseId.nodes.map((commentary) => (
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
