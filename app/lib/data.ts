import { gql } from "@apollo/client";
import createApolloClient from "@/apolloClient";
import { GRAPHQL_URI } from "@/app/constants/constants";

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

export async function getChapter(
  chapterNumber: string,
  authorId: string = "16"
) {
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
                gitaTranslationsByVerseId(condition: { authorId: ${authorId} }, first: 1) {
                  nodes {
                    description
                    verseId
                    authorId
                    authorName
                    language
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
                languageId
              }
            }
            gitaCommentariesByVerseId(orderBy: LANGUAGE_ID_ASC) {
              nodes {
                authorId
                authorName
                description
                language
                languageId
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
