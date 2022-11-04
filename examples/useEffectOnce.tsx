import React, { useState } from "react";
import { useEffectOnce } from "..";

const Component = () => {
  const [count, setCount] = useState(0);

  useEffectOnce(() => {
    setCount((current) => current + 1);
  });

  return (
    <div>
      <h1>Count: {count}</h1>
    </div>
  );
};

export default Component;
