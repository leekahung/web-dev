import { motion, type HTMLMotionProps } from "motion/react";

type ScrollDownButtonProps = {
  /** id of the section to smooth-scroll into view on click. */
  targetId: string;
  /** Visible label above the chevron. */
  label: string;
  ariaLabel: string;
  className?: string;
  /** Reveal animation props (e.g. `animate` or `whileInView` + `viewport` + `transition`). */
  reveal: HTMLMotionProps<"button">;
};

/**
 * Animated button that smooth-scrolls to another section, with a bouncing down chevron.
 * Shared between the Intro and Projects sections.
 */
export default function ScrollDownButton({
  targetId,
  label,
  ariaLabel,
  className,
  reveal,
}: ScrollDownButtonProps) {
  return (
    <motion.button
      className={`flex flex-col items-center gap-1 opacity-75 transition-opacity duration-300 cursor-pointer ${className ?? ""}`}
      onClick={() =>
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth" })
      }
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      aria-label={ariaLabel}
      {...reveal}
    >
      <span className="text-xs tracking-widest uppercase">{label}</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </motion.svg>
    </motion.button>
  );
}
