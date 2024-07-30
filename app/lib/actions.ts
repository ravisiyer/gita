"use server";
import { cookies } from "next/headers";
import { allGitaLanguages } from "../alllanguages";
// import { setTimeout } from "timers/promises";

export async function createLanguageIdsCookie(formData: FormData) {
  let selectedLanguageIds = Array(0);
  let x = "";
  for (let i = 0; i < allGitaLanguages.length; i++) {
    const tmp = formData.get(`custom-input-${i}`);
    tmp && selectedLanguageIds.push(tmp);
  }
  // console.log(`selectedLanguageIds: ${selectedLanguageIds}`);
  cookies().set("selectedLanguageIds", JSON.stringify(selectedLanguageIds));
  // await setTimeout(2000);
}
