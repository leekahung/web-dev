import { useEffect, useRef, useState } from "react";
import Shape from "./Shape";

interface Props {
  /** Positions the shapes area, e.g. `inset-x-0 top-0 bottom-0`. */
  className?: string;
}

export default function FallingShapes({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const numShapes = Math.max(Math.floor(width / 100), 8);

  // Shapes are only added/removed at the end, so index keys stay stable
  return (
    <div
      ref={containerRef}
      className={`absolute overflow-hidden pointer-events-none ${className ?? ""}`}
    >
      {Array.from({ length: numShapes }, (_, i) => (
        <Shape key={i} />
      ))}
    </div>
  );
}
