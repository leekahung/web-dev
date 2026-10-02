import { motion } from "motion/react";
import { useState } from "react";

/**
 * Random placement and timing for one fall-and-fade cycle.
 * The first cycle gets a longer delay so shapes start staggered instead of all at once.
 */
function randomParams(cycle: number) {
  const duration = 6 + Math.random() * 8;
  return {
    cycle,
    leftPercent: Math.random() * 95,
    // Bias spawns upward; shapes only fall down, so the top would otherwise stay sparse
    topPercent: Math.random() ** 1.5 * 90,
    fallDistance: 150 + Math.random() * 250,
    duration,
    delay: cycle === 0 ? Math.random() * duration : Math.random() * 2,
    rotate: Math.random() < 0.5 ? 360 : -360,
    size: 20 + Math.floor(Math.random() * 50),
    borderRadius: 10 + Math.floor(Math.random() * 100),
  };
}

export default function Shape() {
  const [params, setParams] = useState(() => randomParams(0));

  return (
    <motion.div
      // Remount each cycle so the shape jumps to its new start instead of animating there
      key={params.cycle}
      initial={{ y: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: params.fallDistance,
        opacity: [0, 0.5, 0.5, 0],
        rotate: params.rotate,
      }}
      transition={{
        duration: params.duration,
        delay: params.delay,
        ease: "linear",
        opacity: {
          duration: params.duration,
          delay: params.delay,
          times: [0, 0.25, 0.7, 1],
        },
      }}
      onAnimationComplete={() => setParams(randomParams(params.cycle + 1))}
      className="absolute border-2"
      style={{
        left: `${params.leftPercent}%`,
        top: `${params.topPercent}%`,
        width: params.size,
        height: params.size,
        borderRadius: `${params.borderRadius}%`,
      }}
    />
  );
}
