import { GitaAuthor } from "../lib/gqltypes-d";
// Hard-coded query results for simplicity of Settings client component code.
// Main data picked up from gqljson/jsondata/allAuthors.json which is auto created
// by a small console based program gqljson/writeallauthors.mjs
// Later consider using client side Apollo client code to pick up data from GraphQL source directly
export const allGitaAuthors: Partial<GitaAuthor>[] = [
  { __typename: "GitaAuthor", id: 1, name: "Swami Ramsukhdas" },
  { __typename: "GitaAuthor", id: 2, name: "Swami Chinmayananda" },
  { __typename: "GitaAuthor", id: 3, name: "Sri Anandgiri" },
  { __typename: "GitaAuthor", id: 4, name: "Sri Dhanpati" },
  { __typename: "GitaAuthor", id: 5, name: "Sri Madhavacharya" },
  { __typename: "GitaAuthor", id: 6, name: "Sri Neelkanth" },
  { __typename: "GitaAuthor", id: 7, name: "Sri Ramanujacharya" },
  { __typename: "GitaAuthor", id: 8, name: "Sri Sridhara Swami" },
  {
    __typename: "GitaAuthor",
    id: 9,
    name: "Sri Vedantadeshikacharya Venkatanatha",
  },
  { __typename: "GitaAuthor", id: 10, name: "Sri Abhinavgupta" },
  { __typename: "GitaAuthor", id: 11, name: "Sri Jayatritha" },
  {
    __typename: "GitaAuthor",
    id: 12,
    name: "Sri Madhusudan Saraswati",
  },
  { __typename: "GitaAuthor", id: 13, name: "Sri Purushottamji" },
  { __typename: "GitaAuthor", id: 14, name: "Sri Shankaracharya" },
  { __typename: "GitaAuthor", id: 15, name: "Sri Vallabhacharya" },
  { __typename: "GitaAuthor", id: 16, name: "Swami Sivananda" },
  { __typename: "GitaAuthor", id: 17, name: "Swami Tejomayananda" },
  { __typename: "GitaAuthor", id: 18, name: "Swami Adidevananda" },
  { __typename: "GitaAuthor", id: 19, name: "Swami Gambirananda" },
  { __typename: "GitaAuthor", id: 20, name: "Dr. S. Sankaranarayan" },
  { __typename: "GitaAuthor", id: 21, name: "Shri Purohit Swami" },
];
