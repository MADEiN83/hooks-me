import { renderHook, act } from "@testing-library/react-hooks";
import useToggle from "..";

describe("useToggle tests", () => {
  it("should be falsy value on startup", () => {
    const { result } = renderHook(() => useToggle(false));
    const [value] = result.current;

    expect(value).toBeFalsy();
  });

  it("should be truthy value on startup", () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;

    expect(value).toBeTruthy();
  });

  it("should be true when initial value is false", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBeTruthy();
  });

  it("should be false when initial value is true", () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBeFalsy();
  });

  it("should set true when it's already true", () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBeTruthy();
  });

  it("should set false when it's already false", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBeFalsy();
  });
});
