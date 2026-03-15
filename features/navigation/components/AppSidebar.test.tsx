import { render, screen } from "@testing-library/react";
import { AppSidebar } from "./AppSidebar";

const mockUsePathname = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock("@/features/shared/hooks/useIsClient", () => ({
  useIsClient: () => true,
}));

jest.mock("@/helpers/getUserIdFromToken", () => ({
  getUserIdFromToken: () => "123",
}));

jest.mock("@/features/navigation/api/getCurrentUser", () => ({
  useGetCurrentUser: () => ({
    data: {
      user: { id: "123", email: "test@mail.com" },
    },
  }),
}));

jest.mock("@/features/navigation/components/SidebarLg", () => ({
  SidebarLg: ({
    pathname,
    currentUserId,
  }: {
    pathname: string;
    currentUserId: string;
  }) => (
    <div data-testid="sidebar-lg">
      {pathname}-{currentUserId}
    </div>
  ),
}));

jest.mock("@/features/navigation/components/MobileNav", () => ({
  MobileNav: () => <div data-testid="mobile-nav">MobileNav</div>,
}));

jest.mock("@/features/shared/components/ConfirmDialog", () => ({
  ConfirmDialog: () => <div data-testid="confirm-dialog" />,
}));

describe("AppSidebar", () => {
  test("renders sidebar and mobile nav", () => {
    mockUsePathname.mockReturnValue("/languages");

    render(<AppSidebar />);

    expect(screen.getByTestId("sidebar-lg")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  });

  test("passes pathname and userId to SidebarLg", () => {
    mockUsePathname.mockReturnValue("/languages");

    render(<AppSidebar />);

    expect(screen.getByText("/languages-123")).toBeInTheDocument();
  });
});
