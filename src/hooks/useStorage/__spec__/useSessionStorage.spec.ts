import { renderHook, act } from "@testing-library/react-hooks";
import { useSessionStorage } from "..";

import "./storage.mock";

type User = { firstname: string; lastname: string; age: number };

describe("useStorage tests", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe("useSessionStorage tests with no typing", () => {
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

    it("should remove value when call the remove method", () => {
      const { result } = renderHook(() =>
        useSessionStorage("jwt", "initial value")
      );

      expect(result.current[0]).toBe("initial value");

      const [, , remove] = result.current;

      act(remove);

      expect(result.current[0]).toBeUndefined();
    });

    it("should return value when already defined somewhere", () => {
      localStorage.setItem("jwt", "already_defined");

      const { result } = renderHook(() =>
        useSessionStorage("jwt", "not_applied")
      );
      const [value] = result.current;
      expect(value).toBe("already_defined");
    });
  });

  describe("useSessionStorage tests with typing", () => {
    it("should save and restore value when privitive value is provided (number)", () => {
      const { result } = renderHook(() =>
        useSessionStorage<number>("count", 89)
      );
      expect(result.current[0]).toEqual(89);
    });

    it("should save and restore value when privitive value is provided (boolean)", () => {
      const { result } = renderHook(() =>
        useSessionStorage<boolean>("count", true)
      );
      expect(result.current[0]).toBeTruthy();
    });

    it("should save and restore value when complexe object is provided (object)", () => {
      const user: User = {
        firstname: "Anthony",
        lastname: "UNKNOWN",
        age: 30,
      };

      const { result } = renderHook(() =>
        useSessionStorage<User>("user", user)
      );

      expect(result.current[0]).toEqual(user);
    });

    it("should save and restore value when complexe object is provided (array)", () => {
      const users: User[] = [
        {
          firstname: "Anthony",
          lastname: "UNKNOWN",
          age: 30,
        },
        {
          firstname: "Alicia",
          lastname: "UNKNOWN",
          age: 31,
        },
      ];

      const { result } = renderHook(() =>
        useSessionStorage<User[]>("users", users)
      );

      expect(result.current[0]).toEqual(users);
    });

    it("should set complexe object when no initial value is provided", () => {
      const user: User = {
        firstname: "Alicia",
        lastname: "UNKNOWN",
        age: 31,
      };

      const { result } = renderHook(() =>
        useSessionStorage<User | undefined>("users", undefined)
      );

      const [, setValue] = result.current;

      act(() => {
        setValue(user);
      });

      expect(result.current[0]).toEqual(user);
    });

    it("should set array when no initial value is provided", () => {
      const users: User[] = [
        {
          firstname: "Anthony",
          lastname: "UNKNOWN",
          age: 30,
        },
        {
          firstname: "Alicia",
          lastname: "UNKNOWN",
          age: 31,
        },
      ];

      const { result } = renderHook(() =>
        useSessionStorage<User[]>("users", [])
      );
      const [, setValue] = result.current;

      act(() => {
        setValue(users);
      });

      expect(result.current[0]).toEqual(users);
    });
  });
});
