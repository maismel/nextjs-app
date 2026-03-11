import { render, screen, fireEvent } from "@testing-library/react";
import { FormUI } from "./Form";

describe("FormUI", () => {
  const mockSubmit = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("renders title, subtitle and buttons", () => {
    render(
      <FormUI
        title="Login"
        subtitle="Welcome back"
        btn_frst="Sign In"
        btn_sec="Forgot Password"
        onSubmit={mockSubmit}
      />,
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
  });

  test("shows error message when error is provided", () => {
    render(
      <FormUI
        title="Login"
        subtitle="Welcome back"
        btn_frst="Sign In"
        btn_sec="Forgot Password"
        onSubmit={mockSubmit}
        error="Invalid credentials"
      />,
    );

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  test("calls onSubmit with email and password", async () => {
    render(
      <FormUI
        title="Login"
        subtitle="Welcome back"
        btn_frst="Sign In"
        btn_sec="Forgot Password"
        onSubmit={mockSubmit}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("example@example.com"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Sign In"));

    expect(mockSubmit).toHaveBeenCalledWith("test@example.com", "123456");
  });
});
