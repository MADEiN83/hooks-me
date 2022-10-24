import { useState } from "react";

const useArray = <T,>(defaultValue: T[]) => {
  const [array, setArray] = useState(defaultValue);

  const push = (item: T) => {
    setArray((old) => [...old, item]);
  };

  const update = (index: number, item: T) => {
    setArray((a) => [
      ...a.slice(0, index),
      item,
      ...a.slice(index + 1, a.length),
    ]);
  };

  const remove = (index: number) => {
    setArray((currentValue) => [
      ...currentValue.slice(0, index),
      ...currentValue.slice(index + 1, currentValue.length),
    ]);
  };

  const filter = (predicate: (value: T) => boolean) => {
    setArray((currentValue) => currentValue.filter(predicate));
  };

  const clear = () => {
    setArray([]);
  };

  return { array, push, update, remove, filter, set: setArray, clear };
};

export default useArray;
