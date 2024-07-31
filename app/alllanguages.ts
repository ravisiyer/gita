import { GitaLanguage } from "./lib/gqltypes-d";
// Hard-coded query results for simplicity of Settings client component code.
export const allGitaLanguages: Partial<GitaLanguage>[] = [
  { __typename: "GitaLanguage", id: 1, language: "english" },
  { __typename: "GitaLanguage", id: 2, language: "hindi" },
  { __typename: "GitaLanguage", id: 3, language: "sanskrit" },
];
