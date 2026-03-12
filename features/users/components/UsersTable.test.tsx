import { fireEvent, render, screen } from "@testing-library/react";
import { UsersTable } from "./UsersTable";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} />
  ),
}));

describe("UsersTable", () => {
  const rows = [
    {
      id: "1",
      avatar: null,
      firstName: "Alice",
      lastName: "Cooper",
      fullName: "Alice Cooper",
      email: "alice@mail.com",
      department: "Frontend",
      position: "Developer",
    },
  ];

  test("renders user row data", () => {
    render(
      <UsersTable
        rows={rows}
        sortBy="firstName"
        sortOrder="asc"
        onSort={jest.fn()}
      />,
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Cooper")).toBeInTheDocument();
    expect(screen.getByText("alice@mail.com")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  test("calls onSort when sortable header button is clicked", () => {
    const onSort = jest.fn();

    render(
      <UsersTable
        rows={rows}
        sortBy="firstName"
        sortOrder="asc"
        onSort={onSort}
      />,
    );

    fireEvent.click(screen.getByLabelText("Sort by First Name"));

    expect(onSort).toHaveBeenCalledWith("firstName");
  });

  test("calls onRowClick when a row cell is clicked", () => {
    const onRowClick = jest.fn();

    render(
      <UsersTable
        rows={rows}
        sortBy="firstName"
        sortOrder="asc"
        onSort={jest.fn()}
        onRowClick={onRowClick}
      />,
    );

    fireEvent.click(screen.getByText("Alice"));

    expect(onRowClick).toHaveBeenCalledWith("1");
  });
});
