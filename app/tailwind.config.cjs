/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- Design System Tokens (ui_spec.md) ---
      colors: {
        paper:    "#F5F7FA",  // App background
        surface:  "#FFFFFF",  // Tables, drawers, phone screen
        ink:      "#1A2233",  // Text, table rules
        "ink-soft": "#55607A", // Secondary text
        rule:     "#D8DEE8",  // Ledger lines
        indigo:   "#2F3E9E",  // Primary actions, links, verified seal
        marigold: "#F2A20C",  // The person in focus / dot
        room:     "#0E7C6B",  // Likely room – solid teal tint
        uncertain:"#6B7385",  // Grey diagonal hatch color
        crowded:  "#B5471B",  // Rust tint, fine dot pattern
      },
      fontFamily: {
        // Primary: Anek (Google Fonts-compatible, multi-script)
        sans: ["Anek Latin", "Noto Sans", "system-ui", "sans-serif"],
        // Monospaced tabular figures for numbers in tables
        mono: ["Noto Sans Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // 4px base unit steps
        "2xs": ["10px", { lineHeight: "16px" }],
        xs:    ["12px", { lineHeight: "16px" }],
        sm:    ["14px", { lineHeight: "20px" }],
        base:  ["16px", { lineHeight: "24px" }],
        lg:    ["18px", { lineHeight: "28px" }],
        xl:    ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
      },
      spacing: {
        // Explicit 4px base unit values (ui_spec.md)
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
      },
      borderRadius: {
        DEFAULT: "8px",   // Cards: 8px radius
        sm: "4px",
        lg: "12px",
        full: "9999px",
      },
      maxWidth: {
        console: "1360px",  // Console grid max-width
      },
      // Phone frame dimensions
      width: {
        phone: "390px",
      },
      height: {
        phone: "844px",
      },
      // Touch targets (ui_spec.md: min 64px, main controls 72px)
      minHeight: {
        touch: "64px",
        "touch-main": "72px",
      },
      boxShadow: {
        // Cards: NO shadow; drawers/overlays get shadow
        drawer: "0 4px 24px 0 rgba(26,34,51,0.16)",
        overlay: "0 2px 8px 0 rgba(26,34,51,0.10)",
      },
      transitionDuration: {
        // Animations max 1s (ui_spec.md)
        rerank: "600ms",    // Re-rank slide
        wow: "900ms",       // WOW dot animation
        default: "200ms",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "dot-travel": {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "var(--dot-end)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 200ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
        "dot-travel": "dot-travel 900ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};
