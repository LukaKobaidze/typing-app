import { useEffect, useState } from 'react';

/**
 * @param itemName name of the item in local storage
 * @param initialState initial value of state if there is no `itemName` in local storage
 */
const useStorageState = <T>(
  itemName: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(
    JSON.parse(localStorage.getItem(itemName)!) || initialState
  );

  useEffect(() => {
    localStorage.setItem(itemName, JSON.stringify(state));
  }, [state, itemName]);

  return [state, setState];
};

export default useStorageState;
