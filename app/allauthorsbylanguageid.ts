import { GitaLanguage, GitaAuthor } from "./lib/gqltypes-d";
// Hard-coded query results for simplicity of Settings client component code.
// Main data picked up from gqljson/jsondata/allAuthorsByLanguageId.json which is auto created
// by a small console based program gqljson/writeallauthorsbylanguageid.mjs
// Later consider using client side Apollo client code to pick up data from GraphQL source directly

// Subset is needed to handle nested GitaCommentariesConnection and GitaTranslationsConnection partial
// data in allAuthorsByLanguageID object defined below.
// Ref: Making TypeScript's Partial type work for nested objects, https://grrr.tech/posts/2021/typescript-partial/
type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};

export type allAuthorsByLanguageIdT = {
  languageId: GitaLanguage["id"];
  allGitaAuthorsForLanguageId: Subset<GitaAuthor>[];
};

export const allAuthorsByLanguageId: allAuthorsByLanguageIdT[] = [
  {
    languageId: 1,
    allGitaAuthorsForLanguageId: [
      {
        __typename: "GitaAuthor",
        id: 1,
        name: "Swami Ramsukhdas",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 2,
        name: "Swami Chinmayananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 3,
        name: "Sri Anandgiri",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 4,
        name: "Sri Dhanpati",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 5,
        name: "Sri Madhavacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 6,
        name: "Sri Neelkanth",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 7,
        name: "Sri Ramanujacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 8,
        name: "Sri Sridhara Swami",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 9,
        name: "Sri Vedantadeshikacharya Venkatanatha",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 10,
        name: "Sri Abhinavgupta",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 11,
        name: "Sri Jayatritha",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 12,
        name: "Sri Madhusudan Saraswati",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 13,
        name: "Sri Purushottamji",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 14,
        name: "Sri Shankaracharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 15,
        name: "Sri Vallabhacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 16,
        name: "Swami Sivananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 701,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 17,
        name: "Swami Tejomayananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 18,
        name: "Swami Adidevananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 701,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 19,
        name: "Swami Gambirananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 701,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 20,
        name: "Dr. S. Sankaranarayan",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 701,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 21,
        name: "Shri Purohit Swami",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 701,
        },
      },
    ],
  },
  {
    languageId: 2,
    allGitaAuthorsForLanguageId: [
      {
        __typename: "GitaAuthor",
        id: 1,
        name: "Swami Ramsukhdas",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 701,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 2,
        name: "Swami Chinmayananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 3,
        name: "Sri Anandgiri",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 4,
        name: "Sri Dhanpati",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 5,
        name: "Sri Madhavacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 6,
        name: "Sri Neelkanth",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 7,
        name: "Sri Ramanujacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 8,
        name: "Sri Sridhara Swami",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 9,
        name: "Sri Vedantadeshikacharya Venkatanatha",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 10,
        name: "Sri Abhinavgupta",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 11,
        name: "Sri Jayatritha",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 12,
        name: "Sri Madhusudan Saraswati",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 13,
        name: "Sri Purushottamji",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 14,
        name: "Sri Shankaracharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 15,
        name: "Sri Vallabhacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 16,
        name: "Swami Sivananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 17,
        name: "Swami Tejomayananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 701,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 18,
        name: "Swami Adidevananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 19,
        name: "Swami Gambirananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 20,
        name: "Dr. S. Sankaranarayan",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 21,
        name: "Shri Purohit Swami",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
    ],
  },
  {
    languageId: 3,
    allGitaAuthorsForLanguageId: [
      {
        __typename: "GitaAuthor",
        id: 1,
        name: "Swami Ramsukhdas",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 2,
        name: "Swami Chinmayananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 3,
        name: "Sri Anandgiri",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 4,
        name: "Sri Dhanpati",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 5,
        name: "Sri Madhavacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 6,
        name: "Sri Neelkanth",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 7,
        name: "Sri Ramanujacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 8,
        name: "Sri Sridhara Swami",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 9,
        name: "Sri Vedantadeshikacharya Venkatanatha",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 671,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 10,
        name: "Sri Abhinavgupta",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 11,
        name: "Sri Jayatritha",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 12,
        name: "Sri Madhusudan Saraswati",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 13,
        name: "Sri Purushottamji",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 14,
        name: "Sri Shankaracharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 15,
        name: "Sri Vallabhacharya",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 701,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 16,
        name: "Swami Sivananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 17,
        name: "Swami Tejomayananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 18,
        name: "Swami Adidevananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 19,
        name: "Swami Gambirananda",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 20,
        name: "Dr. S. Sankaranarayan",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
      {
        __typename: "GitaAuthor",
        id: 21,
        name: "Shri Purohit Swami",
        gitaCommentariesByAuthorId: {
          __typename: "GitaCommentariesConnection",
          totalCount: 0,
        },
        gitaTranslationsByAuthorId: {
          __typename: "GitaTranslationsConnection",
          totalCount: 0,
        },
      },
    ],
  },
];
