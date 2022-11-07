import { useCallback, useState, useEffect } from "react";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage(key, defaultValue, window.localStorage);
};

export const useSessionStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage(key, defaultValue, window.sessionStorage);
};

const useStorage = <T,>(
  key: string,
  defaultValue: T,
  storageObject: Storage
): [T | undefined, (value: T) => void, () => void] => {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) {
      try {
        return JSON.parse(jsonValue);
      } catch {
        return jsonValue;
      }
    }

    return defaultValue;
  });

  useEffect(() => {
    if (!value) {
      return storageObject.removeItem(key);
    }

    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
};

export default useStorage;
