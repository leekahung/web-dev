import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * Whether the user prefers reduced motion.
 * Unlike Motion's useReducedMotion, this re-renders when the setting changes mid-visit.
 */
export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
