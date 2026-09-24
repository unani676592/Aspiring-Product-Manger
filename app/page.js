"use client";

import { useCallback, useState } from "react";
import BootScreen from "@/components/BootScreen";
import MenuBar from "@/components/MenuBar";
import StickyNote from "@/components/StickyNote";
import PixelCharacter from "@/components/PixelCharacter";
import DesktopIcon from "@/components/DesktopIcon";
import Window from "@/components/Window";
import WindowContent from "@/components/WindowContent";
import FolderView from "@/components/FolderView";
import { Cloud } from "@/components/PixelArt";
import { REGISTRY, DESKTOP_ICONS } from "@/lib/projects";
import { useSound } from "@/lib/useSound";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [muted, setMuted] = useState(false);
  const [openIds, setOpenIds] = useState([]); // stacking order: last = front
  const [minimizedIds, setMinimizedIds] = useState([]); // hidden, shown in dock
  const { playOpen, playClose, playBlip } = useSound(muted);

  const openWindow = useCallback(
    (id) => {
      const wasMinimized = minimizedIds.includes(id);
      const wasOpen = openIds.includes(id);
      if (wasMinimized) {
        // restore from the dock and bring to front
        setMinimizedIds((prev) => prev.filter((x) => x !== id));
        setOpenIds((prev) => [...prev.filter((x) => x !== id), id]);
        playOpen();
      } else if (wasOpen) {
        // already open: bring to front
        setOpenIds((prev) => [...prev.filter((x) => x !== id), id]);
        playBlip();
      } else {
        setOpenIds((prev) => [...prev, id]);
        playOpen();
      }
    },
    [openIds, minimizedIds, playOpen, playBlip]
  );

  const focusWindow = useCallback((id) => {
    setOpenIds((prev) =>
      prev[prev.length - 1] === id
        ? prev
        : [...prev.filter((x) => x !== id), id]
    );
  }, []);

  const minimizeWindow = useCallback(
    (id) => {
      playBlip();
      setMinimizedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [playBlip]
  );

  const closeWindow = useCallback(
    (id) => {
      playClose();
      setOpenIds((prev) => prev.filter((x) => x !== id));
      setMinimizedIds((prev) => prev.filter((x) => x !== id));
    },
    [playClose]
  );

  return (
    <main
      className="relative h-screen w-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffd7e6 0%, #ffe3c2 50%, #e3d9ff 100%)",
      }}
    >
      {/* Floating pixel clouds */}
      <Cloud
        className="absolute h-10 w-24 animate-drift-slow opacity-90"
        style={{ top: "70px" }}
      />
      <Cloud
        className="absolute h-8 w-20 animate-drift-slower opacity-80"
        style={{ top: "180px" }}
      />
      <Cloud
        className="absolute h-12 w-28 animate-drift-slowest opacity-90"
        style={{ top: "300px" }}
      />

      <MenuBar muted={muted} onToggleMute={() => setMuted((m) => !m)} />

      {/* Desktop icons */}
      {DESKTOP_ICONS.map(({ id, iconPos, sublabel }) => {
        const item = REGISTRY[id];
        return (
          <DesktopIcon
            key={id}
            icon={item.icon}
            label={item.label}
            sublabel={sublabel}
            onOpen={() => openWindow(id)}
            initialPos={iconPos}
          />
        );
      })}

      <StickyNote />
      <PixelCharacter />

      {/* Open windows (minimized ones are hidden and live in the dock) */}
      {openIds.map((id) => {
        if (minimizedIds.includes(id)) return null;
        const item = REGISTRY[id];
        if (!item) return null;
        const z = 40 + openIds.indexOf(id);
        return (
          <Window
            key={id}
            title={item.label}
            initialPos={item.windowPos}
            zIndex={z}
            onFocus={() => focusWindow(id)}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
          >
            {item.content.type === "folder" ? (
              <FolderView
                childIds={item.content.childIds}
                onOpen={openWindow}
              />
            ) : (
              <WindowContent content={item.content} />
            )}
          </Window>
        );
      })}

      {/* Dock: minimized windows shrink here and reopen on click */}
      {minimizedIds.length > 0 && (
        <div className="fixed bottom-2 left-2 z-[70] flex flex-wrap gap-2">
          {minimizedIds.map((id) => {
            const item = REGISTRY[id];
            if (!item) return null;
            const Icon = item.icon;
            return (
              <button
                key={id}
                onClick={() => openWindow(id)}
                title={`Reopen ${item.label}`}
                className="flex items-center gap-1 border-2 border-plum bg-white/85 px-2 py-1 shadow-[3px_3px_0_0_rgba(43,33,64,0.3)] active:translate-y-[1px]"
              >
                <Icon className="h-5 w-5" />
                <span className="max-w-[90px] truncate text-[7px] text-plum">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {booting && <BootScreen onDismiss={() => setBooting(false)} />}
    </main>
  );
}
