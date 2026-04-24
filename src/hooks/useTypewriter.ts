import { useState, useEffect } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

export default function useTypewriter(
  phrase: string,
  loopKey = 0,
  typingSpeed = 60,
) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [syncedKey, setSyncedKey] = useState(loopKey);
  const [text, setText] = useState(prefersReducedMotion ? phrase : "");

  if (syncedKey !== loopKey) {
    setSyncedKey(loopKey);
    setText(prefersReducedMotion ? phrase : "");
  }

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (text === phrase) return;
    const t = setTimeout(
      () => setText(text + phrase[text.length]),
      typingSpeed,
    );
    return () => clearTimeout(t);
  }, [text, phrase, typingSpeed, prefersReducedMotion]);

  const displayText = prefersReducedMotion ? phrase : text;
  return { text: displayText, isComplete: displayText === phrase };
}
