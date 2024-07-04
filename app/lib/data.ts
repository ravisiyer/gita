import { gql } from "@apollo/client";
import createApolloClient from "@/apolloClient";
import { GRAPHQL_URI } from "@/app/constants";

export async function getAllChapters() {
  const client = createApolloClient();
  try {
    const { data } = await client.query({
      query: gql`
        query {
          allGitaChapters {
            nodes {
              id
              chapterNumber
              chapterSummary
              chapterSummaryHindi
              name
              nameTranslated
              versesCount
            }
          }
        }
      `,
    });

    return {
      allGitaChapters: data.allGitaChapters.nodes,
    };
  } catch (error) {
    console.error("GraphQL Endpoint Error:", error);
    throw new Error(
      `Failed to fetch all chapters from data source (GraphQL endpoint): ${GRAPHQL_URI}`
    );
  }
}

export async function getChapter(chapterNumber: string) {
  const client = createApolloClient();
  try {
    const { data } = await client.query({
      //Get all verses of chapter along with one (first) English translation (description) for each verse
      // languageId: 1 is English
      query: gql`
      query {
        allGitaChapters(condition: { chapterNumber: ${chapterNumber} }) {
          nodes {
            versesCount
            name
            nameTranslated
            chapterSummary
            chapterSummaryHindi
            gitaVersesByChapterId {
              nodes {
                verseNumber
                transliteration
                id
                text
                wordMeanings
                gitaTranslationsByVerseId(condition: { languageId: 1 }, first: 1) {
                  nodes {
                    description
                    verseId
                    authorName
                  }
                }
              }
            }
          }
        }
      }
      `,
    });

    return {
      gitaChapter: data.allGitaChapters.nodes[0],
    };
  } catch (error) {
    console.error("GraphQL Endpoint Error:", error);
    throw new Error(
      `Failed to fetch chapter from data source (GraphQL endpoint): ${GRAPHQL_URI}`
    );
  }
}

// type GitaTranslationsByVerseIdNode = {
//   authorId: number;
//   authorName: string;
//   description: string;
//   language: string;
// };

// type GitaTranslationsByVerseId = {
//   nodes: GitaTranslationsByVerseIdNode[];
// };

// type GitaCommentariesByVerseIdNode = {
//   authorId: number;
//   authorName: string;
//   description: string;
//   language: string;
// };

// type GitaCommentariesByVerseId = {
//   nodes: GitaCommentariesByVerseIdNode[];
// };

// type GitaVerse = {
//   chapterNumber: number;
//   verseNumber: number;
//   text: string;
//   transliteration: string;
//   wordMeanings: string;
//   gitaTranslationsByVerseId: GitaTranslationsByVerseId;
//   gitaCommentariesByVerseId: GitaCommentariesByVerseId;
// };

export async function getVerse(verseId: string) {
  const client = createApolloClient();
  try {
    const { data } = await client.query({
      //Get verse data for specified verseId
      query: gql`
    query {
      allGitaVerses(condition: { id: ${verseId} }) {
        nodes {
            chapterNumber
            verseNumber
            text
            transliteration
            wordMeanings
            gitaTranslationsByVerseId(orderBy: LANGUAGE_ID_ASC) {
              nodes {
                authorId
                authorName
                description
                language
              }
            }
            gitaCommentariesByVerseId(orderBy: LANGUAGE_ID_ASC) {
              nodes {
                authorId
                authorName
                description
                language
              }
            }
          }
        }
      }
      `,
    });

    return {
      gitaVerse: data.allGitaVerses.nodes[0],
    };
  } catch (error) {
    console.error("GraphQL Endpoint Error:", error);
    throw new Error(
      `Failed to fetch verse from data source (GraphQL endpoint): ${GRAPHQL_URI}`
    );
  }
}
