"use client";

import { useEffect, useState } from "react";
import { SoundIcon } from "./PixelArt";

function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const label = now
    ? now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "--:--";

  return <span className="tabular-nums">{label}</span>;
}

export default function MenuBar({ muted, onToggleMute }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-14 border-b-4 border-plum bg-white/70 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-5 sm:px-8 text-[11px] sm:text-[13px] text-plum">
        {/* Left: name + decorative menu items */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="font-bold"> AAYUSH BISHT</span>
          <span className="hidden sm:inline opacity-70">Finder</span>
          <span className="hidden sm:inline opacity-70">Projects</span>
          <span className="hidden sm:inline opacity-70">About</span>
        </div>

        {/* Right: sound toggle + clock */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            onClick={onToggleMute}
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            className="flex items-center gap-2 border-2 border-plum bg-white/60 px-3 py-1.5 active:translate-y-[1px]"
          >
            <SoundIcon muted={muted} className="h-4 w-5" />
            <span className="hidden sm:inline">{muted ? "OFF" : "ON"}</span>
          </button>
          <Clock />
        </div>
      </div>
    </div>
  );
}
