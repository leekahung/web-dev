import useTheme from "@/hooks/useTheme";
import { useEffect, useRef } from "react";

export default function BackgroundBlob() {
  const { darkMode } = useTheme();
  const blobRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1,
  });
  const currentRef = useRef({
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1,
  });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
    };

    let frameId: number;
    const animate = () => {
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * 0.2;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * 0.2;

      if (blobRef.current) {
        blobRef.current.style.left = `${currentRef.current.x}px`;
        blobRef.current.style.top = `${currentRef.current.y}px`;
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className={`fixed h-40 w-40 rounded-full pointer-events-none blur-3xl opacity-20 z-50
          ${darkMode ? "bg-blue-500" : "bg-orange-300"}`}
      style={{
        left: currentRef.current.x,
        top: currentRef.current.y,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
