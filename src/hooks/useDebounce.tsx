import { useEffect } from "react";
import useTimeout from "./useTimeout";

/**
 *
 * @param callback Method to call
 * @param delay Delay in ms
 * @param dependencies If present, effect will only activate if the values in the list change.
 */
const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies?: any[]
) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...(dependencies || []), reset]);
  useEffect(clear, []);
};

export default useDebounce;
