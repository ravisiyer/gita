import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URI } from "@/app/constants";

const createApolloClient = () => {
  return new ApolloClient({
    uri: GRAPHQL_URI,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
