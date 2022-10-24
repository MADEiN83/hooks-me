import { useCallback, useState } from "react";

type ReturnType<T> = [T, (value: T) => void, boolean];

const useValidatedState = <T,>(
  initialValue: T,
  validator: (newValue: T) => boolean
): ReturnType<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState(validator(initialValue));

  const handleOnChange = useCallback((newValue: T) => {
    setValue(newValue);
    setIsValid(validator(newValue));
  }, []);

  return [value, handleOnChange, isValid];
};

export default useValidatedState;
