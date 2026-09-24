/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: "#2b2140",
        mint: "#bfe8d4",
        "bg-pink": "#ffd7e6",
        "bg-peach": "#ffe3c2",
        "bg-lavender": "#e3d9ff",
        note: "#fff3a8",
      },
      fontFamily: {
        pixel: ["var(--font-press-start)", "monospace"],
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateX(-20vw)" },
          "100%": { transform: "translateX(120vw)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        loadbar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "drift-slow": "drift 60s linear infinite",
        "drift-slower": "drift 90s linear infinite",
        "drift-slowest": "drift 120s linear infinite",
        bob: "bob 2.2s ease-in-out infinite",
        loadbar: "loadbar 2.3s steps(20) forwards",
        blink: "blink 1s steps(2) infinite",
      },
    },
  },
  plugins: [],
};
