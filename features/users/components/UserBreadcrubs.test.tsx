import { render, screen } from "@testing-library/react";
import { UserBreadcrumbs } from "./UserBreadcrubs";

jest.mock("next/navigation", () => ({
  useParams: () => ({ userId: "42" }),
}));

jest.mock("@/features/users/api/getUser", () => ({
  useGetUser: jest.fn(),
}));

const { useGetUser } = jest.requireMock("@/features/users/api/getUser") as {
  useGetUser: jest.Mock;
};

describe("UserBreadcrumbs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows user full name when available", () => {
    useGetUser.mockReturnValue({
      data: {
        user: {
          profile: { full_name: "Alice Cooper" },
          email: "alice@mail.com",
        },
      },
    });

    render(<UserBreadcrumbs />);

    expect(screen.getByText("Employees")).toBeInTheDocument();
    expect(screen.getByText("Alice Cooper")).toBeInTheDocument();
  });

  test("falls back to userId when no user data is available", () => {
    useGetUser.mockReturnValue({
      data: null,
    });

    render(<UserBreadcrumbs />);

    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
