import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

export default function useMouse() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [x, y]);

  return { x, y };
}
