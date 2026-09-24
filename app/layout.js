import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata = {
  title: "AayushOS — Aayush Bisht",
  description:
    "A pixel-art macOS-style desktop portfolio. Product thinking, shipped as working automations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={pressStart.variable}>
      <body>{children}</body>
    </html>
  );
}
