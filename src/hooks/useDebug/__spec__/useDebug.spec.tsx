import React, { FC, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import useDebug from "../../useDebug";

const MockedChildrenComponent: FC<{ value: number }> = (props) => {
  const debug = useDebug("MockedChildrenComponent", props);
  return <div data-testid="debug">{JSON.stringify(debug)}</div>;
};

const MockedComponent: FC = () => {
  const [value, setvalue] = useState(0);

  return (
    <>
      <MockedChildrenComponent value={value} />

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

// Don't display debug logs through the terminal
Object.defineProperty(console, "log", { value: () => {} });

describe("useDebug tests", () => {
  it("should return 1 when no refresh was performed", () => {
    render(<MockedComponent />);
    expect(JSON.parse(screen.getByTestId("debug").textContent || "{}")).toEqual(
      {
        count: 1,
        changedProps: {},
        timeSinceLastRender: expect.anything(),
        lastRenderTimestamp: expect.anything(),
      }
    );
  });

  it("should return 21 when refresh was performed", () => {
    render(<MockedComponent />);

    const iterations = 21;

    for (let i = 0; i < iterations; i++) {
      fireEvent.click(screen.getByTestId("refresh_button"));
    }

    expect(JSON.parse(screen.getByTestId("debug").textContent || "{}")).toEqual(
      {
        count: iterations + 1,
        changedProps: {
          value: {
            current: iterations,
            previous: iterations - 1,
          },
        },
        timeSinceLastRender: expect.anything(),
        lastRenderTimestamp: expect.anything(),
      }
    );
  });
});
