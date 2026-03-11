import { render, screen, fireEvent } from "@testing-library/react";
import { SignupForm } from "./SignupForm";

const mockPush = jest.fn();
const mockSignupMutate = jest.fn();
const mockValidateForm = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/features/auth/api/signup", () => ({
  useSignup: () => [mockSignupMutate, { error: null, loading: false }],
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
    error: string;
  }) => (
    <div>
      {error && <p>{error}</p>}
      <button onClick={() => onSubmit("test@mail.com", "123456")}>
        Submit
      </button>
    </div>
  ),
}));

describe("SignupForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows validation error when form is invalid", () => {
    mockValidateForm.mockReturnValue(false);

    render(<SignupForm />);

    fireEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("Please enter a valid email and password."),
    ).toBeInTheDocument();

    expect(mockSignupMutate).not.toHaveBeenCalled();
  });

  test("calls signup mutation when form is valid", async () => {
    mockValidateForm.mockReturnValue(true);
    mockSignupMutate.mockResolvedValue({
      data: {
        signup: {
          access_token: "access",
          refresh_token: "refresh",
        },
      },
    });

    render(<SignupForm />);

    fireEvent.click(screen.getByText("Submit"));

    expect(mockSignupMutate).toHaveBeenCalledWith({
      variables: {
        auth: { email: "test@mail.com", password: "123456" },
      },
    });
  });
});
