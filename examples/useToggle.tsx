import React from "react";
import { useToggle } from "../lib/esm";

const Component = () => {
  const [value, toggleValue] = useToggle();

  return (
    <>
      <div>Hooks me, I'm {value ? "very" : "not"} famous.</div>

      <button onClick={() => toggleValue()}>Toggle</button>
      <button onClick={() => toggleValue(true)}>Set true</button>
      <button onClick={() => toggleValue(false)}>Set false</button>
    </>
  );
};

export default Component;
