import React from "react";
import { useArray } from "..";

const DEFAULT_VALUE = [1, 2, 3, 4, 5, 6];

const Component = () => {
  const { value, push, clear } = useArray<number>(DEFAULT_VALUE);

  return (
    <>
      <div>Value: {value.join(" - ")}</div>
      <button onClick={() => push(7)}>Add 7</button>
      <button onClick={clear}>Clear</button>
    </>
  );
};

export default Component;
