# AayushOS — Pixel-Art Desktop Portfolio

A pixel-art, macOS-style desktop portfolio for **Aayush Bisht** (Product Manager).
Boot into "AayushOS," drag icons around a pastel desktop, and open draggable
windows to explore product teardowns and AI automation projects.

> _product thinking, shipped as working automations._

## ✨ Features

- **Boot screen** — "AayushOS v1.0" with a typewriter title, pixel loading bar, and click-to-skip.
- **Top menu bar** — name, decorative menu items, a live clock, and a working sound toggle.
- **Pastel desktop** — pink → peach → lavender gradient with slowly drifting pixel clouds.
- **Draggable desktop icons** — pick up and reposition icons with mouse or touch; a quick click still opens them.
- **Folders & windows**
  - **Product Teardowns** folder → WaveLength Teardown
  - **AI Automations** folder → AI Assistant, Order Routing, GTM Research
  - **Rejected Concepts** trash — an easter egg of scrapped ideas
- **macOS-style windows** — draggable by the title bar, stackable, with **functional** traffic-light controls:
  - 🔴 close · 🟡 minimize (to a dock) · 🟢 maximize / restore
- **Project detail** — each project window is structured as Problem · Approach · Key Decision · Impact & Product Validation · Status.
- **8-bit sounds** — blips on window open/close, generated with the Web Audio API (no audio files), with a mute toggle.
- **Custom pixel cursor** and hand-authored pixel-art icons rendered as crisp SVG.

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) via `next/font`
- Web Audio API for sound; Pointer Events for drag (mouse + touch)

## 🚀 Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev
```

Then open **http://localhost:3000**.

```bash
# production build
npm run build
npm start
```

## 📁 Project Structure

```
app/
  layout.js          # root layout, font setup
  page.js            # desktop orchestrator: windows, dock, sounds
  globals.css        # Tailwind + pixel cursor / animations
components/
  BootScreen.jsx     # typewriter boot screen
  MenuBar.jsx        # top bar: clock + sound toggle
  DesktopIcon.jsx    # draggable desktop icons
  Window.jsx         # draggable window + traffic-light controls
  WindowContent.jsx  # project / trash window body
  FolderView.jsx     # folder contents grid
  PixelArt.jsx       # hand-authored pixel sprites (icons, character, clouds)
  StickyNote.jsx
  PixelCharacter.jsx
lib/
  projects.js        # window registry + desktop layout data
  useSound.js        # 8-bit blips via Web Audio
```

## 🎨 Design

- **Palette:** `#ffd7e6 → #ffe3c2 → #e3d9ff` background, `#2b2140` plum text/outlines, `#bfe8d4` mint accent.
- All pixel art is defined as compact string maps and rendered to SVG `<rect>`s, so it stays crisp at any size.

---

Built with [Claude Code](https://claude.com/claude-code).
