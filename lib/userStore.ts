let currUserId: string | null =
  typeof window !== "undefined" ? sessionStorage.getItem("currUserId") : null;

export const setCurrUserId = (userId: string) => {
  currUserId = userId;
  if (typeof window !== "undefined") {
    sessionStorage.setItem("currUserId", userId);
  }
}

export const getCurrUserId = () => currUserId;

export const clearCurrUserId = () => {
  currUserId = null;
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("currUserId");
  }
}
