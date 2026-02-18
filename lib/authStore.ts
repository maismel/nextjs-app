let accessToken: string | null =
  typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;

let refreshToken: string | null =
  typeof window !== "undefined" ? sessionStorage.getItem("refreshToken") : null;

export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;

  if (typeof window !== "undefined") {
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh);
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
