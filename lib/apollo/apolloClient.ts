import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { errorLink } from "@/lib/apollo/links/errorLink";
import { authLink } from "@/lib/apollo/links/authLink";
import { httpLink } from "@/lib/apollo/links/httpLink";

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
