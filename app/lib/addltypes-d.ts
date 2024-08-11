import { GitaLanguage, GitaAuthor } from "./gqltypes-d";

export type GitaLanguageConstant = Omit<
  GitaLanguage,
  "nodeId" | "gitaTranslationsByLanguageId" | "gitaCommentariesByLanguageId"
>;

export type authorsForLanguageT = {
  languageId: number;
  languageName: string;
  commentatorAuthors: Partial<GitaAuthor>[];
  translatorAuthors: Partial<GitaAuthor>[];
};

// LS is abbr. for Language Selections
export type LSCookieElementT = {
  languageId: number | undefined;
  selectedTranslators: string[]; //authorId as string
  selectedCommentators: string[]; //authorId as string
};
