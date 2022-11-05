import React, { useState } from "react";
import { useDebounce } from "../lib/esm";

const Component = () => {
  const [count, setCount] = useState(0);
  useDebounce(() => alert("Hooks me, bro."), 1000, [count]);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount((current) => current + 1)}>Add</button>
    </>
  );
};

export default Component;
