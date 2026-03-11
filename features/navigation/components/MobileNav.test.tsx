import { render, screen } from "@testing-library/react";
import { MobileNav } from "./MobileNav";

jest.mock("next/link", () => {
  type MockLinkProps = {
    children: React.ReactNode;
    href: string;
    className?: string;
  };

  function MockLink({ children, href, className }: MockLinkProps) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return MockLink;
});

describe("MobileNav", () => {
  const navItems = [
    {
      label: "Users",
      href: "/users",
      icon: <span data-testid="icon-users">U</span>,
    },
    {
      label: "Languages",
      href: "/languages",
      icon: <span data-testid="icon-languages">L</span>,
    },
  ];

  test("renders navigation items", () => {
    render(<MobileNav navItems={navItems} pathname="/users" />);

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
  });

  test("renders correct links", () => {
    render(<MobileNav navItems={navItems} pathname="/users" />);

    const usersLink = screen.getByText("Users").closest("a");
    const languagesLink = screen.getByText("Languages").closest("a");

    expect(usersLink).toHaveAttribute("href", "/users");
    expect(languagesLink).toHaveAttribute("href", "/languages");
  });

  test("applies active class to current route", () => {
    render(<MobileNav navItems={navItems} pathname="/languages" />);

    const activeLink = screen.getByText("Languages").closest("a");

    expect(activeLink?.className).toContain("bg-gray-200");
  });
});
