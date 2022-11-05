import React, { FC } from "react";
import { useWindowSize } from "../lib/esm";

const Component: FC = () => {
  const [width, height] = useWindowSize();

  return (
    <>
      <div>Width: {width}</div>
      <div>Height: {height}</div>
    </>
  );
};

export default Component;
