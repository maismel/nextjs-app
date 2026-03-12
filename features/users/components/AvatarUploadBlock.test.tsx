import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AvatarUploadBlock } from "./AvatarUploadBlock";

describe("AvatarUploadBlock", () => {
  const originalAlert = window.alert;

  beforeEach(() => {
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = originalAlert;
  });

  test("renders fallback letter from full name", () => {
    render(
      <AvatarUploadBlock
        avatar={null}
        fullName="Alice"
        userEmail="alice@mail.com"
      />,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("Upload avatar image")).toBeInTheDocument();
  });

  test("calls onUpload when a valid file is selected", async () => {
    const onUpload = jest.fn();
    render(
      <AvatarUploadBlock
        avatar={null}
        fullName="Alice"
        userEmail="alice@mail.com"
        onUpload={onUpload}
      />,
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["avatar"], "avatar.png", { type: "image/png" });

    Object.defineProperty(file, "size", { value: 1000 });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith(file);
    });
  });

  test("shows alert and does not upload unsupported file types", async () => {
    const onUpload = jest.fn();
    render(
      <AvatarUploadBlock
        avatar={null}
        fullName="Alice"
        userEmail="alice@mail.com"
        onUpload={onUpload}
      />,
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["avatar"], "avatar.svg", { type: "image/svg+xml" });

    Object.defineProperty(file, "size", { value: 1000 });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Unsupported file type. Use png/jpg/jpeg/gif.",
      );
      expect(onUpload).not.toHaveBeenCalled();
    });
  });

  test("shows drag message on drag over and uploads dropped file", async () => {
    const onUpload = jest.fn();
    render(
      <AvatarUploadBlock
        avatar={null}
        fullName="Alice"
        userEmail="alice@mail.com"
        onUpload={onUpload}
      />,
    );

    const dropzone = screen.getByTitle("Click to upload / Drop file");
    const file = new File(["avatar"], "avatar.png", { type: "image/png" });

    Object.defineProperty(file, "size", { value: 1000 });

    fireEvent.dragOver(dropzone);
    expect(screen.getByText("Drop the image here")).toBeInTheDocument();

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith(file);
    });
  });
});
