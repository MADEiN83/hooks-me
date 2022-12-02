import { renderHook, act } from "@testing-library/react-hooks";
import { useSessionStorage } from "../../useStorage";

import "./storage.mock";

describe("useStorage tests", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe("useSessionStorage tests", () => {
    it("should have default value on startup (empty)", () => {
      const { result } = renderHook(() => useSessionStorage("jwt", ""));
      const [value] = result.current;
      expect(value).toBe("");
    });

    it("should have default value on startup (not empty)", () => {
      const { result } = renderHook(() => useSessionStorage("jwt", "fake"));
      const [value] = result.current;
      expect(value).toBe("fake");
    });

    it("should set value when call the setter", () => {
      const { result } = renderHook(() =>
        useSessionStorage("jwt", "initial value")
      );

      expect(result.current[0]).toBe("initial value");

      const [, setValue] = result.current;

      act(() => {
        setValue("new value");
      });

      expect(result.current[0]).toBe("new value");
    });

    it("should return value when already defined somewhere", () => {
      sessionStorage.setItem("jwt", "already_defined");

      const { result } = renderHook(() =>
        useSessionStorage("jwt", "not_applied")
      );
      const [value] = result.current;
      expect(value).toBe("already_defined");
    });
  });
});
