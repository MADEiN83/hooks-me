import React from "react";
import { useArray } from "../lib/esm";

type User = {
  firstname: string;
  lastname: string;
  age: number;
};

const Component = () => {
  const { value, push, clear } = useArray<User>([
    {
      firstname: "Hooks",
      lastname: "ME",
      age: 1,
    },
  ]);

  return (
    <>
      <div>Value: {JSON.stringify(value)}</div>
      <button
        onClick={() =>
          push({
            firstname: "I'm",
            lastname: "FAMOUS",
            age: 2,
          })
        }
      >
        Add user
      </button>
      <button onClick={clear}>Clear</button>
    </>
  );
};

export default Component;
