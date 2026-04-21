import ChatIcon from "@/shared/components/icons/ChatIcon";
import ProfileIcon from "@/shared/components/icons/ProfileIcon";
import Section from "./components/Section";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import useTypewriter from "@/hooks/useTypewriter";

const PHRASES = [
  { text: "production-ready React apps", color: "text-[#007ACC] dark:text-[#61DAFB]" },
  { text: "civic-tech web tools",        color: "text-[#2F855A] dark:text-[#5FD18D]" },
  { text: "accessible, data-heavy UIs",  color: "text-violet-700 dark:text-violet-300" },
  { text: "open-source contributions",   color: "text-red-700 dark:text-orange-300" },
];

const PAUSE_MS = 2200;
const RESTART_DELAY_MS = 1500;
const DELETE_SPEED = 40;
const LAST = PHRASES.length - 1;

function Cursor() {
  return <span className="inline-block w-px h-[1em] bg-black dark:bg-slate-200 ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />;
}

export default function Intro() {
  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);
  const [deleteLen, setDeleteLen] = useState(0);
  const pendingLoopReset = useRef(false);
  const { text: typed, isComplete } = useTypewriter(PHRASES[0].text, loopKey);

  useEffect(() => {
    if (phase !== 0 || !isComplete) return;
    const t = setTimeout(() => setPhase(1), PAUSE_MS);
    return () => clearTimeout(t);
  }, [phase, isComplete]);

  useEffect(() => {
    if (phase === 0 || phase > LAST) return;
    const t = setTimeout(() => {
      if (phase === LAST) {
        setDeleteLen(PHRASES[LAST].text.length);
        setPhase(LAST + 1);
      } else {
        setPhase(phase + 1);
      }
    }, PAUSE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== LAST + 1) return;
    if (deleteLen === 0) {
      const t = setTimeout(() => {
        pendingLoopReset.current = true;
        setPhase(0);
      }, RESTART_DELAY_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDeleteLen((n) => n - 1), DELETE_SPEED);
    return () => clearTimeout(t);
  }, [phase, deleteLen]);

  return (
    <section
      aria-label="Introduction"
      className="relative h-screen flex flex-col items-center justify-center gap-6 cursor-default"
    >
      <div className="flex flex-col items-center justify-center gap-6 bg-neutral-400/30 dark:bg-neutral-200/30 border border-black/15 dark:border-white/15 rounded-2xl py-8 px-4 sm:p-8 mx-4 sm:mx-0">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Hey there! I'm{" "}
            <span className="text-blue-500 dark:text-orange-300">
              Ka Hung
            </span>
          </h1>
          <h2 className="text-base sm:text-xl max-w-75 sm:max-w-100 min-h-[2lh] sm:min-h-[1lh]">
            I build{" "}
            <span className="inline-block" style={{ perspective: "400px" }}>
              <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                  if (pendingLoopReset.current) {
                    pendingLoopReset.current = false;
                    setLoopKey((k) => k + 1);
                  }
                }}
              >
                {phase === 0 ? (
                  <motion.span
                    key="typewriter"
                    className={`inline-block ${PHRASES[0].color}`}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeIn" }}
                    style={{ transformOrigin: "50% 0%" }}
                  >
                    {typed}
                    <Cursor />
                  </motion.span>
                ) : (
                  <motion.span
                    key={phase > LAST ? LAST : phase}
                    className={`inline-block ${PHRASES[Math.min(phase, LAST)].color}`}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "50% 0%" }}
                  >
                    {phase > LAST ? PHRASES[LAST].text.slice(0, deleteLen) : PHRASES[phase].text}
                    {phase > LAST && <Cursor />}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </h2>
          <div>
            <strong className="flex flex-wrap gap-2 items-center justify-center">
              <span className="group inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 bg-[#007ACC]/10 dark:bg-[#61DAFB]/10 border border-[#007ACC]/40 dark:border-[#61DAFB]/40">
                <span className="text-[#007ACC] dark:text-[#61DAFB] relative">
                  React
                  <span className="absolute bottom-0.5 left-0 w-0 h-px bg-[#007ACC] dark:bg-[#61DAFB] group-hover:w-full transition-all duration-300" />
                </span>
                <span>2+ yrs</span>
              </span>
              <span className="group inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 bg-[#2F855A]/10 dark:bg-[#5FD18D]/10 border border-[#2F855A]/40 dark:border-[#5FD18D]/40">
                <span className="text-[#2F855A] dark:text-[#5FD18D] relative">
                  Civic-tech
                  <span className="absolute bottom-0.5 left-0 w-0 h-px bg-[#2F855A] dark:bg-[#5FD18D] group-hover:w-full transition-all duration-300" />
                </span>
                <span>Contributor</span>
              </span>
              <span className="group inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 bg-red-700/10 dark:bg-orange-300/10 border border-red-700/40 dark:border-orange-300/40">
                <span className="text-red-700 dark:text-orange-300 relative">
                  Research
                  <span className="absolute bottom-0.5 left-0 w-0 h-px bg-red-700 dark:bg-orange-300 group-hover:w-full transition-all duration-300" />
                </span>
                <span>Background</span>
              </span>
            </strong>
          </div>
        </div>
        <div className="grid grid-cols-2 w-52">
          <Section title="About">
            <span className="sr-only">About</span>
            <ProfileIcon />
          </Section>
          <Section title="Contact">
            <span className="sr-only">Contact</span>
            <ChatIcon />
          </Section>
        </div>
      </div>
      <motion.button
        className="absolute bottom-24 flex flex-col items-center gap-1 opacity-75 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={() =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-label="Scroll to projects"
      >
        <span className="text-xs tracking-widest uppercase">Projects</span>
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
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </motion.svg>
      </motion.button>
    </section>
  );
}
