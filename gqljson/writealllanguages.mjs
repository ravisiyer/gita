import { writeFileSync } from "fs";
import { ALL_LANGUAGES_FILEPATH } from "./jsonconstants.mjs";
import { getAllLanguages } from "./jsondata.mjs";

let data = await getAllLanguages();
const dataJSON = JSON.stringify(data);
writeFileSync(ALL_LANGUAGES_FILEPATH, dataJSON);
console.log(`Wrote ${ALL_LANGUAGES_FILEPATH}`);
