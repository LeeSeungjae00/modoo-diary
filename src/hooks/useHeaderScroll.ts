"use client";
import { useCallback, useEffect, useState } from "react";

export default function useHeaderScroll() {
  const [isSticky, setIsSticky] = useState(false);
  const onScroll = useCallback(() => {
    const { scrollY } = window;
    if (scrollY < 50) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  }, [setIsSticky]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return isSticky;
}
