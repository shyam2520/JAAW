import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
// import { RestLink } from "apollo-link-rest";
import { HttpLink } from "@apollo/client";
const httpLink = new HttpLink({
  uri: "https://kitsu.io/api/graphql",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});