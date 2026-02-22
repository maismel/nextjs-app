import { getAccessToken } from "@/lib/authStore";
import { SetContextLink } from "@apollo/client/link/context";

export const authLink = new SetContextLink((prevContext) => {
  const token = getAccessToken();
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
