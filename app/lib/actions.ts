"use server";
import { cookies } from "next/headers";
import { allGitaLanguages } from "../alllanguages";
// import { setTimeout } from "timers/promises";
import {
  LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX,
  TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX,
  COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX,
  SETTINGS_COOKIE_NAME,
  CHAPTER_PAGE_TRANSLATOR_FIELD_NAME,
  DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID,
  QMARK_TO_COMMA_FIELD_NAME,
  DEFAULT_QMARK_TO_COMMA_VALUE,
} from "../constants";
// LS is abbr. for Language Selections
import {
  gitaAppCookieT,
  LSCookieElementT,
  NUM_KEYS_IN_AUTHORIDNAME,
} from "./addltypes-d";

export async function createlSCookie(formData: FormData) {
  // lSCookie is abbr. for Language Selections Cookie
  let lSCookie: LSCookieElementT[] = [];
  for (
    let languageIndex = 0;
    languageIndex < allGitaLanguages.length;
    languageIndex++
  ) {
    let lSCookieElement: LSCookieElementT | null = null;
    let countTranslatorKeys = 0;
    let countCommentatorKeys = 0;
    for (let key of formData.keys()) {
      key.startsWith(
        `${allGitaLanguages[languageIndex].id}${TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX}[`
      )
        ? countTranslatorKeys++
        : key.startsWith(
            `${allGitaLanguages[languageIndex].id}${COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX}[`
          )
        ? countCommentatorKeys++
        : null;
    }
    let numTranslators = countTranslatorKeys
      ? Math.floor(countTranslatorKeys / NUM_KEYS_IN_AUTHORIDNAME)
      : 0;
    let numCommentators = countCommentatorKeys
      ? Math.floor(countCommentatorKeys / NUM_KEYS_IN_AUTHORIDNAME)
      : 0;

    lSCookieElement = {
      languageId: allGitaLanguages[languageIndex].id,
      selectedTranslators: [],
      selectedCommentators: [],
    };

    const isLanguageChecked = formData.has(
      `${allGitaLanguages[languageIndex].id}${LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX}`
    );
    if (isLanguageChecked) {
      for (let j = 0; j < numTranslators; j++) {
        let key = `${allGitaLanguages[languageIndex].id}${TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][id]`;
        const value = formData.get(key);
        lSCookieElement.selectedTranslators.push(value?.toString()!);
      }
    }
    if (isLanguageChecked) {
      for (let j = 0; j < numCommentators; j++) {
        let key = `${allGitaLanguages[languageIndex].id}${COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][id]`;
        const value = formData.get(key);
        lSCookieElement.selectedCommentators.push(value?.toString()!);
      }
    }
    lSCookie.push(lSCookieElement);
  }
  // console.log("lSCookie", lSCookie);

  const chapterPageTranslatorAuthorIdValue = formData.get(
    `${CHAPTER_PAGE_TRANSLATOR_FIELD_NAME}[authorId]`
  );
  let chapterPageTranslatorAuthorId =
    chapterPageTranslatorAuthorIdValue?.toString() ||
    DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID.toString();

  const isQMarkToCommaChecked = formData.has(`${QMARK_TO_COMMA_FIELD_NAME}`);

  const gitaAppCookie: gitaAppCookieT = {
    lSCookie,
    chapterPageTranslatorAuthorId,
    qMarkToCommaChecked: isQMarkToCommaChecked,
  };

  cookies().set(SETTINGS_COOKIE_NAME, JSON.stringify(gitaAppCookie));
  // await setTimeout(2000);
}
