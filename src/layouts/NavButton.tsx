import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NavigateIcon from "@/shared/components/icons/NavigateIcon";

export default function NavButton() {
  const [showButtons, setShowButtons] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setShowButtons(false), 1000);
  };

  return (
    <>
      <button
        className="fixed h-10 w-10 bottom-5 left-10 md:left-[10%] outline-1 rounded-full p-1 z-[60] cursor-pointer hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black duration-500 group"
        onClick={() => setShowButtons((prev) => !prev)}
      >
        <div className="h-6 w-6 m-auto">
          <NavigateIcon />
        </div>
      </button>
      <AnimatePresence>
        {showButtons && (
          <>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: -80 }}
              exit={{ opacity: 0, y: 5000 }}
              transition={{
                duration: 0.1,
                ease: "easeIn",
              }}
              className="fixed px-2 bottom-5 left-10 md:left-[10%] outline-1 rounded-full p-1 z-50 cursor-pointer bg-slate-200 dark:bg-slate-800 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black transition-all duration-500"
              onClick={scrollToTop}
            >
              Home
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -10, x: 20 }}
              animate={{ opacity: 1, y: -50, x: 60 }}
              exit={{ opacity: 0, y: 5000, x: -5000 }}
              transition={{
                duration: 0.1,
                ease: "easeIn",
              }}
              className="fixed px-2 bottom-5 left-10 md:left-[10%] outline-1 rounded-full p-1 z-50 cursor-pointer bg-slate-200 dark:bg-slate-800 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black transition-all duration-500"
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => setShowButtons(false), 1000);
              }}
            >
              Projects
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 80 }}
              exit={{ opacity: 0, x: -5000 }}
              transition={{
                duration: 0.1,
                ease: "easeIn",
              }}
              className="fixed px-2 bottom-5 left-10 md:left-[10%] outline-1 rounded-full p-1 z-50 cursor-pointer bg-slate-200 dark:bg-slate-800 hover:bg-slate-500 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-black transition-all duration-500"
              onClick={() => {
                document
                  .getElementById("skills")
                  ?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => setShowButtons(false), 1000);
              }}
            >
              Skills
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
