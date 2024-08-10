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

type LanguageSelectionsCookieElementT = {
  languageId: number | undefined;
  selectedTranslators: string[]; //authorId as string
  selectedCommentators: string[]; //authorId as string
};

export async function createLanguageSelectionsCookie(formData: FormData) {
  // let msg = "";
  let LanguageSelectionsCookie: LanguageSelectionsCookieElementT[] = [];
  for (
    let languageIndex = 0;
    languageIndex < allGitaLanguages.length;
    languageIndex++
  ) {
    let LanguageSelectionsCookieElement: LanguageSelectionsCookieElementT | null =
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

    // msg +=
    //   `Language: ${allGitaLanguages[languageIndex].language} checkbox is ` +
    //   (formData.has(
    //     `${allGitaLanguages[languageIndex].id}${LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX}`
    //   )
    //     ? "checked. "
    //     : "unchecked. ");
    // msg += "\n";
    formData.has(
      `${allGitaLanguages[languageIndex].id}${LANGUAGE_CHECKBOX_LSC_NAME_SUFFIX}`
    ) &&
      (LanguageSelectionsCookieElement = {
        languageId: allGitaLanguages[languageIndex].id,
        selectedTranslators: [],
        selectedCommentators: [],
      });
    // msg += `${numTranslators} translator(s) selected: `;
    for (let j = 0; j < numTranslators; j++) {
      // let key = `${allGitaLanguages[languageIndex].id}${TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][name]`;
      let key = `${allGitaLanguages[languageIndex].id}${TRANSLATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][id]`;
      const value = formData.get(key);
      // msg += value + ", ";
      LanguageSelectionsCookieElement &&
        LanguageSelectionsCookieElement.selectedTranslators.push(
          value?.toString()!
        );
    }

    // msg += "\n";
    // msg += `${numCommentators} commentator(s) selected: `;
    for (let j = 0; j < numCommentators; j++) {
      let key = `${allGitaLanguages[languageIndex].id}${COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][id]`;
      // let key = `${allGitaLanguages[languageIndex].id}${COMMENTATORS_LISTBOX_LSC_NAME_SUFFIX}[${j}][name]`;
      const value = formData.get(key);
      // msg += value + ", ";
      LanguageSelectionsCookieElement &&
        LanguageSelectionsCookieElement.selectedCommentators.push(
          value?.toString()!
        );
    }
    // msg += "\n---------\n";
    LanguageSelectionsCookieElement &&
      LanguageSelectionsCookie.push(LanguageSelectionsCookieElement);
  }
  // console.log("LanguageSelections", msg);
  console.log("LanguageSelectionsCookie", LanguageSelectionsCookie);
  cookies().set(
    LANGUAGE_SELECTIONS_COOKIE_NAME,
    JSON.stringify(LanguageSelectionsCookie)
  );
  // await setTimeout(2000);
}
