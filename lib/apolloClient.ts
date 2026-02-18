import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "./authStore";
import { refreshTokens } from "@/lib/refreshTokens";
import { ErrorLink } from "@apollo/client/link/error";

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (error && "statusCode" in error && error.statusCode === 401) {
    return new Observable((observer) => {
      refreshTokens().then((newToken) => {
        if (!newToken) {
          observer.error(error);
          return;
        }

        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: `Bearer ${newToken}`,
          },
        }));

        forward(operation).subscribe(observer);
      });
    });
  }
});


// HTTP link
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  // credentials: "include",
});

const authLink = setContext((_, prevContext) => {
  const token = getAccessToken();
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo Client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink,authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
