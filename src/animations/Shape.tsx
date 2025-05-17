import { motion } from "motion/react";

interface Props {
  containerDimensions: { x: number; y: number };
}

export default function Circle({ containerDimensions }: Props) {
  const x = Math.random() * containerDimensions.x;
  const duration = 10 + Math.floor(Math.random() * 10);
  const size = 20 + Math.floor(Math.random() * 100);
  const borderRadius = 10 + Math.floor(Math.random() * 100);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0, rotate: 0 }}
      animate={{ y: containerDimensions.y, opacity: [0, 1, 0], rotate: 360 }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      className="absolute top-0 -left-20 border-2"
      style={{ x, width: size, height: size, borderRadius: `${borderRadius}%` }}
    />
  );
}
