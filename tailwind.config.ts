import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", surface: "var(--surface)",
        elevated: "var(--surface-elevated)", primary: "var(--text-primary)",
        secondary: "var(--text-secondary)", mars: "var(--mars-accent)",
        "mars-muted": "var(--mars-accent-muted)", status: "var(--status-green)",
        border: "var(--border)", "border-bright": "var(--border-bright)"
      },
      fontFamily: { sans: ["var(--font-sans)"], mono: ["var(--font-mono)"] }
    }
  },
  plugins: []
} satisfies Config;
