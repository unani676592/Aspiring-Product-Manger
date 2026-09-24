"use client";

export default function StickyNote() {
  return (
    <div
      className="pointer-events-none absolute z-20 w-44 sm:w-52 -rotate-6 border-4 border-plum bg-note p-3 shadow-[6px_6px_0_0_rgba(43,33,64,0.35)]"
      style={{ top: "88px", right: "40px" }}
    >
      <p className="text-[8px] sm:text-[9px] leading-relaxed text-plum">
        product thinking, shipped as working automations.
      </p>
      <p className="mt-3 text-right text-[8px] text-plum/70">— Aayush</p>
    </div>
  );
}
