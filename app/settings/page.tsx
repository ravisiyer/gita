// "use client";
import { allGitaLanguages } from "../alllanguages";
import { capitalizeFirstLetter } from "../lib/util";
import { allAuthorsByLanguageId } from "../allauthorsbylanguageid";
import { GitaAuthor } from "../lib/gqltypes-d";
import { authorsForLanguageT } from "../lib/addltypes-d";

import Settings from "../ui/settings";

function validateLanguagesData() {
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
const selectedAuthorsForAllLanguages: Partial<authorsForLanguageT>[] = [
  {
    languageId: 1,
    commentatorAuthors: [{ id: 16, name: "Swami Sivananda" }],
    translatorAuthors: [
      { id: 16, name: "Swami Sivananda" },
      { id: 18, name: "Swami Adidevananda" },
    ],
  },
  {
    languageId: 2,
    commentatorAuthors: [{ id: 1, name: "Swami Ramsukhdas" }],
    translatorAuthors: [{ id: 1, name: "Swami Ramsukhdas" }],
  },
  {
    languageId: 3,
    commentatorAuthors: [],
    translatorAuthors: [],
  },
];
function setupAuthorsForAllLanguages() {
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

function Page() {
  let isLanguagesDataValid = validateLanguagesData();
  let authorsForAllLanguages: authorsForLanguageT[] = [];
  if (isLanguagesDataValid) {
    authorsForAllLanguages = setupAuthorsForAllLanguages();
    if (authorsForAllLanguages.length === 0) {
      isLanguagesDataValid = false;
    }
  }

  return isLanguagesDataValid ? (
    <Settings
      authorsForAllLanguages={authorsForAllLanguages}
      selectedAuthorsForAllLanguages={selectedAuthorsForAllLanguages}
    />
  ) : (
    <div className="px-4 pb-4">
      <p>
        Sorry! Web app. error! Languages data is not valid. This page cannot be
        shown.
      </p>
    </div>
  );
}
export default Page;
