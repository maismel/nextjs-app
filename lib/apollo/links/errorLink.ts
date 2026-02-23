import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { clearTokens } from "@/lib/authStore";

export const errorLink = new ErrorLink(({ error }) => {
  if (error instanceof CombinedGraphQLErrors) {
    for (const err of error.errors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        console.log("UNAUTHENTICATED");
        clearTokens();
        window.location.href = "/auth/login";
      }
    }
  }
});
