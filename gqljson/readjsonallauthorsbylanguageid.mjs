import { readFileSync } from "fs";
import { ALL_AUTHORS_BY_LANGUAGEID_FILEPATH } from "./jsonconstants.mjs";

const dataJSON = readFileSync(ALL_AUTHORS_BY_LANGUAGEID_FILEPATH);
const allAuthorsByLanguageId = JSON.parse(dataJSON);
console.log(allAuthorsByLanguageId.length);
allAuthorsByLanguageId.map((entry) => {
  console.log(`Language Id: ${entry.languageId}`);
  let numCommentaries = 0;
  let numTranslations = 0;
  entry.allGitaAuthorsForLanguageId.map((gitaAuthor) => {
    if (gitaAuthor.gitaCommentariesByAuthorId.totalCount) {
      numCommentaries++;
      console.log(`Commentary by ${gitaAuthor.name}`);
    }
    if (gitaAuthor.gitaTranslationsByAuthorId.totalCount) {
      numTranslations++;
      console.log(`Translation by ${gitaAuthor.name}`);
    }
  });
  console.log(
    `For Language Id: ${entry.languageId} : numCommentaries is ${numCommentaries}` +
      ` and numTranslations is ${numTranslations}`
  );
  console.log(
    "================================================================"
  );
});
