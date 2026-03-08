import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        slateNight: "#090b10",
      },
      boxShadow: {
        halo: "0 0 0 1px rgba(255,255,255,0.08), 0 10px 40px rgba(0,0,0,0.55)",
        glow: "0 0 0 1px rgba(255,255,255,0.14), 0 16px 44px rgba(34,211,238,0.16)",
        "inner-glow": "inset 0 1px 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.06)",
        editorial: "0 2px 40px -8px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(1200px circle at 12% -8%, rgba(34,211,238,0.16), transparent 45%), radial-gradient(900px circle at 92% 16%, rgba(99,102,241,0.16), transparent 40%)",
        "mesh-card":
          "radial-gradient(600px circle at 20% 0%, rgba(34,211,238,0.10), transparent 50%), radial-gradient(400px circle at 80% 100%, rgba(99,102,241,0.08), transparent 45%)",
      },
      keyframes: {
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
