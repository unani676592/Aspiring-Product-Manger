"use client";

import { useEffect, useState } from "react";

const TITLE = "AayushOS v1.0";
const NAME_PART = "AayushOS"; // the rest ("v1.0") is tinted mint
const LETTER_MS = 200; // ~0.2s per letter → full title in ~2s
const LOADBAR_MS = 2300; // matches the CSS loading-bar animation

export default function BootScreen({ onDismiss }) {
  const [leaving, setLeaving] = useState(false);
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    // let the fade-out play before unmounting
    setTimeout(onDismiss, 350);
  };

  // Typewriter: reveal the title one character at a time.
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TITLE.slice(0, i));
      if (i >= TITLE.length) {
        clearInterval(id);
        setTypingDone(true);
      }
    }, LETTER_MS);
    return () => clearInterval(id);
  }, []);

  // Once typing finishes, let the loading bar run, then boot the desktop.
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(dismiss, LOADBAR_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingDone]);

  const nameShown = typed.slice(0, NAME_PART.length);
  const restShown = typed.slice(NAME_PART.length);

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-plum text-white transition-opacity duration-300 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 40%, #3a2d57 0%, #2b2140 70%)",
      }}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <div className="text-[10px] tracking-widest text-mint">AAYUSHOS</div>

        <h1 className="text-2xl sm:text-3xl leading-relaxed min-h-[1.5em]">
          <span>{nameShown}</span>
          <span className="text-mint">{restShown}</span>
          {/* blinking cursor block while typing */}
          {!typingDone && (
            <span className="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-mint animate-blink align-middle" />
          )}
        </h1>

        {/* pixel loading bar — only starts filling after the title is typed */}
        <div className="mt-4 w-[240px] sm:w-[300px]">
          <div className="border-4 border-white p-1">
            <div className="h-4 w-full bg-plum">
              <div
                className={`h-full bg-mint ${
                  typingDone ? "animate-loadbar" : "w-0"
                }`}
              />
            </div>
          </div>
          <div className="mt-4 text-[8px] tracking-wider text-white/70 animate-blink">
            LOADING…
          </div>
        </div>

        <div className="mt-6 text-[7px] text-white/40">
          click anywhere to skip
        </div>
      </div>
    </div>
  );
}
