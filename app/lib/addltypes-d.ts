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

export type LanguageSelectionsCookieElementT = {
  languageId: number | undefined;
  selectedTranslators: string[]; //authorId as string
  selectedCommentators: string[]; //authorId as string
};
