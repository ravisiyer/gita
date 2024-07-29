"use server";
import { cookies } from "next/headers";
import { allGitaLanguages } from "../alllanguages";
import { redirect } from "next/navigation";

export async function createLanguageIdsCookie(formData: FormData) {
  // let selectedLanguageIds = Array(allGitaLanguages.length).fill(0);
  let selectedLanguageIds = Array(0);
  let x = "";
  for (let i = 0; i < allGitaLanguages.length; i++) {
    // selectedLanguageIds[i] = formData.get(`custom-input-${i}`);
    const tmp = formData.get(`custom-input-${i}`);
    tmp && selectedLanguageIds.push(tmp);
    // y ? (x += y) : null;
  }
  console.log(`selectedLangaugeIds: ${selectedLanguageIds}`);
  // console.log(`x: ${x}`);
  cookies().set("selectedLangaugeIds", JSON.stringify(selectedLanguageIds));
  // cookies().set("selectedLangaugeIdsx", x);
  redirect("/verse/1");
}
