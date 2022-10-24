import { useEffect } from "react";
import useTimeout from "./useTimeout";

const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: any
) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};

export default useDebounce;
