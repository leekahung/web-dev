import { animate } from "motion/react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

const REDUCED_SCROLL_DURATION = 0.9;
// Brief soft start, brisk middle, soft landing
const REDUCED_SCROLL_EASE = [0.3, 0, 0.2, 1] as const;
// Any of these mid-animation hands control back to the user
const INTERRUPT_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"];

let stopCurrentScroll: (() => void) | null = null;

/**
 * Returns a function that scrolls to a page offset or element.
 * Uses native smooth scrolling, or a slower eased scroll when reduced motion is preferred.
 */
export default function useScrollTo() {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (target: Element | number | null) => {
    if (target === null) return;
    if (!shouldReduceMotion) {
      if (typeof target === "number") window.scrollTo({ top: target });
      else target.scrollIntoView();
      return;
    }

    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const targetY =
      typeof target === "number"
        ? target
        : target.getBoundingClientRect().top +
          window.scrollY -
          parseFloat(getComputedStyle(target).scrollMarginTop);

    stopCurrentScroll?.();
    const removeListeners = () => {
      INTERRUPT_EVENTS.forEach((type) =>
        window.removeEventListener(type, stop),
      );
      stopCurrentScroll = null;
    };
    const controls = animate(
      window.scrollY,
      Math.min(Math.max(targetY, 0), maxY),
      {
        duration: REDUCED_SCROLL_DURATION,
        ease: REDUCED_SCROLL_EASE,
        onUpdate: (y) => window.scrollTo(0, y),
        onComplete: removeListeners,
      },
    );
    function stop() {
      controls.stop();
      removeListeners();
    }
    stopCurrentScroll = stop;
    INTERRUPT_EVENTS.forEach((type) =>
      window.addEventListener(type, stop, { passive: true }),
    );
  };
}
