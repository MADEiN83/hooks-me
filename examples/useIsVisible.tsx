import React, { FC, useRef } from "react";
import { useIsVisible } from "../lib/esm";

const Component: FC = () => {
  const mainRef = useRef(null);
  const isVisible = useIsVisible(mainRef, "-100px");

  return (
    <>
      <div style={{ height: 2000, backgroundColor: "lightblue" }} />
      <div ref={mainRef}>{isVisible ? "Yep" : "Nope"}</div>
      <div style={{ height: 2000, backgroundColor: "lightblue" }} />
    </>
  );
};

export default Component;
