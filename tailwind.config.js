/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "#111111",
        card: "#1C1C1E",
        "card-alt": "#1A1A1A",
        accent: "#019CDF",
        muted: "#888888",
        border: "#2A2A2A",
        tabbar: "#161616",
        premium: "#FFB800",
        heart: "#FF2D55",
      },
    },
  },
  plugins: [],
};
