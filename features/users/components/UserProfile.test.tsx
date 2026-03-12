import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

const mockUpdateProfile = jest.fn();
const mockUpdateUser = jest.fn();
const mockUploadAvatar = jest.fn();
const mockFileToBase64 = jest.fn();
const mockRefetch = jest.fn();
const renderForm = jest.fn();

jest.mock("@/features/users/api/getUser", () => ({
  useGetUser: jest.fn(),
}));
jest.mock("@/features/users/api/getDepartments", () => ({
  useGetDepartments: jest.fn(),
}));
jest.mock("@/features/users/api/getPositions", () => ({
  useGetPositions: jest.fn(),
}));
jest.mock("@/features/users/api/updateProfile", () => ({
  useUpdateProfile: jest.fn(),
}));
jest.mock("@/features/users/api/updateUser", () => ({
  useUpdateUser: jest.fn(),
}));
jest.mock("@/features/users/api/useUploadAvatar", () => ({
  useUploadAvatar: jest.fn(),
}));
jest.mock("@/helpers/fileToBase64", () => ({
  fileToBase64: (...args: unknown[]) => mockFileToBase64(...args),
}));
jest.mock("@/helpers/getUserIdFromToken", () => ({
  getUserIdFromToken: jest.fn(),
  getUserRoleFromToken: jest.fn(),
}));
jest.mock("@/components/ui/Preloader", () => ({
  Preloader: () => <div>Loading...</div>,
}));
jest.mock("./UserProfileForm", () => ({
  UserProfileForm: (props: {
    readOnly: boolean;
    onSubmit: (values: {
      first_name: string;
      last_name: string;
      departmentId: string;
      positionId: string;
    }) => Promise<void>;
    onUploadAvatar?: (file: File) => Promise<void>;
  }) => {
    renderForm(props);
    return (
      <div>
        <div>{props.readOnly ? "read-only" : "editable"}</div>
        <button
          type="button"
          onClick={() =>
            props.onSubmit({
              first_name: "Alice Updated",
              last_name: "Cooper Updated",
              departmentId: "dep-2",
              positionId: "pos-2",
            })
          }
        >
          submit-profile
        </button>
        <button
          type="button"
          onClick={() =>
            props.onUploadAvatar?.(
              new File([new Uint8Array(1024)], "avatar.png", {
                type: "image/png",
              }),
            )
          }
        >
          upload-avatar
        </button>
      </div>
    );
  },
}));

const { useGetUser } = jest.requireMock("@/features/users/api/getUser") as {
  useGetUser: jest.Mock;
};
const { useGetDepartments } = jest.requireMock(
  "@/features/users/api/getDepartments",
) as {
  useGetDepartments: jest.Mock;
};
const { useGetPositions } = jest.requireMock(
  "@/features/users/api/getPositions",
) as {
  useGetPositions: jest.Mock;
};
const { useUpdateProfile } = jest.requireMock(
  "@/features/users/api/updateProfile",
) as {
  useUpdateProfile: jest.Mock;
};
const { useUpdateUser } = jest.requireMock(
  "@/features/users/api/updateUser",
) as {
  useUpdateUser: jest.Mock;
};
const { useUploadAvatar } = jest.requireMock(
  "@/features/users/api/useUploadAvatar",
) as {
  useUploadAvatar: jest.Mock;
};
const { getUserIdFromToken, getUserRoleFromToken } = jest.requireMock(
  "@/helpers/getUserIdFromToken",
) as {
  getUserIdFromToken: jest.Mock;
  getUserRoleFromToken: jest.Mock;
};

describe("UserProfile", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useGetUser.mockReturnValue({
      data: {
        user: {
          email: "alice@mail.com",
          created_at: "2024-01-01T00:00:00.000Z",
          department: { id: "dep-1" },
          position: { id: "pos-1" },
          profile: {
            first_name: "Alice",
            last_name: "Cooper",
            full_name: "Alice Cooper",
            avatar: null,
          },
        },
      },
      loading: false,
      error: null,
      refetch: mockRefetch,
    });
    useGetDepartments.mockReturnValue({
      data: { departments: [{ id: "dep-1", name: "Frontend" }] },
      loading: false,
      error: null,
    });
    useGetPositions.mockReturnValue({
      data: { positions: [{ id: "pos-1", name: "Developer" }] },
      loading: false,
      error: null,
    });
    useUpdateProfile.mockReturnValue([mockUpdateProfile, { loading: false }]);
    useUpdateUser.mockReturnValue([mockUpdateUser, { loading: false }]);
    useUploadAvatar.mockReturnValue([mockUploadAvatar, { loading: false }]);
    getUserIdFromToken.mockReturnValue(123);
    getUserRoleFromToken.mockReturnValue("Employee");
    mockFileToBase64.mockResolvedValue("base64-image");
    mockUpdateProfile.mockResolvedValue({});
    mockUpdateUser.mockResolvedValue({});
    mockUploadAvatar.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  test("renders preloader while data is loading", () => {
    useGetUser.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: mockRefetch,
    });

    render(<UserProfile userId="123" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    useGetUser.mockReturnValue({
      data: null,
      loading: false,
      error: { message: "User load failed" },
      refetch: mockRefetch,
    });

    render(<UserProfile userId="123" />);

    expect(screen.getByText("User load failed")).toBeInTheDocument();
  });

  test("passes editable mode to form for owner", () => {
    render(<UserProfile userId="123" />);

    expect(screen.getByText("editable")).toBeInTheDocument();
  });

  test("passes read-only mode to form for non-owner non-admin", () => {
    getUserIdFromToken.mockReturnValue(999);

    render(<UserProfile userId="123" />);

    expect(screen.getByText("read-only")).toBeInTheDocument();
  });

  test("submits changed profile and user fields", async () => {
    render(<UserProfile userId="123" />);

    fireEvent.click(screen.getByText("submit-profile"));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        variables: {
          profile: {
            userId: "123",
            first_name: "Alice Updated",
            last_name: "Cooper Updated",
          },
        },
      });
      expect(mockUpdateUser).toHaveBeenCalledWith({
        variables: {
          user: {
            userId: "123",
            departmentId: "dep-2",
            positionId: "pos-2",
          },
        },
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  test("uploads avatar and refetches user data", async () => {
    render(<UserProfile userId="123" />);

    fireEvent.click(screen.getByText("upload-avatar"));

    await waitFor(() => {
      expect(mockFileToBase64).toHaveBeenCalled();
      expect(mockUploadAvatar).toHaveBeenCalledWith({
        variables: {
          avatar: {
            userId: "123",
            base64: "base64-image",
            size: 1024,
            type: "image/png",
          },
        },
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
