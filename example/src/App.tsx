import React, { type FC } from "react";
import { useToggle } from "hook-me";

const App: FC = () => {
  const [value, toggle] = useToggle();

  return (
    <div className="App">
      <p>ok</p>
      <button onClick={() => toggle(true)}>Set true</button>
      <button onClick={() => toggle(false)}>Set false</button>
      <button onClick={() => toggle()}>Toggle</button>

      <p>Value: {value ? "true" : "false"}</p>
    </div>
  );
};

export default App;
