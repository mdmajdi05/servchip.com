"use client";

import { useState, useEffect } from "react";

export function useTypewriter(
  phrases: string[],
  typingSpeed: number = 50,
  pauseDuration: number = 3000
): string {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    if (!currentPhrase) return;

    if (!isDeleting && charIndex < currentPhrase.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((i) => i + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      const timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex > 0) {
      const timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((i) => i - 1);
      }, typingSpeed / 2);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex === 0) {
      const timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, pauseDuration]);

  return displayText;
}
