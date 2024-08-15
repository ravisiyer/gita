// "use client";
import { authorsForLanguageT, gitaAppCookieT } from "../lib/addltypes-d";
import { cookies } from "next/headers";
import {
  DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID,
  SETTINGS_COOKIE_NAME,
} from "../constants";
import { LSCookieElementT } from "../lib/addltypes-d";
// LS is abbr. for Language Selections
import { defaultLSInCookieFormat } from "../defaultlanguageSelections";
import Settings from "../ui/settings";
import {
  setupAuthorsForAllLanguages,
  validateLanguagesData,
  validateLSCookie,
  setupSAFALFromCookie,
} from "../lib/settingsutil";

function Page() {
  const cookieStore = cookies();
  const tmp = cookieStore.get(SETTINGS_COOKIE_NAME)?.value;
  // lSCookie is abbr. for languageSelectionsCookie
  let gitaAppCookie: gitaAppCookieT = tmp ? JSON.parse(tmp) : tmp;
  let lSCookie: LSCookieElementT[] = gitaAppCookie
    ? gitaAppCookie.lSCookie
    : [];
  let chapterPageTranslatorAuthorId = gitaAppCookie
    ? gitaAppCookie.chapterPageTranslatorAuthorId
    : DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID;
  let islSCookieValid = validateLSCookie(lSCookie);
  if (!islSCookieValid) {
    // Is our default LS in Cookie format in sync. with language data and also otherwise valid
    if (validateLSCookie(defaultLSInCookieFormat)) {
      // then we ignore the user's invalid cookie and use the default LS
      lSCookie = defaultLSInCookieFormat;
      islSCookieValid = true;
    }
  }
  //SAFAL stands for SelectedAuthorsForAllLanguages
  let sAFAL: authorsForLanguageT[] = [];
  if (islSCookieValid) {
    sAFAL = setupSAFALFromCookie(lSCookie);
  }
  let isLanguagesDataValid = false;
  if (islSCookieValid) {
    isLanguagesDataValid = validateLanguagesData();
  }
  let authorsForAllLanguages: authorsForLanguageT[] = [];
  if (isLanguagesDataValid) {
    authorsForAllLanguages = setupAuthorsForAllLanguages();
    if (authorsForAllLanguages.length === 0) {
      isLanguagesDataValid = false;
    }
  }

  return islSCookieValid && isLanguagesDataValid ? (
    <Settings
      authorsForAllLanguages={authorsForAllLanguages}
      sAFAL={sAFAL}
      chapterPageTranslatorAuthorId={chapterPageTranslatorAuthorId}
    />
  ) : (
    <div>
      <h2 className="my-5 text-2xl font-bold">Sorry! Something went wrong!</h2>
      <p className="my-4">
        Program code does not seem to be in sync. with languages data. The
        Settings page cannot be shown.
      </p>
    </div>
  );
}
export default Page;
