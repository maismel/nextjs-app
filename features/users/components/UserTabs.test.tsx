import { render, screen } from "@testing-library/react";
import { UserTabs } from "./UserTabs";

const mockPush = jest.fn();
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockUsePathname(),
  useParams: () => ({ userId: "42" }),
}));

describe("UserTabs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all profile tabs", () => {
    mockUsePathname.mockReturnValue("/users/42/profile");

    render(<UserTabs />);

    expect(screen.getByText("PROFILE")).toBeInTheDocument();
    expect(screen.getByText("SKILLS")).toBeInTheDocument();
    expect(screen.getByText("LANGUAGES")).toBeInTheDocument();
  });

  test("uses pathname to determine current tab", () => {
    mockUsePathname.mockReturnValue("/users/42/languages");

    render(<UserTabs />);

    expect(screen.getByText("LANGUAGES")).toBeInTheDocument();
  });
});
