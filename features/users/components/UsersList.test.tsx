import { render, screen } from "@testing-library/react";
import { UsersList } from "./UsersList";

const mockPush = jest.fn();
const mockUsersTable = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("../api/getUsers", () => ({
  useGetUsers: jest.fn(),
}));

jest.mock("@/hooks/useSortTable", () => ({
  useSortTable: jest.fn(),
}));

jest.mock("@/features/shared/ui/CvsTableToolbar", () => ({
  CvsTableToolbar: ({
    value,
  }: {
    value: string;
  }) => <div data-testid="toolbar">{value}</div>,
}));

jest.mock("@/components/ui/Preloader", () => ({
  Preloader: () => <div>Loading...</div>,
}));

jest.mock("./UsersTable", () => ({
  UsersTable: (props: object) => {
    mockUsersTable(props);
    return <div data-testid="users-table">UsersTable</div>;
  },
}));

const { useGetUsers } = jest.requireMock("../api/getUsers") as {
  useGetUsers: jest.Mock;
};
const { useSortTable } = jest.requireMock("@/hooks/useSortTable") as {
  useSortTable: jest.Mock;
};

describe("UsersList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders preloader when users are loading", () => {
    useGetUsers.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    useSortTable.mockReturnValue({
      processedData: [],
      search: "",
      setSearch: jest.fn(),
      sortBy: "firstName",
      sortOrder: "asc",
      handleSort: jest.fn(),
    });

    render(<UsersList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    useGetUsers.mockReturnValue({
      data: null,
      loading: false,
      error: { message: "Failed to load users" },
    });
    useSortTable.mockReturnValue({
      processedData: [],
      search: "",
      setSearch: jest.fn(),
      sortBy: "firstName",
      sortOrder: "asc",
      handleSort: jest.fn(),
    });

    render(<UsersList />);

    expect(screen.getByText("Failed to load users")).toBeInTheDocument();
  });

  test("passes transformed rows to UsersTable", () => {
    useGetUsers.mockReturnValue({
      data: {
        users: [
          {
            id: "1",
            email: "alice@mail.com",
            department_name: "Frontend",
            position_name: "Developer",
            profile: {
              first_name: "Alice",
              last_name: "Cooper",
              avatar: null,
            },
          },
        ],
      },
      loading: false,
      error: null,
    });
    useSortTable.mockReturnValue({
      processedData: [
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
      ],
      search: "",
      setSearch: jest.fn(),
      sortBy: "firstName",
      sortOrder: "asc",
      handleSort: jest.fn(),
    });

    render(<UsersList />);

    expect(screen.getByTestId("users-table")).toBeInTheDocument();
    expect(mockUsersTable).toHaveBeenCalled();
  });
});
