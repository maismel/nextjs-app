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

    const { data } = await apolloClient.mutate<UpdateTokenArgs>({
      mutation: UPDATE_TOKEN,
    });

    const tokens = data?.updateToken;
    if (!tokens) throw new Error("No tokens returned");

    setTokens(tokens.access_token, tokens.refresh_token);
    return tokens.access_token;
  } catch (err) {
    clearTokens();
    return null;
  }
};

