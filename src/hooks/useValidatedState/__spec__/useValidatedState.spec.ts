import { renderHook, act } from "@testing-library/react-hooks";
import useValidatedState from "..";

describe("useValidatedState tests", () => {
  it("should be valid when value is not empty", () => {
    const { result } = renderHook(() =>
      useValidatedState("1", (str) => !!str.length)
    );
    const [value, _, isValid] = result.current;

    expect(value).toBe("1");
    expect(isValid).toBeTruthy();
  });

  it("should not be valid when value is empty", () => {
    const { result } = renderHook(() =>
      useValidatedState("", (str) => !!str.length)
    );
    const [_, __, isValid] = result.current;

    expect(isValid).toBeFalsy();
  });

  it("should not be valid on startup, then should be valid", () => {
    const { result } = renderHook(() =>
      useValidatedState("", (str) => !!str.length)
    );

    expect(result.current[2]).toBeFalsy();

    act(() => {
      result.current[1]("Fake value goes here");
    });

    expect(result.current[0]).toBe("Fake value goes here");
    expect(result.current[2]).toBeTruthy();
  });

  it("should be valid on startup, then should not be valid", () => {
    const { result } = renderHook(() =>
      useValidatedState("Alright!", (str) => !!str.length)
    );

    expect(result.current[2]).toBeTruthy();

    act(() => {
      result.current[1]("");
    });

    expect(result.current[0]).toBe("");
    expect(result.current[2]).toBeFalsy();
  });
});
