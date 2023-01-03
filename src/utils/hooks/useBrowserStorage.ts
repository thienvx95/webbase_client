import { useState } from 'react';

export const useBrowserStorage = (
  keyName: string,
  defaultValue: any,
  useLocalStorage = true,
) => {
  const storage = useLocalStorage ? window.localStorage : window.sessionStorage;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = storage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        storage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = newValue => {
    try {
      storage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
