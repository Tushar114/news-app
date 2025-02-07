import { useEffect } from "react";

export function useScrollEnd(
  element: HTMLElement | null,
  onScrollEnd: () => void
) {
  useEffect(() => {
    if (element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onScrollEnd();
          }
        },
        { threshold: 1.0 }
      );
      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }
  }, [element, onScrollEnd]);
}
