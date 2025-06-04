import useTheme from "@/hooks/useTheme";
import { useEffect, useRef, useState } from "react";

export default function BackgroundBlob() {
  const { darkMode } = useTheme();
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1,
  });
  const blobRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1,
  });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (isFinePointer === false) return;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      positionRef.current.x += (position.x - positionRef.current.x) * 0.2;
      positionRef.current.y += (position.y - positionRef.current.y) * 0.2;

      if (blobRef.current !== null) {
        blobRef.current.style.left = `${positionRef.current.x}px`;
        blobRef.current.style.top = `${positionRef.current.y}px`;
      }
    };

    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [position]);

  return (
    <div
      ref={blobRef}
      className={`fixed h-40 w-40 rounded-full pointer-events-none blur-3xl opacity-30 z-50
          ${darkMode ? "bg-blue-500" : "bg-orange-300"}`}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
