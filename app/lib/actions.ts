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
import { LanguageSelectionsCookieElementT } from "./addltypes-d";

export async function createLanguageSelectionsCookie(formData: FormData) {
  let languageSelectionsCookie: LanguageSelectionsCookieElementT[] = [];
  for (
    let languageIndex = 0;
    languageIndex < allGitaLanguages.length;
    languageIndex++
  ) {
    let languageSelectionsCookieElement: LanguageSelectionsCookieElementT | null =
      null;
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
      ? Math.floor(countTranslatorKeys / 2)
      : 0;
    let numCommentators = countCommentatorKeys
      ? Math.floor(countCommentatorKeys / 2)
      : 0;

    languageSelectionsCookieElement = {
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
        languageSelectionsCookieElement.selectedTranslators.push(
          value?.toString()!
        );
      }
    }
    if (isLanguageChecked) {
      for (let j = 0; j < numCommentators; j++) {
        let key = `${allGitaLanguages[languageIndex].id}${COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][id]`;
        const value = formData.get(key);
        languageSelectionsCookieElement.selectedCommentators.push(
          value?.toString()!
        );
      }
    }
    languageSelectionsCookie.push(languageSelectionsCookieElement);
  }
  console.log("LanguageSelectionsCookie", languageSelectionsCookie);
  cookies().set(
    LANGUAGE_SELECTIONS_COOKIE_NAME,
    JSON.stringify(languageSelectionsCookie)
  );
  // await setTimeout(2000);
}
