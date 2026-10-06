import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import Shape from "./Shape";

interface Props {
  /** Positions the shapes area, e.g. `inset-x-0 top-0 bottom-0`. */
  className?: string;
}

export default function FallingShapes({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const shouldReduceMotion = usePrefersReducedMotion();

  // Re-runs when reduced motion turns off, since the container only mounts then
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  // Purely decorative, so drop them rather than leave shapes fading in place
  if (shouldReduceMotion) return null;

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
