import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "@/lib/authStore";

type TokenPayload = {
  sub: number;
  email: string;
  role: string;
  exp: number;
};

export const getUserIdFromToken = (): number | null => {
  const token = getAccessToken();
  if (!token) return null;

  const decoded = jwtDecode<TokenPayload>(token);
  return decoded.sub;
};
