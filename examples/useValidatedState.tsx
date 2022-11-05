import React from "react";
import { useValidatedState } from "../lib/esm";

const checkIfValueIsValid = (value: string): boolean => {
  return value !== "famous";
};

const Component = () => {
  const [name, setName, nameIsValid] = useValidatedState<string>(
    "famous",
    checkIfValueIsValid
  );

  return (
    <>
      <div>Hooks me, I'm {name}.</div>
      <div>It's valid: {nameIsValid ? "probably" : "not sure"}</div>
      <button onClick={() => setName("famous")}>Famous</button>
      <button onClick={() => setName("very famous")}>Very famous</button>
    </>
  );
};

export default Component;
