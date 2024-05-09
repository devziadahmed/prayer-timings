import { useEffect, useState } from "react";

function useLocalStorage(key: string, initialState: string | number | object) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;

// export default function useLocalStorage(initialState, key) {
//   const [value, setValue] = useState(function () {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : initialState;
//   });

//   useEffect(
//     function () {
//       localStorage.setItem(key, JSON.stringify(value));
//     },
//     [value, key]
//   );

//   return [value, setValue];
// }
