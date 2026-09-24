"use client";

import { useCallback, useRef } from "react";

/**
 * Generates 8-bit style blip tones with the Web Audio API — no audio files needed.
 * Returns { playOpen, playClose, playBlip } plus a way to respect the mute flag.
 */
export function useSound(muted) {
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctxRef.current = new AudioCtx();
    }
    return ctxRef.current;
  }, []);

  const tone = useCallback(
    (freq, duration = 0.09, type = "square", startGain = 0.08) => {
      if (muted) return;
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(startGain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    },
    [getCtx, muted]
  );

  // Rising two-note blip on open
  const playOpen = useCallback(() => {
    tone(440, 0.07);
    setTimeout(() => tone(660, 0.09), 70);
  }, [tone]);

  // Falling two-note blip on close
  const playClose = useCallback(() => {
    tone(520, 0.07);
    setTimeout(() => tone(330, 0.09), 70);
  }, [tone]);

  // Single short click blip
  const playBlip = useCallback(() => {
    tone(720, 0.05, "square", 0.06);
  }, [tone]);

  return { playOpen, playClose, playBlip };
}
