import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  containerDimensions: { x: number; y: number };
}

export default function Shape({ containerDimensions }: Props) {
  const [params] = useState(() => ({
    xFraction: Math.random(),
    duration: 10 + Math.floor(Math.random() * 15),
    size: 20 + Math.floor(Math.random() * 50),
    borderRadius: 10 + Math.floor(Math.random() * 100),
  }));

  return (
    <motion.div
      initial={{ y: -50, opacity: 0, rotate: 0 }}
      animate={{ y: containerDimensions.y, opacity: [0, 0.5, 0], rotate: 360 }}
      transition={{
        duration: params.duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      className="absolute top-0 -left-20 border-2"
      style={{
        x: params.xFraction * containerDimensions.x,
        width: params.size,
        height: params.size,
        borderRadius: `${params.borderRadius}%`,
      }}
    />
  );
}
