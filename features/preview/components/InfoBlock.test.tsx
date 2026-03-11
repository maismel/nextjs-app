import { render, screen } from "@testing-library/react";
import { InfoBlock } from "./InfoBlock";

describe("InfoBlock", () => {
  test("renders title and children", () => {
    render(
      <InfoBlock title="Education">
        <p>Secondary School</p>
      </InfoBlock>
    );

    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Secondary School")).toBeInTheDocument();
  });
});
