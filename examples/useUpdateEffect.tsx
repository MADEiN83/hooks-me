import React, { FC, useState } from "react";
import { useUpdateEffect } from "../lib/esm";

const Component: FC = () => {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => alert("Done!"), [count]);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount((old) => old + 1)}>Add</button>
    </>
  );
};

export default Component;
