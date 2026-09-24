"use client";

import { useEffect, useRef, useState } from "react";

export default function Window({
  title,
  initialPos,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  children,
}) {
  const [pos, setPos] = useState(initialPos);
  const [maximized, setMaximized] = useState(false);
  const savedPos = useRef(null); // pos to restore when un-maximizing
  const dragState = useRef(null);
  const winRef = useRef(null);

  // Keep windows from opening off-screen on small viewports
  useEffect(() => {
    const w = winRef.current;
    if (!w) return;
    const rect = w.getBoundingClientRect();
    const maxX = Math.max(8, window.innerWidth - rect.width - 8);
    const maxY = Math.max(44, window.innerHeight - 60);
    setPos((p) => ({
      x: Math.min(Math.max(8, p.x), maxX),
      y: Math.min(Math.max(44, p.y), maxY),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e) => {
    onFocus();
    if (maximized) return; // maximized windows don't drag
    const w = winRef.current;
    if (!w) return;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragState.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    const nextX = d.originX + dx;
    const nextY = d.originY + dy;
    // clamp so the title bar always stays reachable
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 40;
    setPos({
      x: Math.min(Math.max(-40, nextX), maxX),
      y: Math.min(Math.max(36, nextY), maxY),
    });
  };

  const onPointerUp = (e) => {
    dragState.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const toggleMaximize = () => {
    onFocus();
    if (!maximized) {
      savedPos.current = pos;
      setMaximized(true);
    } else {
      setMaximized(false);
      if (savedPos.current) setPos(savedPos.current);
    }
  };

  // Stop dot clicks from starting a drag on the title bar.
  const stopDrag = (e) => e.stopPropagation();

  const style = maximized
    ? {
        left: 8,
        top: 60,
        width: "calc(100vw - 16px)",
        height: "calc(100vh - 72px)",
        zIndex,
      }
    : { left: pos.x, top: pos.y, zIndex };

  return (
    <div
      ref={winRef}
      onMouseDown={onFocus}
      style={style}
      className="no-select absolute flex flex-col w-[300px] sm:w-[380px] border-4 border-plum bg-white shadow-[8px_8px_0_0_rgba(43,33,64,0.4)]"
    >
      {/* Title bar */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={toggleMaximize}
        className="window-titlebar flex items-center gap-2 border-b-4 border-plum bg-mint px-2 py-1 touch-none"
        style={{ cursor: maximized ? "default" : "grab" }}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            onPointerDown={stopDrag}
            aria-label="Close window"
            title="Close"
            className="h-3 w-3 rounded-full border border-plum bg-[#ff5f57] hover:brightness-95"
          />
          <button
            onClick={onMinimize}
            onPointerDown={stopDrag}
            aria-label="Minimize window"
            title="Minimize"
            className="h-3 w-3 rounded-full border border-plum bg-[#febc2e] hover:brightness-95"
          />
          <button
            onClick={toggleMaximize}
            onPointerDown={stopDrag}
            aria-label={maximized ? "Restore window" : "Maximize window"}
            title={maximized ? "Restore" : "Maximize"}
            className="h-3 w-3 rounded-full border border-plum bg-[#28c840] hover:brightness-95"
          />
        </div>
        <span className="flex-1 truncate text-center text-[8px] text-plum">
          {title}
        </span>
        <span className="w-8" />
      </div>

      {/* Body */}
      <div
        className={`window-body flex-1 min-h-0 overflow-y-auto p-3 text-plum ${
          maximized ? "" : "max-h-[60vh]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
