import { getCookie, setCookie } from "cookies-next";
// import { cookies } from "next/headers";
import { allGitaLanguages } from "../constants/alllanguages";
// import { setTimeout } from "timers/promises";
import {
  TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX,
  COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX,
  SETTINGS_COOKIE_NAME,
  CHAPTER_PAGE_TRANSLATOR_FIELD_NAME,
  DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR,
  QMARK_TO_COMMA_FIELD_NAME,
  ENGLISH_LTS_LANGUAGE_NAME,
  LTS_FIELD_NAME_SUFFIX,
  HINDI_LTS_LANGUAGE_NAME,
  FULL_WINDOW_WIDTH_FIELD_NAME,
} from "../constants/constants";
// LS is abbr. for Language Selections
import {
  gitaAppCookieT,
  LSCookieElementT,
  NUM_KEYS_IN_AUTHORIDNAME,
} from "./addltypes-d";

export function createGitaAppCookie(formData: FormData) {
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

    for (let j = 0; j < numTranslators; j++) {
      let key = `${allGitaLanguages[languageIndex].id}${TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][id]`;
      const value = formData.get(key);
      lSCookieElement.selectedTranslators.push(value?.toString()!);
    }
    for (let j = 0; j < numCommentators; j++) {
      let key = `${allGitaLanguages[languageIndex].id}${COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][id]`;
      const value = formData.get(key);
      lSCookieElement.selectedCommentators.push(value?.toString()!);
    }
    lSCookie.push(lSCookieElement);
  }
  console.log("lSCookie", lSCookie);

  const chapterPageTranslatorAuthorIdValue = formData.get(
    `${CHAPTER_PAGE_TRANSLATOR_FIELD_NAME}[authorId]`
  );
  let chapterPageTranslatorAuthorIdStr =
    chapterPageTranslatorAuthorIdValue?.toString() ||
    DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR;

  const isQMarkToCommaChecked = formData.has(`${QMARK_TO_COMMA_FIELD_NAME}`);
  const englishLTSChecked = formData.has(
    `${ENGLISH_LTS_LANGUAGE_NAME}${LTS_FIELD_NAME_SUFFIX}`
  );
  const hindiLTSChecked = formData.has(
    `${HINDI_LTS_LANGUAGE_NAME}${LTS_FIELD_NAME_SUFFIX}`
  );
  const fullWindowWidthChecked = formData.has(
    `${FULL_WINDOW_WIDTH_FIELD_NAME}`
  );

  const gitaAppCookie: gitaAppCookieT = {
    lSCookie,
    chapterPageTranslatorAuthorIdStr,
    qMarkToCommaChecked: isQMarkToCommaChecked,
    englishLTSChecked,
    hindiLTSChecked,
    fullWindowWidthChecked,
  };

  setCookie(SETTINGS_COOKIE_NAME, JSON.stringify(gitaAppCookie));
  // cookies().set(SETTINGS_COOKIE_NAME, JSON.stringify(gitaAppCookie));
  // await setTimeout(2000);
}
