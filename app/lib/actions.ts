"use server";
import { cookies } from "next/headers";
import { allGitaLanguages } from "../alllanguages";
// import { setTimeout } from "timers/promises";
import { allAuthorsByLanguageId } from "../allauthorsbylanguageid";
import { authorsForLanguageT } from "../lib/addltypes-d";

// Move to const file
const languageCheckboxLSC_NameSuffix = "check";
const translatorsListBoxLSC_NameSuffix = "Transl";
const commentatorsListBoxLSC_NameSuffix = "Commnt";

export async function createLanguageSelectionsCookie(formData: FormData) {
  let selectedLanguageIds = Array(0);
  let x = "";
  let msg = "";
  for (let i = 0; i < allGitaLanguages.length; i++) {
    // const tmp = formData.get(`custom-input-${i}`);
    // tmp && selectedLanguageIds.push(tmp);
    let countTranslatorKeys = 0;
    let countCommentatorKeys = 0;
    for (let key of formData.keys()) {
      key.startsWith(
        `${allGitaLanguages[i].id}${translatorsListBoxLSC_NameSuffix}[`
      )
        ? countTranslatorKeys++
        : key.startsWith(
            `${allGitaLanguages[i].id}${commentatorsListBoxLSC_NameSuffix}[`
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

    msg +=
      `Language: ${allGitaLanguages[i].language} checkbox is ` +
      (formData.has(
        `${allGitaLanguages[i].id}${languageCheckboxLSC_NameSuffix}`
      )
        ? "checked. "
        : "unchecked. ");
    msg += "\n";
    msg += `${numTranslators} translator(s) selected: `;
    for (let j = 0; j < numTranslators; j++) {
      let key = `${allGitaLanguages[i].id}${translatorsListBoxLSC_NameSuffix}[${j}][name]`;
      msg += formData.get(key) + ", ";
    }
    msg += "\n";
    msg += `${numCommentators} commentator(s) selected: `;
    for (let j = 0; j < numCommentators; j++) {
      let key = `${allGitaLanguages[i].id}${commentatorsListBoxLSC_NameSuffix}[${j}][name]`;
      msg += formData.get(key) + ", ";
    }
    msg += "\n---------\n";
  }
  console.log("LanguageSelections", msg);
  // cookies().set("LanguageSelections", msg);
  // cookies().set("selectedLanguageIds", JSON.stringify(selectedLanguageIds));
  // await setTimeout(2000);
}
// export async function createLanguageIdsCookie(formData: FormData) {
//   let selectedLanguageIds = Array(0);
//   let x = "";
//   for (let i = 0; i < allGitaLanguages.length; i++) {
//     const tmp = formData.get(`custom-input-${i}`);
//     tmp && selectedLanguageIds.push(tmp);
//   }
//   // console.log(`selectedLanguageIds: ${selectedLanguageIds}`);
//   cookies().set("selectedLanguageIds", JSON.stringify(selectedLanguageIds));
//   // await setTimeout(2000);
// }
