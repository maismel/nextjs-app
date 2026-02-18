let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;

  if (typeof window !== "undefined") {
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh);
  }
};

export const loadTokensFromStorage = () => {
  if (typeof window !== "undefined") {
    accessToken = sessionStorage.getItem("accessToken");
    refreshToken = sessionStorage.getItem("refreshToken");
  }
};

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;

  if (typeof window !== "undefined") {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  }
};
