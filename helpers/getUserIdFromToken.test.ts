import { getUserIdFromToken, getUserRoleFromToken } from "./getUserIdFromToken";
import { getAccessToken } from "@/lib/authStore";
import { jwtDecode } from "jwt-decode";

jest.mock("@/lib/authStore");
jest.mock("jwt-decode");

describe("token helpers", () => {
  test("returns null if token does not exist", () => {
    (getAccessToken as jest.Mock).mockReturnValue(null);

    expect(getUserIdFromToken()).toBeNull();
    expect(getUserRoleFromToken()).toBeNull();
  });

  test("returns user id from token", () => {
    (getAccessToken as jest.Mock).mockReturnValue("token");
    (jwtDecode as jest.Mock).mockReturnValue({
      sub: 10,
      role: "admin",
    });

    expect(getUserIdFromToken()).toBe(10);
  });

  test("returns user role from token", () => {
    (getAccessToken as jest.Mock).mockReturnValue("token");
    (jwtDecode as jest.Mock).mockReturnValue({
      sub: 10,
      role: "admin",
    });

    expect(getUserRoleFromToken()).toBe("admin");
  });
});
