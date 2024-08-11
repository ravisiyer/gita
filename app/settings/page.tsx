// "use client";
import { allGitaLanguages } from "../alllanguages";
import { capitalizeFirstLetter } from "../lib/util";
import { allAuthorsByLanguageId } from "../allauthorsbylanguageid";
import { GitaAuthor } from "../lib/gqltypes-d";
import { authorsForLanguageT } from "../lib/addltypes-d";
import { cookies } from "next/headers";
import { LANGUAGE_SELECTIONS_COOKIE_NAME } from "../constants";
import { LanguageSelectionsCookieElementT } from "../lib/addltypes-d";
import { defaultLanguageSelectionsInCookieFormat } from "../defaultlanguageSelections";
import { allGitaAuthors } from "../allauthors";
import Settings from "../ui/settings";
import {
  setupAuthorsForAllLanguages,
  validateLanguagesData,
  validateLanguageSelectionsCookie,
  setupSelectedAuthorsForAllLanguagesFromCookie,
} from "../lib/settingsutil";

// function validateLanguagesData() {
//   // return false; //For testing ... Test case works as error page is shown
//   const MAX_LANGUAGES_SUPPORTED = 3; // Program code limitation as of now
//   if (
//     !allGitaLanguages.length ||
//     allGitaLanguages.length > MAX_LANGUAGES_SUPPORTED
//   ) {
//     return false;
//   }
//   if (allGitaLanguages.length !== allAuthorsByLanguageId.length) {
//     return false;
//   }
//   // Not only do both these variables (constants) have to have same number of
//   // entries, but the order of the entries of both should be in languageId order
//   // and the languageIds should match.
//   allGitaLanguages.map((gitaLanguage, index) => {
//     if (gitaLanguage.id !== allAuthorsByLanguageId[index].languageId) {
//       return false;
//     }
//   });
//   return true;
// }
// const selectedAuthorsForAllLanguages: Partial<authorsForLanguageT>[] = [
//   {
//     languageId: 1,
//     commentatorAuthors: [{ id: 16, name: "Swami Sivananda" }],
//     translatorAuthors: [
//       { id: 16, name: "Swami Sivananda" },
//       { id: 18, name: "Swami Adidevananda" },
//     ],
//   },
//   {
//     languageId: 2,
//     commentatorAuthors: [{ id: 1, name: "Swami Ramsukhdas" }],
//     translatorAuthors: [{ id: 1, name: "Swami Ramsukhdas" }],
//   },
//   {
//     languageId: 3,
//     commentatorAuthors: [],
//     translatorAuthors: [],
//   },
// ];
// function setupAuthorsForAllLanguages() {
//   let authorsForAllLanguages: authorsForLanguageT[] = [];
//   allAuthorsByLanguageId.map((authorByLanguageId, index) => {
//     let numCommentators = 0;
//     let numTranslators = 0;
//     let commentatorAuthors: Partial<GitaAuthor>[] = Array(0);
//     let translatorAuthors: Partial<GitaAuthor>[] = Array(0);
//     authorByLanguageId.allGitaAuthorsForLanguageId.map((gitaAuthor) => {
//       if (gitaAuthor?.gitaCommentariesByAuthorId?.totalCount) {
//         commentatorAuthors.push({ id: gitaAuthor.id, name: gitaAuthor.name });
//         numCommentators++;
//       }
//       if (gitaAuthor?.gitaTranslationsByAuthorId?.totalCount) {
//         translatorAuthors.push({ id: gitaAuthor.id, name: gitaAuthor.name });
//         numTranslators++;
//       }
//     });
//     let authorsForLanguage: authorsForLanguageT = {
//       languageId: authorByLanguageId.languageId,
//       languageName: capitalizeFirstLetter(allGitaLanguages[index].language!),
//       commentatorAuthors,
//       translatorAuthors,
//     };
//     authorsForAllLanguages.push(authorsForLanguage);
//   });
//   return authorsForAllLanguages;
// }
// function getAuthorByIdString(idString: string) {
//   const id = parseInt(idString);
//   return allGitaAuthors.find((author) => author.id === id);
// }

// function validateLanguageSelectionsCookie(
//   languageSelectionsCookie: LanguageSelectionsCookieElementT[]
// ) {
//   // return languageSelectionsCookie.length === allGitaLanguages.length;
//   if (languageSelectionsCookie.length !== allGitaLanguages.length) {
//     return false;
//   }
//   // let languageSelected = false;
//   const languageSelected = languageSelectionsCookie.some(
//     (languageSelectionCookieElement) =>
//       languageSelectionCookieElement.selectedTranslators.length ||
//       languageSelectionCookieElement.selectedCommentators.length
//   );
//   console.log(
//     `In validateLanguageSelectionsCookie: languageSelected is: ${languageSelected}`
//   );
//   return languageSelected;
// }

// function setupSelectedAuthorsForAllLanguagesFromCookie(
//   languageSelectionsCookie: LanguageSelectionsCookieElementT[]
// ) {
//   let selectedAuthorsForAllLanguages: authorsForLanguageT[] = [];
//   languageSelectionsCookie.map((languageSelectionsCookieElement, index) => {
//     const languageId = languageSelectionsCookieElement.languageId;
//     const language = allGitaLanguages.find(
//       (element) => element.id === languageId
//     );
//     const languageName = language?.language;
//     let commentatorAuthors: Partial<GitaAuthor>[] = Array(0);
//     let translatorAuthors: Partial<GitaAuthor>[] = Array(0);
//     languageSelectionsCookieElement.selectedCommentators.map(
//       (authorIdString) => {
//         const author = getAuthorByIdString(authorIdString);
//         if (author !== undefined) {
//           commentatorAuthors.push(author);
//         }
//       }
//     );
//     languageSelectionsCookieElement.selectedTranslators.map(
//       (authorIdString) => {
//         const author = getAuthorByIdString(authorIdString);
//         if (author !== undefined) {
//           translatorAuthors.push(author);
//         }
//       }
//     );
//     let authorsForLanguage: authorsForLanguageT = {
//       languageId: languageId!,
//       languageName: capitalizeFirstLetter(languageName!),
//       commentatorAuthors,
//       translatorAuthors,
//     };
//     selectedAuthorsForAllLanguages.push(authorsForLanguage);
//   });
//   return selectedAuthorsForAllLanguages;
// }

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
  // if (!languageSelectionsCookie.length) {
  //   languageSelectionsCookie = defaultLanguageSelectionsInCookieFormat;
  // }
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
      // initialSelectedAuthorsForAllLanguages={selectedAuthorsForAllLanguages}
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
