import pkg from "@apollo/client";
const { ApolloClient, InMemoryCache } = pkg;
// Above style to avoid node.js console execution error about @apollo/client being a commonJS module

import { GRAPHQL_URI } from "./jsonconstants.mjs";

const createApolloClient = () => {
  return new ApolloClient({
    uri: GRAPHQL_URI,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
