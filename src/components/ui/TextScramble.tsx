"use client";

import { useEffect, useRef, useState, memo } from "react";

interface TextScrambleProps {
  phrases: string[];
  className?: string;
  speed?: number;
  pauseDuration?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function TextScrambleInner({
  phrases,
  className = "",
  speed = 40,
  pauseDuration = 3000,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(phrases[0]);
  const phraseIndex = useRef(0);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const scrambleTo = (target: string) => {
      let iteration = 0;
      const maxIterations = target.length;

      const update = () => {
        setDisplayText(
          target
            .split("")
            .map((char, index) => {
              if (index < iteration) return char;
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration < maxIterations) {
          iteration += 1 / 2;
          frameRef.current = requestAnimationFrame(() => {
            setTimeout(update, speed);
          });
        } else {
          setDisplayText(target);
          timeoutRef.current = setTimeout(nextPhrase, pauseDuration);
        }
      };

      update();
    };

    const nextPhrase = () => {
      phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
      scrambleTo(phrases[phraseIndex.current]);
    };

    timeoutRef.current = setTimeout(nextPhrase, pauseDuration);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phrases, speed, pauseDuration]);

  return <span className={className}>{displayText}</span>;
}

const TextScramble = memo(TextScrambleInner);
export default TextScramble;
