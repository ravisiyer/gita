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
import {
  GitaVerse,
  Maybe,
  GitaTranslation,
  GitaCommentary,
} from "@/app/lib/gqltypes-d";
import { cookies } from "next/headers";
import { IoMdSettings } from "react-icons/io";
import {
  SETTINGS_COOKIE_NAME,
  DEFAULT_QMARK_TO_COMMA_VALUE,
} from "@/app/constants/constants";
import { LSCookieElementT, gitaAppCookieT } from "@/app/lib/addltypes-d";
import { defaultLSInCookieFormat } from "@/app/constants/defaultlanguageSelections";

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
  const tmp = cookieStore.get(SETTINGS_COOKIE_NAME)?.value;
  let gitaAppCookie: gitaAppCookieT = tmp ? JSON.parse(tmp) : tmp;

  let lSCookie: LSCookieElementT[] = gitaAppCookie
    ? gitaAppCookie.lSCookie
    : [];
  if (!lSCookie.length) {
    // Use default Language Selections in cookie format
    lSCookie = defaultLSInCookieFormat;
  }

  let qMarkToCommaChecked = gitaAppCookie
    ? gitaAppCookie.qMarkToCommaChecked
    : DEFAULT_QMARK_TO_COMMA_VALUE;

  function filterVerseByLanguageSelections() {
    // Function will be called only if lSCookie has length > 0. But no harm in addl. check here
    if (!lSCookie.length) {
      return gitaVerse; // No filtering is needed, return full verse
    }
    //Deep copy
    const filteredGitaVerse: GitaVerse = JSON.parse(JSON.stringify(gitaVerse));
    const gitaTranslationNodes: Maybe<GitaTranslation>[] =
      filteredGitaVerse.gitaTranslationsByVerseId.nodes.filter(
        (gitaTranslation) => {
          const lSCookieElement = lSCookie.find(
            (element) => element.languageId === gitaTranslation?.languageId
          );
          if (
            lSCookieElement === undefined ||
            lSCookieElement.selectedTranslators.length === 0
          ) {
            return false;
          } else if (
            lSCookieElement.selectedTranslators.includes(
              gitaTranslation?.authorId?.toString()!
            )
          ) {
            return true;
          } else {
            return false;
          }
        }
      );
    filteredGitaVerse.gitaTranslationsByVerseId.nodes = gitaTranslationNodes;

    const gitaCommentaryNodes: Maybe<GitaCommentary>[] =
      filteredGitaVerse.gitaCommentariesByVerseId.nodes.filter(
        (gitaCommentary) => {
          const lSCookieElement = lSCookie.find(
            (element) => element.languageId === gitaCommentary?.languageId
          );
          if (
            lSCookieElement === undefined ||
            lSCookieElement.selectedCommentators.length === 0
          ) {
            return false;
          } else if (
            lSCookieElement.selectedCommentators.includes(
              gitaCommentary?.authorId?.toString()!
            )
          ) {
            return true;
          } else {
            return false;
          }
        }
      );
    filteredGitaVerse.gitaCommentariesByVerseId.nodes = gitaCommentaryNodes;
    return filteredGitaVerse;
  }

  let displayGitaVerse = gitaVerse;
  if (lSCookie.length) {
    displayGitaVerse = filterVerseByLanguageSelections();
  }

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
          Note: To choose languages, translators and commentators for contents
          below, go to{" "}
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
          {displayGitaVerse.gitaCommentariesByVerseId.nodes.length ? (
            <span className="text-right sm:text-left text-red-600 mb-4 ">
              Note: ? {!qMarkToCommaChecked && "not "}replaced by , character.{" "}
              <Link href="/qmarkissue" className="underline">
                More Info
              </Link>
            </span>
          ) : null}
        </div>
        {displayGitaVerse.gitaCommentariesByVerseId.nodes.map((commentary) => (
          <div key={commentary!.authorId}>
            <p className="text-lg font-bold italic">
              In {capitalizeFirstLetter(commentary!.language!)} by{" "}
              {commentary!.authorName}
            </p>
            {/* Hack to partially fix ? characters instead of , characters in all commentaries,
             based on qMarkToComma setting. Disadvantage is that even ? chars that should be ?
             will be changed to , chars. But such cases may be very few. */}
            <p className="my-4 ">
              {qMarkToCommaChecked
                ? commentary!.description!.replace(/\?/g, ",")
                : commentary!.description}
            </p>
          </div>
        ))}
        <hr className="border border-gray-400" />
      </Suspense>
    </div>
  );
}
export default Page;
