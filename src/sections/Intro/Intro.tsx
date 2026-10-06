import ChatIcon from "@/shared/components/icons/ChatIcon";
import ProfileIcon from "@/shared/components/icons/ProfileIcon";
import Section from "./components/Section";
import ScrollDownButton from "@/shared/components/ScrollDownButton";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import useTypewriter from "@/hooks/useTypewriter";

const PHRASES = [
  {
    text: "production-ready React apps",
    color: "text-react-deep dark:text-react",
  },
  {
    text: "open-source civic-tech tools",
    color: "text-civic-deep dark:text-civic",
  },
  {
    text: "accessible, data-heavy UIs",
    color: "text-violet-700 dark:text-violet-300",
  },
];

const PAUSE_MS = 2200;
const RESTART_DELAY_MS = 1500;
const DELETE_SPEED = 40;
const LAST = PHRASES.length - 1;
const FULL_PHRASE = `I build ${PHRASES.slice(0, LAST)
  .map((p) => p.text)
  .join(", ")}, and ${PHRASES[LAST].text}`;

function Cursor() {
  return (
    <span className="inline-block w-px h-[1em] bg-black dark:bg-slate-200 ml-0.5 align-middle animate-blink motion-reduce:animate-none" />
  );
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
      className="relative min-h-svh grid grid-rows-[1fr_auto_1fr] justify-items-center gap-6 pt-24 pb-24 short:gap-4 short:pt-16 short:pb-16 cursor-default"
    >
      <div className="row-start-2 flex flex-col items-center justify-center gap-4 sm:gap-6 bg-neutral-400/30 dark:bg-neutral-200/30 border border-black/15 dark:border-white/15 rounded-2xl py-6 px-4 sm:p-8 short:py-4 mx-4 sm:mx-0 short:mx-4 short:flex-row">
        <div className="flex flex-col items-center gap-3 sm:gap-4 short:items-start short:gap-2 short:text-left short-wide:grid short-wide:grid-cols-[auto_auto] short-wide:items-center short-wide:gap-x-6">
          <h1 className="text-2xl sm:text-3xl font-bold short-wide:self-end">
            Hey there! I'm{" "}
            <span className="text-blue-500 dark:text-orange-300 whitespace-nowrap">
              Ka Hung
            </span>
          </h1>
          <h2 className="text-sm xs:text-base sm:text-xl max-w-75 sm:max-w-100 min-h-lh flex items-center gap-1 font-semibold whitespace-nowrap short-wide:self-start">
            <span className="sr-only">{FULL_PHRASE}</span>
            {/* Animated text is hidden from screen readers, which get FULL_PHRASE instead */}
            <span aria-hidden="true">I build</span>
            <span
              aria-hidden="true"
              className="inline-grid justify-items-start"
              style={{ perspective: "400px" }}
            >
              {/* Invisible phrases reserve the widest width so the line doesn't re-center while typing */}
              {PHRASES.map((p) => (
                <span
                  key={p.text}
                  className="invisible col-start-1 row-start-1"
                >
                  {p.text}
                  <Cursor />
                </span>
              ))}
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
                    className={`inline-block col-start-1 row-start-1 ${PHRASES[0].color}`}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeIn" }}
                    style={{ transformOrigin: "50% 0%" }}
                  >
                    {typed}
                    <Cursor />
                  </motion.span>
                ) : (
                  <motion.span
                    key={phase > LAST ? LAST : phase}
                    className={`inline-block col-start-1 row-start-1 ${PHRASES[Math.min(phase, LAST)].color}`}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformOrigin: "50% 0%" }}
                  >
                    {phase > LAST
                      ? PHRASES[LAST].text.slice(0, deleteLen)
                      : PHRASES[phase].text}
                    {phase > LAST && <Cursor />}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </h2>
          <div className="short-wide:col-start-2 short-wide:row-start-1 short-wide:row-span-2">
            <strong className="flex flex-wrap gap-2 items-center justify-center short:justify-start short-wide:flex-col short-wide:items-start">
              <span className="group inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 bg-white/70 dark:bg-slate-900/80 bg-linear-to-r from-react-deep/10 to-react-deep/10 dark:from-react/10 dark:to-react/10 border border-react-deep/40 dark:border-react/40">
                <span className="text-react-deep dark:text-react relative">
                  React
                  <span className="absolute bottom-0.5 left-0 w-0 h-px bg-react-deep dark:bg-react group-hover:w-full transition-all duration-300" />
                </span>
                <span>3+ yrs</span>
              </span>
              <span className="group inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 bg-white/70 dark:bg-slate-900/80 bg-linear-to-r from-civic-deep/10 to-civic-deep/10 dark:from-civic/10 dark:to-civic/10 border border-civic-deep/40 dark:border-civic/40">
                <span className="text-civic-deep dark:text-civic relative">
                  Civic-tech
                  <span className="absolute bottom-0.5 left-0 w-0 h-px bg-civic-deep dark:bg-civic group-hover:w-full transition-all duration-300" />
                </span>
                <span>Contributor</span>
              </span>
              <span className="group inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 bg-white/70 dark:bg-slate-900/80 bg-linear-to-r from-red-700/10 to-red-700/10 dark:from-orange-300/10 dark:to-orange-300/10 border border-red-700/40 dark:border-orange-300/40">
                <span className="text-red-700 dark:text-orange-300 relative">
                  Research
                  <span className="absolute bottom-0.5 left-0 w-0 h-px bg-red-700 dark:bg-orange-300 group-hover:w-full transition-all duration-300" />
                </span>
                <span>Background</span>
              </span>
            </strong>
          </div>
        </div>
        <div className="grid grid-cols-2 w-52 short:grid-cols-1 short:w-auto short:gap-2 short:shrink-0">
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
      <ScrollDownButton
        targetId="projects"
        label="Projects"
        ariaLabel="Scroll to projects"
        className="row-start-3 self-end"
        reveal={{
          animate: { opacity: 0.75 },
          transition: { delay: 0.3, duration: 0.5 },
        }}
      />
    </section>
  );
}
