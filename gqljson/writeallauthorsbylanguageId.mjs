import { writeFileSync } from "fs";
import { ALL_AUTHORS_BY_LANGUAGEID_FILEPATH } from "./jsonconstants.mjs";
import { getAllLanguages, getAuthorsByLanguageId } from "./jsondata.mjs";

let dataLanguages = await getAllLanguages();
let allAuthorsByLanguageId = Array(dataLanguages.allGitaLanguages.length);
await Promise.all(
  dataLanguages.allGitaLanguages.map(async (gitaLanguage, index) => {
    const dataAuthors = await getAuthorsByLanguageId(gitaLanguage.id);
    allAuthorsByLanguageId[index] = {
      languageId: gitaLanguage.id,
      allGitaAuthorsForLanguageId: dataAuthors.allGitaAuthorsForLanguageId,
    };
    // push sometimes results in languageId 3 coming before 2 in the array.
    // Want to avoid that.
    // allAuthorsByLanguageId.push({
    //   languageId: gitaLanguage.id,
    //   allGitaAuthorsForLanguageId: dataAuthors.allGitaAuthorsForLanguageId,
    // });
  })
);

const dataJSON = JSON.stringify(allAuthorsByLanguageId);
writeFileSync(ALL_AUTHORS_BY_LANGUAGEID_FILEPATH, dataJSON);
console.log(`Wrote ${ALL_AUTHORS_BY_LANGUAGEID_FILEPATH}`);
