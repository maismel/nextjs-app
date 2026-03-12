import { fireEvent, render, screen } from "@testing-library/react";
import { UsersTableToolbar } from "./UsersTableToolbar";

describe("UsersTableToolbar", () => {
  test("renders current search value and calls onChange", () => {
    const onChange = jest.fn();

    render(<UsersTableToolbar value="Ali" onChange={onChange} />);

    const input = screen.getByPlaceholderText("Search by full name...");
    expect(input).toHaveValue("Ali");

    fireEvent.change(input, { target: { value: "Alice" } });

    expect(onChange).toHaveBeenCalledWith("Alice");
  });
});
