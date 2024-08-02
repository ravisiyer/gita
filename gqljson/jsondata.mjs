import pkg from "@apollo/client";
const { gql } = pkg;
// Above style to avoid node.js console execution error about @apollo/client being a commonJS module
import createApolloClient from "./apolloclient.mjs";
import { GRAPHQL_URI } from "./jsonconstants.mjs";

export async function getAllLanguages() {
  const client = createApolloClient();
  try {
    const { data } = await client.query({
      query: gql`
        query {
          allGitaLanguages(orderBy: ID_ASC) {
            nodes {
              id
              language
            }
          }
        }
      `,
    });

    return {
      allGitaLanguages: data.allGitaLanguages.nodes,
    };
  } catch (error) {
    console.error("GraphQL Endpoint Error:", error);
    throw new Error(
      `Failed to fetch all languages from data source (GraphQL endpoint): ${GRAPHQL_URI}`
    );
  }
}

export async function getAllAuthors() {
  const client = createApolloClient();
  try {
    const { data } = await client.query({
      query: gql`
        query {
          allGitaAuthors {
            nodes {
              id
              name
            }
          }
        }
      `,
    });

    return {
      allGitaAuthors: data.allGitaAuthors.nodes,
    };
  } catch (error) {
    console.error("GraphQL Endpoint Error:", error);
    throw new Error(
      `Failed to fetch all Authors from data source (GraphQL endpoint): ${GRAPHQL_URI}`
    );
  }
}

export async function getAuthorsByLanguageId(languageId) {
  const client = createApolloClient();
  try {
    const { data } = await client.query({
      query: gql`
        query {
          allGitaAuthors {
            nodes {
              id
              name
              gitaCommentariesByAuthorId(condition: {languageId: ${languageId}}) {
                totalCount
              }
              gitaTranslationsByAuthorId(condition: {languageId: ${languageId}}) {
                totalCount
              }
            }
          }
        }
      `,
    });

    return {
      allGitaAuthorsForLanguageId: data.allGitaAuthors.nodes,
    };
  } catch (error) {
    console.error("GraphQL Endpoint Error:", error);
    throw new Error(
      `Failed to fetch all Authors for languageId from data source (GraphQL endpoint): ${GRAPHQL_URI}`
    );
  }
}
