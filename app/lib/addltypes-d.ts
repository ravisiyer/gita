import { GitaLanguage, GitaAuthor } from "./gqltypes-d";

export type GitaLanguageConstant = Omit<
  GitaLanguage,
  "nodeId" | "gitaTranslationsByLanguageId" | "gitaCommentariesByLanguageId"
>;

export type authorsForLanguageT = {
  languageId: number;
  languageName: string;
  commentatorAuthors: authorIdNameT[];
  translatorAuthors: authorIdNameT[];
};

export type languageTranslatorAuthorT = {
  authorId: number;
  languageTranslator: string;
};

// LS is abbr. for Language Selections
export type LSCookieElementT = {
  languageId: number | undefined;
  selectedTranslators: string[]; //authorId as string
  selectedCommentators: string[]; //authorId as string
};

export type gitaAppCookieT = {
  lSCookie: LSCookieElementT[];
  chapterPageTranslatorAuthorId: string;
};

export type authorIdNameT = {
  id: number;
  name: string;
};

export const NUM_KEYS_IN_AUTHORIDNAME = 2;
