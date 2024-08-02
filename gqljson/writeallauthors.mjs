import { writeFileSync } from "fs";
import { ALL_AUTHORS_FILEPATH } from "./jsonconstants.mjs";
import { getAllAuthors } from "./jsondata.mjs";

let data = await getAllAuthors();
const dataJSON = JSON.stringify(data);
writeFileSync(ALL_AUTHORS_FILEPATH, dataJSON);
console.log(`Wrote ${ALL_AUTHORS_FILEPATH}`);
