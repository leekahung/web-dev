import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NavigateIcon from "@/shared/components/icons/NavigateIcon";

export default function NavButton() {
  const [showButtons, setShowButtons] = useState(false);
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
    "fixed bottom-5 left-10 lg:left-[10%] xl:left-[20%] z-50 px-2 py-1 rounded-full outline-1 cursor-pointer bg-slate-200 dark:bg-slate-800 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black will-change-transform";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setShowButtons(false), 700);
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
      <AnimatePresence>
        {showButtons && (
          <>
            <motion.button
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -80, pointerEvents: "auto" }}
              exit={{ opacity: 0, y: 0, pointerEvents: "none" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={navButtonStyling}
              onClick={scrollToTop}
            >
              Home
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, x: 60, y: -50, pointerEvents: "auto" }}
              exit={{ opacity: 0, x: 0, y: 0, pointerEvents: "none" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={navButtonStyling}
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => setShowButtons(false), 700);
              }}
            >
              Projects
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 80, pointerEvents: "auto" }}
              exit={{ opacity: 0, x: 0, pointerEvents: "none" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={navButtonStyling}
              onClick={() => {
                document
                  .getElementById("skills")
                  ?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => setShowButtons(false), 700);
              }}
            >
              Skills
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
