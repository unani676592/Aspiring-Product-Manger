"use client";

import { PixelGirl } from "./PixelArt";

export default function PixelCharacter() {
  return (
    <div
      className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
      aria-hidden="false"
    >
      <div className="animate-bob">
        <PixelGirl className="h-28 w-24 sm:h-36 sm:w-28 drop-shadow-[3px_3px_0_rgba(43,33,64,0.25)]" />
      </div>
      <div className="mt-1 text-center text-[7px] text-plum/70">Aayush</div>
    </div>
  );
}
