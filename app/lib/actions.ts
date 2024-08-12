"use server";
import { cookies } from "next/headers";
import { allGitaLanguages } from "../alllanguages";
// import { setTimeout } from "timers/promises";
import {
  LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX,
  TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX,
  COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX,
  LANGUAGE_SELECTIONS_COOKIE_NAME,
} from "../constants";
// LS is abbr. for Language Selections
import { LSCookieElementT, NUM_KEYS_IN_AUTHORIDNAME } from "./addltypes-d";

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
  cookies().set(LANGUAGE_SELECTIONS_COOKIE_NAME, JSON.stringify(lSCookie));
  // await setTimeout(2000);
}
