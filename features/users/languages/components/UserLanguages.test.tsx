import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserLanguages } from "./UserLanguages";

const mockAddLanguage = jest.fn();
const mockUpdateLanguage = jest.fn();
const mockDeleteLanguage = jest.fn();
const mockRefetch = jest.fn();
const renderLanguageDialog = jest.fn();

jest.mock("@/helpers/getUserIdFromToken", () => ({
  getUserIdFromToken: jest.fn(),
}));
jest.mock("../api/getProfileLanguages", () => ({
  useGetProfileLanguages: jest.fn(),
}));
jest.mock("../api/getLanguages", () => ({
  useGetLanguages: jest.fn(),
}));
jest.mock("../api/addProfileLanguage", () => ({
  useAddProfileLanguage: jest.fn(),
}));
jest.mock("../api/updateProfileLanguage", () => ({
  useUpdateProfileLanguage: jest.fn(),
}));
jest.mock("../api/deleteProfileLanguage", () => ({
  useDeleteProfileLanguage: jest.fn(),
}));
jest.mock("@/components/ui/Preloader", () => ({
  Preloader: () => <div>Loading...</div>,
}));
jest.mock("./LanguageDialog", () => ({
  LanguageDialog: (props: {
    open: boolean;
    mode: "add" | "update";
    onSubmit: (values: { name: string; proficiency: string }) => Promise<void>;
  }) => {
    renderLanguageDialog(props);
    return props.open ? (
      <button
        onClick={() =>
          props.onSubmit({
            name: "English",
            proficiency: "C1",
          })
        }
      >
        submit-language-dialog
      </button>
    ) : null;
  },
}));

const { getUserIdFromToken } = jest.requireMock("@/helpers/getUserIdFromToken") as {
  getUserIdFromToken: jest.Mock;
};
const { useGetProfileLanguages } = jest.requireMock("../api/getProfileLanguages") as {
  useGetProfileLanguages: jest.Mock;
};
const { useGetLanguages } = jest.requireMock("../api/getLanguages") as {
  useGetLanguages: jest.Mock;
};
const { useAddProfileLanguage } = jest.requireMock("../api/addProfileLanguage") as {
  useAddProfileLanguage: jest.Mock;
};
const { useUpdateProfileLanguage } = jest.requireMock("../api/updateProfileLanguage") as {
  useUpdateProfileLanguage: jest.Mock;
};
const { useDeleteProfileLanguage } = jest.requireMock("../api/deleteProfileLanguage") as {
  useDeleteProfileLanguage: jest.Mock;
};

describe("UserLanguages", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    getUserIdFromToken.mockReturnValue("123");
    useGetProfileLanguages.mockReturnValue({
      data: {
        profile: {
          languages: [{ name: "English", proficiency: "Native" }],
        },
      },
      loading: false,
      refetch: mockRefetch,
    });
    useGetLanguages.mockReturnValue({
      data: {
        languages: [{ name: "English" }, { name: "German" }],
      },
      loading: false,
    });
    useAddProfileLanguage.mockReturnValue([mockAddLanguage]);
    useUpdateProfileLanguage.mockReturnValue([mockUpdateLanguage]);
    useDeleteProfileLanguage.mockReturnValue([mockDeleteLanguage]);
    mockAddLanguage.mockResolvedValue({});
    mockUpdateLanguage.mockResolvedValue({});
    mockDeleteLanguage.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  test("renders preloader while languages are loading", () => {
    useGetLanguages.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<UserLanguages userId="123" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("opens add dialog and submits add mutation", async () => {
    render(<UserLanguages userId="123" />);

    fireEvent.click(screen.getByText("Add language"));
    fireEvent.click(screen.getByText("submit-language-dialog"));

    await waitFor(() => {
      expect(mockAddLanguage).toHaveBeenCalledWith({
        variables: {
          userId: "123",
          name: "English",
          proficiency: "C1",
        },
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  test("opens update dialog when language item is clicked", async () => {
    render(<UserLanguages userId="123" />);

    fireEvent.click(screen.getByText("English"));
    fireEvent.click(screen.getByText("submit-language-dialog"));

    await waitFor(() => {
      expect(mockUpdateLanguage).toHaveBeenCalledWith({
        variables: {
          userId: "123",
          name: "English",
          proficiency: "C1",
        },
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  test("deletes language in delete mode", async () => {
    render(<UserLanguages userId="123" />);

    fireEvent.click(screen.getByText("Remove languages"));
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);

    await waitFor(() => {
      expect(mockDeleteLanguage).toHaveBeenCalledWith({
        variables: {
          userId: "123",
          name: ["English"],
        },
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  test("hides edit actions in read-only mode", () => {
    getUserIdFromToken.mockReturnValue("999");

    render(<UserLanguages userId="123" />);

    expect(screen.queryByText("Add language")).not.toBeInTheDocument();
    expect(screen.queryByText("Remove languages")).not.toBeInTheDocument();
  });
});
