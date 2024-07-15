import React, { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";

export default function useMouse() {
  const [mouse, setMouse] = useState({
    x: useMotionValue(0),
    y: useMotionValue(0),
  });

  const mouseMove = (e: { clientX: number; clientY: number }) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return mouse;
}
