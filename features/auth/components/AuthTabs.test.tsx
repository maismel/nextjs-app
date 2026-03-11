import { render, screen, fireEvent } from "@testing-library/react";
import { AuthTabs } from "./AuthTabs";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: jest.fn(),
}));

import { usePathname } from "next/navigation";

describe("AuthTabs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login tab as default when pathname is /auth/login", () => {
    (usePathname as jest.Mock).mockReturnValue("/auth/login");

    render(<AuthTabs />);

    expect(screen.getByText("ВОЙТИ")).toBeInTheDocument();
    expect(screen.getByText("СОЗДАТЬ")).toBeInTheDocument();
  });

  test("navigates to login when login tab is clicked", () => {
    (usePathname as jest.Mock).mockReturnValue("/auth/signup");

    render(<AuthTabs />);

    fireEvent.click(screen.getByText("ВОЙТИ"));

    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });

  test("navigates to signup when signup tab is clicked", () => {
    (usePathname as jest.Mock).mockReturnValue("/auth/login");

    render(<AuthTabs />);

    fireEvent.click(screen.getByText("СОЗДАТЬ"));

    expect(mockPush).toHaveBeenCalledWith("/auth/signup");
  });
});
