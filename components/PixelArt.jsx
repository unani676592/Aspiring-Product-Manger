"use client";

/**
 * Renders a pixel-map (array of equal-length strings) as crisp SVG rects.
 * "." and " " are treated as transparent. Every other char maps to a color
 * in `palette`. viewBox is derived from the grid so it scales cleanly.
 */
function PixelSprite({ map, palette, className, style, title }) {
  const height = map.length;
  const width = map[0]?.length ?? 0;
  const rects = [];
  for (let y = 0; y < height; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === "." || ch === " ") continue;
      const fill = palette[ch];
      if (!fill) continue;
      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />
      );
    }
  }
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={style}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      {title ? <title>{title}</title> : null}
      {rects}
    </svg>
  );
}

/* ------------------------------- Palettes ------------------------------- */
const P = "#2b2140"; // plum outline
const W = "#ffffff";

/* --------------------------- Project icons ------------------------------ */

const magnifier = [
  "....PPPP........",
  "..PPGGGGPP......",
  ".PGGGGGGGGP.....",
  ".PGGWWGGGGP.....",
  "PGGWWGGGGGGP....",
  "PGGGGGGGGGGP....",
  "PGGGGGGGGGGP....",
  "PGGGGGGGGGGP....",
  ".PGGGGGGGGP.....",
  ".PGGGGGGGGP.....",
  "..PPGGGGPPP.....",
  "....PPPPP.PP....",
  "..........PP....",
  "...........PP...",
  "............PP..",
  ".............P..",
];

export function MagnifierIcon({ className, title = "WaveLength Teardown" }) {
  return (
    <PixelSprite
      map={magnifier}
      palette={{ P, G: "#cfe8ff", W }}
      className={className}
      title={title}
    />
  );
}

const robot = [
  ".......P........",
  ".......P........",
  "......PPP.......",
  "................",
  "..PPPPPPPPPP....",
  ".PMMMMMMMMMMP...",
  "PMMMMMMMMMMMMP..",
  "PMWWMMMMMMWWMP..",
  "PMWWMMMMMMWWMP..",
  "PMMMMMMMMMMMMP..",
  "PMMMMPPPPMMMMP..",
  "PMMMMMMMMMMMMP..",
  ".PMMMMMMMMMMP...",
  "..PPPPPPPPPP....",
  "...P......P.....",
  "...P......P.....",
];

export function RobotIcon({ className, title = "AI Assistant" }) {
  return (
    <PixelSprite
      map={robot}
      palette={{ P, M: "#bfe8d4", W }}
      className={className}
      title={title}
    />
  );
}

const box = [
  "................",
  ".PPPPPPPPPPPPPP.",
  ".PBBBBBTTBBBBBP.",
  ".PBBBBBTTBBBBBP.",
  ".PPPPPPTTPPPPPP.",
  ".PDDDDDTTDDDDDP.",
  ".PDDDDDTTDDDDDP.",
  ".PDDDDDTTDDDDDP.",
  ".PDDDDDTTDDDDDP.",
  ".PDDDDDTTDDDDDP.",
  ".PDDDDDTTDDDDDP.",
  ".PDDDDDTTDDDDDP.",
  ".PDDDDDTTDDDDDP.",
  ".PPPPPPPPPPPPPP.",
  "................",
  "................",
];

export function BoxIcon({ className, title = "Order Routing" }) {
  return (
    <PixelSprite
      map={box}
      palette={{ P, B: "#e6bd85", D: "#cf9a54", T: "#fff3a8" }}
      className={className}
      title={title}
    />
  );
}

const target = [
  ".......PP.......",
  ".....PPPPPP.....",
  "....PRRRRRRP....",
  "...PRRRRRRRRP...",
  "..PRRRPPPPRRRP..",
  "..PRRPWWWWPRRP..",
  "PPPRRPWRRWPRRPPP",
  "PPPRRPWRRWPRRPPP",
  "PPPRRPWRRWPRRPPP",
  "PPPRRPWRRWPRRPPP",
  "..PRRPWWWWPRRP..",
  "..PRRRPPPPRRRP..",
  "...PRRRRRRRRP...",
  "....PRRRRRRP....",
  ".....PPPPPP.....",
  ".......PP.......",
];

export function TargetIcon({ className, title = "GTM Research" }) {
  return (
    <PixelSprite
      map={target}
      palette={{ P, R: "#e56b7a", W }}
      className={className}
      title={title}
    />
  );
}

const trash = [
  "................",
  "......PPPP......",
  "....PPPPPPPP....",
  "...PPPPPPPPPP...",
  "...PSSPSSPSSP...",
  "...PSSPSSPSSP...",
  "...PSSPSSPSSP...",
  "...PSSPSSPSSP...",
  "...PSSPSSPSSP...",
  "...PSSPSSPSSP...",
  "...PSSPSSPSSP...",
  "...PSSPSSPSSP...",
  "...PSSPSSPSSP...",
  "...PPPPPPPPPP...",
  "................",
  "................",
];

export function TrashIcon({ className, title = "Rejected Concepts" }) {
  return (
    <PixelSprite
      map={trash}
      palette={{ P, S: "#cbd5e6" }}
      className={className}
      title={title}
    />
  );
}

const folder = [
  "................",
  "..PPPPP.........",
  ".PFFFFFP........",
  "PPPPPPPPPPPPPPP.",
  "PFFFFFFFFFFFFFP.",
  "PFFFFFFFFFFFFFP.",
  "PFFFFFFFFFFFFFP.",
  "PFFFFFFFFFFFFFP.",
  "PFFFFFFFFFFFFFP.",
  "PFFFFFFFFFFFFFP.",
  "PFFFFFFFFFFFFFP.",
  "PFFFFFFFFFFFFFP.",
  "PDDDDDDDDDDDDDP.",
  "PPPPPPPPPPPPPPP.",
  "................",
  "................",
];

export function FolderIcon({ className, title = "AI Automations" }) {
  return (
    <PixelSprite
      map={folder}
      palette={{ P, F: "#f2c766", D: "#d9a441" }}
      className={className}
      title={title}
    />
  );
}

// A blue folder with a magnifying-glass motif — for product/teardown work.
const teardownFolder = [
  "................",
  "..PPPPP.........",
  ".PVVVVVP........",
  "PPPPPPPPPPPPPPP.",
  "PVVVVVVVVVVVVVP.",
  "PVVVPPPPVVVVVVP.",
  "PVVPGGGGPVVVVVP.",
  "PVVPGWWGPVVVVVP.",
  "PVVPGGGGPVVVVVP.",
  "PVVVPPPPPVVVVVP.",
  "PVVVVVVVPPVVVVP.",
  "PVVVVVVVVPPVVVP.",
  "PUUUUUUUUUPPUUP.",
  "PPPPPPPPPPPPPPP.",
  "................",
  "................",
];

export function TeardownFolderIcon({ className, title = "Product Teardowns" }) {
  return (
    <PixelSprite
      map={teardownFolder}
      palette={{ P, V: "#b3c7f0", U: "#8aa8e0", G: "#cfe8ff", W }}
      className={className}
      title={title}
    />
  );
}

/* --------------------------- Pixel character ---------------------------- */

const girl = [
  ".....HHHHHH.....",
  "....HHHHHHHH....",
  "...HHHHHHHHHH...",
  "..HHSSSSSSSSHH..",
  "..HSSSSSSSSSSH..",
  "..HSSPSSSSPSSH..",
  "..HSSSSSSSSSSH..",
  "..HSSSSPPSSSSH..",
  "..HHSSSSSSSSHH..",
  "...HHSSSSSSHH...",
  "....FFFFFFFF....",
  "...FFFFFFFFFF...",
  "..FFFFFFFFFFFF..",
  "..FFFFFFFFFFFF..",
  "..SFFFFFFFFFFS..",
  "...FFFFFFFFFF...",
  "...FFFFFFFFFF...",
  "...LLLL..LLLL...",
  "...LLLL..LLLL...",
  "..OOOO...OOOO...",
];

export function PixelGirl({ className, style }) {
  return (
    <PixelSprite
      map={girl}
      palette={{
        H: "#5a3e28",
        S: "#ffd9b8",
        P,
        F: "#b7a6ff",
        L: "#ffd9b8",
        O: P,
      }}
      className={className}
      style={style}
      title="Aayush"
    />
  );
}

/* -------------------------------- Cloud --------------------------------- */

const cloud = [
  "....CCCC........",
  "..CCCCCCCC......",
  ".CCCCCCCCCCCC...",
  "CCCCCCCCCCCCCCC.",
  "CCCCCCCCCCCCCCCC",
  ".CCCCCCCCCCCCCC.",
];

export function Cloud({ className, style }) {
  return (
    <PixelSprite
      map={cloud}
      palette={{ C: "rgba(255,255,255,0.85)" }}
      className={className}
      style={style}
      title="cloud"
    />
  );
}

/* --------------------------- Sound toggle icons ------------------------- */

const speakerOn = [
  "....S...WW",
  "...SS..W.W",
  ".SSSS.W.WW",
  ".SSSSW.W.W",
  ".SSSSW.W.W",
  ".SSSS.W.WW",
  "...SS..W.W",
  "....S...WW",
];

const speakerOff = [
  "....S.....",
  "...SS.X..X",
  ".SSSS..XX.",
  ".SSSS...X.",
  ".SSSS..XX.",
  ".SSSS.X..X",
  "...SS.....",
  "....S.....",
];

export function SoundIcon({ muted, className }) {
  return (
    <PixelSprite
      map={muted ? speakerOff : speakerOn}
      palette={{ S: P, W: P, X: "#e56b7a" }}
      className={className}
      title={muted ? "Sound off" : "Sound on"}
    />
  );
}
