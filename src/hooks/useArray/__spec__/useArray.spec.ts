import { renderHook, act } from "@testing-library/react-hooks";
import useArray from "..";

describe("useArray tests", () => {
  it("[push] should push new item from the array (object)", () => {
    const { result } = renderHook(() =>
      useArray<{ title: string }>([
        { title: "Item01" },
        { title: "Item02" },
        { title: "Item03" },
      ])
    );

    act(() => {
      result.current.push({ title: "Item04" });
    });

    expect(result.current.value).toEqual([
      { title: "Item01" },
      { title: "Item02" },
      { title: "Item03" },
      { title: "Item04" },
    ]);
  });

  it("[push] should push new item from the array", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.push(4);
    });

    expect(result.current.value).toEqual([1, 2, 3, 4]);
  });

  it("[update] should update item", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.update(0, 65);
    });

    expect(result.current.value).toEqual([65, 2, 3]);
  });

  it("[remove] should remove item", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.value).toEqual([1, 3]);
  });

  it("[filter] should filter items", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.filter((n) => n === 1);
    });

    expect(result.current.value).toEqual([1]);
  });

  it("[clear] should clear array", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.clear();
    });

    expect(result.current.value).toEqual([]);
  });

  it("[set] should set array", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.set([11, 12, 13]);
    });

    expect(result.current.value).toEqual([11, 12, 13]);
  });
});
