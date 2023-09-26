import { useEffect, useState } from 'react';

/**
 * @param name name of the data in local storage
 * @param initialState initial value of state if there is no `name` in local storage
 */
export default function useLocalStorageState<T>(
  name: string,
  initialState: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storageItem = localStorage.getItem(name);

    if (storageItem) {
      return JSON.parse(storageItem);
    }

    return initialState instanceof Function ? initialState() : initialState;
  });

  useEffect(() => {
    if (state === undefined) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, JSON.stringify(state));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return [state, setState];
}
