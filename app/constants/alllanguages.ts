import { GitaLanguage } from "../lib/gqltypes-d";
// Hard-coded query results for simplicity of Settings client component code.
// Main data picked up from gqljson/jsondata/allLanguages.json which is auto created
// by a small console based program gqljson/writealllanguages.mjs
// Later consider using client side Apollo client code to pick up data from GraphQL source directly
export const allGitaLanguages: Partial<GitaLanguage>[] = [
  { __typename: "GitaLanguage", id: 1, language: "english" },
  { __typename: "GitaLanguage", id: 2, language: "hindi" },
  { __typename: "GitaLanguage", id: 3, language: "sanskrit" },
];
