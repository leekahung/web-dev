import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NavigateIcon from "@/shared/components/icons/NavigateIcon";

const NAV_CLOSE_DELAY_MS = 700;

const navLinks = [
  { label: "Home", href: "#", animate: { opacity: 1, y: -80, pointerEvents: "auto" as const }, exit: { opacity: 0, y: 0 } },
  { label: "Websites", href: "#projects", animate: { opacity: 1, x: 60, y: -50, pointerEvents: "auto" as const }, exit: { opacity: 0, x: 0, y: 0, pointerEvents: "none" as const } },
  { label: "Skills", href: "#skills", animate: { opacity: 1, x: 80, pointerEvents: "auto" as const }, exit: { opacity: 0, x: 0, pointerEvents: "none" as const } },
];

export default function NavButton() {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <nav aria-label="Page navigation">
      <button
        className="fixed bottom-5 left-10 lg:left-[10%] xl:left-[20%] z-50 px-2 py-1 rounded-full outline-1 cursor-pointer bg-slate-200 dark:bg-slate-800 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black will-change-transform h-10 w-10 z-60"
        onClick={() => setShowButtons((prev) => !prev)}
        aria-label="Navigation menu"
        aria-expanded={showButtons}
      >
        <div className="h-6 w-6 m-auto">
          <NavigateIcon />
        </div>
      </button>
      <AnimatePresence>
        {showButtons &&
          navLinks.map(({ label, href, animate, exit }) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={animate}
              exit={exit}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-5 left-10 lg:left-[10%] xl:left-[20%] z-50 px-2 py-1 rounded-full outline-1 cursor-pointer bg-slate-200 dark:bg-slate-800 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black will-change-transform"
              onClick={() => setTimeout(() => setShowButtons(false), NAV_CLOSE_DELAY_MS)}
            >
              {label}
            </motion.a>
          ))}
      </AnimatePresence>
    </nav>
  );
}
