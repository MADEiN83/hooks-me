import React, { FC } from "react";
import { useLocalStorage } from "../lib/esm";

const Component: FC = () => {
  const [word, setWord, clearWord] = useLocalStorage("word", "famous");

  return (
    <>
      <div>Hooks me, I'm {word}</div>
      <button onClick={() => setWord("very famous")}>Set another word</button>
      <button onClick={() => clearWord()}>Clear</button>
    </>
  );
};

export default Component;
