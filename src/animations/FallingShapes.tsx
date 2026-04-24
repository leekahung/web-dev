import { useEffect, useRef, useState, type RefObject } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import Shape from "./Shape";

interface Props {
  containerRef: RefObject<HTMLElement | null>;
}

let nextId = 0;

export default function FallingShapes({ containerRef }: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });
  const keysRef = useRef<number[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ x: width, y: height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  const numShapes = Math.max(Math.floor(dimensions.x / 100), 8);

  while (keysRef.current.length < numShapes) {
    keysRef.current.push(nextId++);
  }

  return (
    <>
      {keysRef.current.slice(0, numShapes).map((id) => (
        <Shape
          key={id}
          containerDimensions={dimensions}
          slowMotion={prefersReducedMotion}
        />
      ))}
    </>
  );
}
