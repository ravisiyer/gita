import { authorsForLanguageT } from "./lib/addltypes-d";
import { LanguageSelectionsCookieElementT } from "./lib/addltypes-d";
export const defaultLanguageSelectionsInCookieFormat: LanguageSelectionsCookieElementT[] =
  [
    {
      languageId: 1,
      selectedTranslators: ["16", "18"],
      // translatorAuthors: [
      //   { id: 16, name: "Swami Sivananda" },
      //   { id: 18, name: "Swami Adidevananda" },
      // ],
      selectedCommentators: ["16"],
      // commentatorAuthors: [{ id: 16, name: "Swami Sivananda" }],
    },
    {
      languageId: 2,
      selectedTranslators: ["1"],
      // translatorAuthors: [{ id: 1, name: "Swami Ramsukhdas" }],
      selectedCommentators: ["1"],
      // commentatorAuthors: [{ id: 1, name: "Swami Ramsukhdas" }],
    },
    {
      languageId: 3,
      selectedTranslators: [],
      // translatorAuthors: [],
      selectedCommentators: [],
      // commentatorAuthors: [],
    },
  ];
