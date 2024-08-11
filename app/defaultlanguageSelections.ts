import { LSCookieElementT } from "./lib/addltypes-d";
// LS is abbr. for Language Selections
export const defaultLSInCookieFormat: LSCookieElementT[] = [
  {
    languageId: 1,
    selectedTranslators: ["16", "18"],
    selectedCommentators: ["16"],
  },
  {
    languageId: 2,
    selectedTranslators: ["1"],
    selectedCommentators: ["1"],
  },
  {
    languageId: 3,
    selectedTranslators: [],
    selectedCommentators: [],
  },
];
