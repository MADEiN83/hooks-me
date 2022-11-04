import React, { FC, useState } from "react";
import { useDebug } from "../lib/esm";

const Component: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildComponent count={count} />
      <button onClick={() => setCount((old) => old + 1)}>Add</button>
    </>
  );
};

const ChildComponent: FC<{ count: number }> = (props) => {
  const output = useDebug("ChildComponent", props);

  return (
    <>
      <div>{props.count}</div>
      <div>{JSON.stringify(output)}</div>
    </>
  );
};

export default Component;
