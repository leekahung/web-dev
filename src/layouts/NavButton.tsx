import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import NavigateIcon from "@/shared/components/icons/NavigateIcon";
import useScrollTo from "@/hooks/useScrollTo";

export default function NavButton() {
  const [showButtons, setShowButtons] = useState(false);
  const scrollTo = useScrollTo();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showButtons) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setShowButtons(false);
      // The focused menu item unmounts, so hand focus back to the toggle
      toggleRef.current?.focus();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setShowButtons(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [showButtons]);

  const navButtonStyling =
    "fixed bottom-5 left-6 sm:left-10 lg:left-1/10 xl:left-1/5 z-50 px-2 py-1 rounded-full outline-1 cursor-pointer bg-slate-200 dark:bg-slate-800 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black will-change-transform";

  const navigateTo = (target: Element | number | null) => {
    scrollTo(target);
    setShowButtons(false);
    // The chosen item unmounts, so hand focus back to the toggle
    toggleRef.current?.focus({ preventScroll: true });
  };

  return (
    <nav ref={navRef} aria-label="Page navigation">
      <button
        ref={toggleRef}
        className={`${navButtonStyling} h-10 w-10 z-60`}
        onClick={() => setShowButtons((prev) => !prev)}
        aria-label="Navigation menu"
        aria-expanded={showButtons}
      >
        <div className="h-6 w-6 m-auto">
          <NavigateIcon />
        </div>
      </button>
      {/* A short slide the user triggers, so keep it even with reduced motion */}
      <MotionConfig reducedMotion="never">
        <AnimatePresence>
          {showButtons && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -80, pointerEvents: "auto" }}
                exit={{ opacity: 0, y: 0, pointerEvents: "none" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={navButtonStyling}
                onClick={() => navigateTo(0)}
              >
                Home
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, x: 60, y: -50, pointerEvents: "auto" }}
                exit={{ opacity: 0, x: 0, y: 0, pointerEvents: "none" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={navButtonStyling}
                onClick={() => navigateTo(document.getElementById("projects"))}
              >
                Projects
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 80, pointerEvents: "auto" }}
                exit={{ opacity: 0, x: 0, pointerEvents: "none" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={navButtonStyling}
                onClick={() => navigateTo(document.getElementById("skills"))}
              >
                Skills
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </MotionConfig>
    </nav>
  );
}
