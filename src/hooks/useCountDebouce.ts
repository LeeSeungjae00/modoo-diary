import React, { useEffect, useState } from "react";

export default function useCountDebounce(
  callbacks: (count: number) => void,
  delay: number = 500
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    const timer = setTimeout(() => {
      callbacks(count);
      setCount(0);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [callbacks, count, delay]);

  return setCount;
}
