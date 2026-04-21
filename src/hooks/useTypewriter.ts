import { useState, useEffect } from "react";

export default function useTypewriter(phrase: string, loopKey = 0, typingSpeed = 60) {
  const [syncedKey, setSyncedKey] = useState(loopKey);
  const [text, setText] = useState("");

  if (syncedKey !== loopKey) {
    setSyncedKey(loopKey);
    setText("");
  }

  useEffect(() => {
    if (text === phrase) return;
    const t = setTimeout(() => setText(text + phrase[text.length]), typingSpeed);
    return () => clearTimeout(t);
  }, [text, phrase, typingSpeed]);

  return { text, isComplete: text === phrase };
}
