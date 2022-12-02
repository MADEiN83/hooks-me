import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../../useStorage";

import "./storage.mock";

describe("useStorage tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("useLocalStorage tests", () => {
    it("should have default value on startup (empty)", () => {
      const { result } = renderHook(() => useLocalStorage("jwt", ""));
      const [value] = result.current;
      expect(value).toBe("");
    });

    it("should have default value on startup (not empty)", () => {
      const { result } = renderHook(() => useLocalStorage("jwt", "fake"));
      const [value] = result.current;
      expect(value).toBe("fake");
    });

    it("should set value when call the setter", () => {
      const { result } = renderHook(() =>
        useLocalStorage("jwt", "initial value")
      );

      expect(result.current[0]).toBe("initial value");

      const [, setValue] = result.current;

      act(() => {
        setValue("new value");
      });

      expect(result.current[0]).toBe("new value");
    });

    it("should return value when already defined somewhere", () => {
      localStorage.setItem("jwt", "already_defined");

      const { result } = renderHook(() =>
        useLocalStorage("jwt", "not_applied")
      );
      const [value] = result.current;
      expect(value).toBe("already_defined");
    });
  });
});
