import React, { FC, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import useUpdateEffect from "..";

const MockedComponent: FC = () => {
  const [, setvalue] = useState(0);
  const [boolValue, setBoolvalue] = useState(false);

  useUpdateEffect(() => {
    setBoolvalue(true);
  });

  return (
    <>
      <div data-testid="output">{`${boolValue}`}</div>

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

describe("useUpdateEffect tests", () => {
  it("should skip the first render when mounted", () => {
    render(<MockedComponent />);
    expect(screen.getByTestId("output")).toHaveTextContent("false");
  });

  it("should skip the first render when mounted but trigger on second render", () => {
    render(<MockedComponent />);
    fireEvent.click(screen.getByTestId("refresh_button"));
    expect(screen.getByTestId("output")).toHaveTextContent("true");
  });
});
