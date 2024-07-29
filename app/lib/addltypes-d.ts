import { GitaLanguage } from "./gqltypes-d";

export type GitaLanguageConstant = Omit<
  GitaLanguage,
  "nodeId" | "gitaTranslationsByLanguageId" | "gitaCommentariesByLanguageId"
>;
