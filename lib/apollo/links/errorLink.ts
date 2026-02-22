import { refreshTokens } from "@/lib/refreshTokens";
import { ErrorLink } from "@apollo/client/link/error";
import { Observable } from "rxjs/internal/Observable";

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
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
