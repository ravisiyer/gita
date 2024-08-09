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
