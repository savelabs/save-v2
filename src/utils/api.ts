import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

export const clientGraphql = new ApolloClient({
  uri: 'https://save.oulu.ifrn.edu.br/graphql',
  cache: new InMemoryCache()
});
