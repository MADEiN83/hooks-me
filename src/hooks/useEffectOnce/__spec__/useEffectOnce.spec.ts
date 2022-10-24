import { renderHook } from "@testing-library/react-hooks";
import useEffectOnce from "..";

describe("useEffectOnce tests", () => {
  it("should execute callback on mount", () => {
    const callback = jest.fn();
    renderHook(() => useEffectOnce(callback));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
