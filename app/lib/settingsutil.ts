import { authorsForLanguageT } from "./addltypes-d";
import { allAuthorsByLanguageId } from "../allauthorsbylanguageid";
import { GitaAuthor } from "./gqltypes-d";
import { capitalizeFirstLetter } from "./util";
import { allGitaLanguages } from "../alllanguages";
import { allGitaAuthors } from "../allauthors";
import { LanguageSelectionsCookieElementT } from "./addltypes-d";
import { defaultLanguageSelectionsInCookieFormat } from "../defaultlanguageSelections";

export function validateLanguagesData() {
  // return false; //For testing ... Test case works as error page is shown
  const MAX_LANGUAGES_SUPPORTED = 3; // Program code limitation as of now
  if (
    !allGitaLanguages.length ||
    allGitaLanguages.length > MAX_LANGUAGES_SUPPORTED
  ) {
    return false;
  }
  if (allGitaLanguages.length !== allAuthorsByLanguageId.length) {
    return false;
  }
  // Not only do both these variables (constants) have to have same number of
  // entries, but the order of the entries of both should be in languageId order
  // and the languageIds should match.
  allGitaLanguages.map((gitaLanguage, index) => {
    if (gitaLanguage.id !== allAuthorsByLanguageId[index].languageId) {
      return false;
    }
  });
  return true;
}

export function setupAuthorsForAllLanguages() {
  let authorsForAllLanguages: authorsForLanguageT[] = [];
  allAuthorsByLanguageId.map((authorByLanguageId, index) => {
    let numCommentators = 0;
    let numTranslators = 0;
    let commentatorAuthors: Partial<GitaAuthor>[] = Array(0);
    let translatorAuthors: Partial<GitaAuthor>[] = Array(0);
    authorByLanguageId.allGitaAuthorsForLanguageId.map((gitaAuthor) => {
      if (gitaAuthor?.gitaCommentariesByAuthorId?.totalCount) {
        commentatorAuthors.push({ id: gitaAuthor.id, name: gitaAuthor.name });
        numCommentators++;
      }
      if (gitaAuthor?.gitaTranslationsByAuthorId?.totalCount) {
        translatorAuthors.push({ id: gitaAuthor.id, name: gitaAuthor.name });
        numTranslators++;
      }
    });
    let authorsForLanguage: authorsForLanguageT = {
      languageId: authorByLanguageId.languageId,
      languageName: capitalizeFirstLetter(allGitaLanguages[index].language!),
      commentatorAuthors,
      translatorAuthors,
    };
    authorsForAllLanguages.push(authorsForLanguage);
  });
  return authorsForAllLanguages;
}

export function getAuthorByIdString(idString: string) {
  const id = parseInt(idString);
  return allGitaAuthors.find((author) => author.id === id);
}

export function validateLanguageSelectionsCookie(
  languageSelectionsCookie: LanguageSelectionsCookieElementT[]
) {
  // return languageSelectionsCookie.length === allGitaLanguages.length;
  if (languageSelectionsCookie.length !== allGitaLanguages.length) {
    return false;
  }
  // let languageSelected = false;
  const languageSelected = languageSelectionsCookie.some(
    (languageSelectionCookieElement) =>
      languageSelectionCookieElement.selectedTranslators.length ||
      languageSelectionCookieElement.selectedCommentators.length
  );
  console.log(
    `In validateLanguageSelectionsCookie: languageSelected is: ${languageSelected}`
  );
  return languageSelected;
}

// export function setupDefaultSelectedAuthorsForAllLanguages() {
//   // let languageSelectionsCookie = defaultLanguageSelectionsInCookieFormat;

//   // let selectedAuthorsForAllLanguages: authorsForLanguageT[] = [];
//   // if (isLanguageSelectionsCookieValid) {
//   //   defaultSelectedAuthorsForAllLanguages =
//   return setupSelectedAuthorsForAllLanguagesFromCookie(
//     defaultLanguageSelectionsInCookieFormat
//   );
//   // }
// }
export function setupSelectedAuthorsForAllLanguagesFromCookie(
  languageSelectionsCookie: LanguageSelectionsCookieElementT[]
) {
  let selectedAuthorsForAllLanguages: authorsForLanguageT[] = [];
  languageSelectionsCookie.map((languageSelectionsCookieElement, index) => {
    const languageId = languageSelectionsCookieElement.languageId;
    const language = allGitaLanguages.find(
      (element) => element.id === languageId
    );
    const languageName = language?.language;
    let commentatorAuthors: Partial<GitaAuthor>[] = Array(0);
    let translatorAuthors: Partial<GitaAuthor>[] = Array(0);
    languageSelectionsCookieElement.selectedCommentators.map(
      (authorIdString) => {
        const author = getAuthorByIdString(authorIdString);
        if (author !== undefined) {
          commentatorAuthors.push(author);
        }
      }
    );
    languageSelectionsCookieElement.selectedTranslators.map(
      (authorIdString) => {
        const author = getAuthorByIdString(authorIdString);
        if (author !== undefined) {
          translatorAuthors.push(author);
        }
      }
    );
    let authorsForLanguage: authorsForLanguageT = {
      languageId: languageId!,
      languageName: capitalizeFirstLetter(languageName!),
      commentatorAuthors,
      translatorAuthors,
    };
    selectedAuthorsForAllLanguages.push(authorsForLanguage);
  });
  return selectedAuthorsForAllLanguages;
}

export function setupDefaultSelectedAuthorsForAllLanguages() {
  // let languageSelectionsCookie = defaultLanguageSelectionsInCookieFormat;

  // let selectedAuthorsForAllLanguages: authorsForLanguageT[] = [];
  // if (isLanguageSelectionsCookieValid) {
  //   defaultSelectedAuthorsForAllLanguages =
  return setupSelectedAuthorsForAllLanguagesFromCookie(
    defaultLanguageSelectionsInCookieFormat
  );
  // }
}
