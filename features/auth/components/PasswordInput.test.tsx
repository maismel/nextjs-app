import { render, screen, fireEvent } from "@testing-library/react";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  const mockChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders password input by default", () => {
    render(<PasswordInput value="" onChange={mockChange} />);

    const input = screen.getByPlaceholderText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  test("toggles password visibility when button is clicked", () => {
    render(<PasswordInput value="" onChange={mockChange} />);

    const input = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(button);
    expect(input).toHaveAttribute("type", "password");
  });

  test("calls onChange when typing", () => {
    render(<PasswordInput value="" onChange={mockChange} />);

    const input = screen.getByPlaceholderText("Password");

    fireEvent.change(input, { target: { value: "123456" } });

    expect(mockChange).toHaveBeenCalled();
  });
});
