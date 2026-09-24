"use client";

import { REGISTRY } from "@/lib/projects";

/**
 * Renders the contents of a folder window: a clean grid of the child project
 * icons. Clicking one opens that project's own detail window via onOpen(id).
 */
export default function FolderView({ childIds, onOpen }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {childIds.map((id) => {
        const item = REGISTRY[id];
        if (!item) return null;
        const Icon = item.icon;
        return (
          <button
            key={id}
            onClick={() => onOpen(id)}
            className="group flex flex-col items-center gap-1 p-2 text-center focus:outline-none"
          >
            <span className="flex h-12 w-12 items-center justify-center border-2 border-transparent p-1 group-hover:border-plum/40 group-focus:border-plum/60 group-active:translate-y-[1px]">
              <Icon className="h-10 w-10" />
            </span>
            <span className="text-[7px] leading-tight text-plum">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
