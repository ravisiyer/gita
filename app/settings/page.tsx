// "use client";
import { authorsForLanguageT } from "../lib/addltypes-d";
import { cookies } from "next/headers";
import { LANGUAGE_SELECTIONS_COOKIE_NAME } from "../constants";
import { LanguageSelectionsCookieElementT } from "../lib/addltypes-d";
import { defaultLanguageSelectionsInCookieFormat } from "../defaultlanguageSelections";
import Settings from "../ui/settings";
import {
  setupAuthorsForAllLanguages,
  validateLanguagesData,
  validateLanguageSelectionsCookie,
  setupSelectedAuthorsForAllLanguagesFromCookie,
} from "../lib/settingsutil";

function Page() {
  const cookieStore = cookies();
  const tmp = cookieStore.get(LANGUAGE_SELECTIONS_COOKIE_NAME)?.value;
  let languageSelectionsCookie: LanguageSelectionsCookieElementT[] = tmp
    ? JSON.parse(tmp)
    : [];
  let isLanguageSelectionsCookieValid = validateLanguageSelectionsCookie(
    languageSelectionsCookie
  );
  if (!isLanguageSelectionsCookieValid) {
    // Is our default LS in Cookie format in sync. with language data and also otherwise valid
    if (
      validateLanguageSelectionsCookie(defaultLanguageSelectionsInCookieFormat)
    ) {
      // then we ignore the user's invalid cookie and use the default LS
      languageSelectionsCookie = defaultLanguageSelectionsInCookieFormat;
      isLanguageSelectionsCookieValid = true;
    }
  }
  let selectedAuthorsForAllLanguages: authorsForLanguageT[] = [];
  if (isLanguageSelectionsCookieValid) {
    selectedAuthorsForAllLanguages =
      setupSelectedAuthorsForAllLanguagesFromCookie(languageSelectionsCookie);
  }
  let isLanguagesDataValid = false;
  if (isLanguageSelectionsCookieValid) {
    isLanguagesDataValid = validateLanguagesData();
  }
  let authorsForAllLanguages: authorsForLanguageT[] = [];
  if (isLanguagesDataValid) {
    authorsForAllLanguages = setupAuthorsForAllLanguages();
    if (authorsForAllLanguages.length === 0) {
      isLanguagesDataValid = false;
    }
  }

  return isLanguageSelectionsCookieValid && isLanguagesDataValid ? (
    <Settings
      authorsForAllLanguages={authorsForAllLanguages}
      selectedAuthorsForAllLanguages={selectedAuthorsForAllLanguages}
    />
  ) : (
    <div className="px-4 pb-4">
      <p>
        Sorry! Web app. error! Program code does not seem to be in sync. with
        languages data. This page cannot be shown.
      </p>
    </div>
  );
}
export default Page;
