import { useState, useEffect } from "react";

// Custom hook that will write to local storage every time data changes
export default function useLocalStorage(key, initialValue) {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}
