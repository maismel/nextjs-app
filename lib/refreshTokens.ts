import { apolloClient } from "./apolloClient";
import { UPDATE_TOKEN } from "@/features/auth/api/updateToken";
import { getRefreshToken, setTokens, clearTokens } from './authStore'
import { UpdateTokenResult } from "cv-graphql";

type UpdateTokenArgs = {
  updateToken: UpdateTokenResult;
};

export const refreshTokens = async (): Promise<string | null> => {
  try {
    const refresh = getRefreshToken();
    if (!refresh) return null;

    const res = await apolloClient.mutate<UpdateTokenArgs>({
      mutation: UPDATE_TOKEN,
    });

    if (!res.data?.updateToken) throw new Error("No token returned");

    const { access_token, refresh_token } = res.data.updateToken;

    setTokens(access_token, refresh_token);

    return access_token;
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    clearTokens();
    return null;
  }
};

