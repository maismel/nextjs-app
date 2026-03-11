import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

const mockPush = jest.fn();
const mockLoginQuery = jest.fn();
const mockValidateForm = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/features/auth/api/login", () => ({
  useLogin: () => [mockLoginQuery, { error: null, loading: false }],
}));

jest.mock("@/features/auth/utils/validateForm", () => ({
  validateForm: (...args: [{ email: string; password: string }]) =>
    mockValidateForm(...args),
}));

jest.mock("./Form", () => ({
  FormUI: ({
    onSubmit,
    error,
  }: {
    onSubmit: (email: string, password: string) => Promise<void>;
    error: string
  }) => (
    <div>
      {error && <p>{error}</p>}
      <button onClick={() => onSubmit("test@mail.com", "123456")}>
        Submit
      </button>
    </div>
  ),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows validation error if form is invalid", async () => {
    mockValidateForm.mockReturnValue(false);

    render(<LoginForm />);

    fireEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("Please enter a valid email and password."),
    ).toBeInTheDocument();

    expect(mockLoginQuery).not.toHaveBeenCalled();
  });

  test("calls login query when form is valid", async () => {
    mockValidateForm.mockReturnValue(true);
    mockLoginQuery.mockResolvedValue({
      data: {
        login: {
          access_token: "access",
          refresh_token: "refresh",
        },
      },
    });

    render(<LoginForm />);

    fireEvent.click(screen.getByText("Submit"));

    expect(mockLoginQuery).toHaveBeenCalledWith({
      variables: {
        auth: { email: "test@mail.com", password: "123456" },
      },
    });
  });
});
