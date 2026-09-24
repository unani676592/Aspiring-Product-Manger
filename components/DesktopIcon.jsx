"use client";

import { useRef, useState } from "react";

const DRAG_THRESHOLD = 4; // px of movement before it counts as a drag (not a click)

export default function DesktopIcon({
  icon: Icon,
  label,
  sublabel,
  onOpen,
  initialPos,
}) {
  const [pos, setPos] = useState(initialPos);
  const drag = useRef(null);
  const btnRef = useRef(null);

  // Keep the icon fully within the visible desktop (below the menu bar).
  const clamp = (x, y) => {
    const el = btnRef.current;
    const w = el ? el.offsetWidth : 80;
    const h = el ? el.offsetHeight : 80;
    const topLimit = 60; // clear the fixed menu bar
    const maxX = Math.max(0, window.innerWidth - w);
    const maxY = Math.max(topLimit, window.innerHeight - h);
    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(topLimit, y), maxY),
    };
  };

  const onPointerDown = (e) => {
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      moved: false,
    };
    try {
      btnRef.current.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    d.moved = true;
    setPos(clamp(d.originX + dx, d.originY + dy));
  };

  const onPointerUp = (e) => {
    const d = drag.current;
    drag.current = null;
    try {
      btnRef.current.releasePointerCapture(e.pointerId);
    } catch (_) {}
    // A tap/click with no real movement opens the folder or window.
    if (d && !d.moved) onOpen();
  };

  return (
    <button
      ref={btnRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDragStart={(e) => e.preventDefault()}
      style={{ left: pos.x, top: pos.y, touchAction: "none" }}
      className="group no-select absolute flex w-20 flex-col items-center gap-1 p-1 text-center focus:outline-none"
    >
      <span className="flex h-14 w-14 items-center justify-center border-2 border-transparent p-1 group-hover:border-plum/40 group-focus:border-plum/60 group-active:translate-y-[1px]">
        <Icon className="h-12 w-12" />
      </span>
      <span className="max-w-[80px] bg-white/60 px-1 text-[7px] leading-tight text-plum group-hover:bg-white/90">
        {label}
      </span>
      {sublabel ? (
        <span className="max-w-[84px] text-[6px] leading-tight text-plum/60">
          {sublabel}
        </span>
      ) : null}
    </button>
  );
}
