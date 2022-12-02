import React, { FC, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import useRenderCount from "..";

const MockedComponent: FC = () => {
  const [, setvalue] = useState(0);
  const count = useRenderCount();

  return (
    <>
      <div data-testid="counter">{count}</div>

      <button
        data-testid="refresh_button"
        onClick={() => {
          setvalue((old) => old + 1);
        }}
      >
        refresh
      </button>
    </>
  );
};

describe("useRenderCount tests", () => {
  it("should return 1 when no refresh was performed", () => {
    render(<MockedComponent />);
    expect(screen.getByTestId("counter")).toHaveTextContent("1");
  });

  it("should return 21 when refresh was performed", () => {
    render(<MockedComponent />);
    expect(screen.getByTestId("counter")).toHaveTextContent("1");

    const iterations = 21;

    for (let i = 0; i < iterations; i++) {
      fireEvent.click(screen.getByTestId("refresh_button"));
    }

    expect(screen.getByTestId("counter")).toHaveTextContent(
      (iterations + 1).toString()
    );
  });
});
