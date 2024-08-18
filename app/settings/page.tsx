import { authorsForLanguageT, gitaAppCookieT } from "../lib/addltypes-d";
import { cookies } from "next/headers";
import {
  DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR,
  DEFAULT_ENGLISH_LTS_CHECKED,
  DEFAULT_FULL_WINDOW_WIDTH_CHECKED,
  DEFAULT_HINDI_LTS_CHECKED,
  DEFAULT_QMARK_TO_COMMA_VALUE,
  SETTINGS_COOKIE_NAME,
} from "../constants/constants";
import { LSCookieElementT } from "../lib/addltypes-d";
// LS is abbr. for Language Selections
import { defaultLSInCookieFormat } from "../constants/defaultlanguageSelections";
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
  let gitaAppCookie: gitaAppCookieT = tmp ? JSON.parse(tmp) : tmp;
  // lSCookie is abbr. for languageSelectionsCookie
  let lSCookie: LSCookieElementT[] = gitaAppCookie
    ? gitaAppCookie.lSCookie
    : [];
  let chapterPageTranslatorAuthorIdStr = gitaAppCookie
    ? gitaAppCookie.chapterPageTranslatorAuthorIdStr
    : DEFAULT_CHAPTER_PAGE_TRANSLATOR_AUTHOR_ID_STR;
  let qMarkToCommaChecked = gitaAppCookie
    ? gitaAppCookie.qMarkToCommaChecked
    : DEFAULT_QMARK_TO_COMMA_VALUE;
  let englishLTSChecked = gitaAppCookie
    ? gitaAppCookie.englishLTSChecked
    : DEFAULT_ENGLISH_LTS_CHECKED;
  let hindiLTSChecked = gitaAppCookie
    ? gitaAppCookie.hindiLTSChecked
    : DEFAULT_HINDI_LTS_CHECKED;
  let fullWindowWidthChecked = gitaAppCookie
    ? gitaAppCookie.fullWindowWidthChecked
    : DEFAULT_FULL_WINDOW_WIDTH_CHECKED;

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
      initialChapterPageTranslatorAuthorIdStr={chapterPageTranslatorAuthorIdStr}
      initialQMarkToCommaChecked={qMarkToCommaChecked}
      initialEnglishLTSChecked={englishLTSChecked}
      initialHindiLTSChecked={hindiLTSChecked}
      initialFullWindowWidthChecked={fullWindowWidthChecked}
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
