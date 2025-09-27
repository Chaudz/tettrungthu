/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "midautumn-red": {
          50: "#fff1f1",
          100: "#ffe1e1",
          200: "#ffc7c7",
          300: "#ffa0a0",
          400: "#ff6b6b",
          500: "#f83b3b",
          600: "#e51d1d",
          700: "#c11414",
          800: "#a01414",
          900: "#841818",
          950: "#480707",
        },
        "midautumn-gold": {
          50: "#fefbe8",
          100: "#fff8c2",
          200: "#ffee88",
          300: "#ffdf48",
          400: "#ffcf1a",
          500: "#f0b500",
          600: "#d18e00",
          700: "#a66602",
          800: "#8a5008",
          900: "#75420d",
          950: "#432204",
        },
        "moon-pastel": {
          50: "#f9f9fb",
          100: "#f0f1f5",
          200: "#e3e5ed",
          300: "#ccd0e0",
          400: "#afb5cf",
          500: "#9299be",
          600: "#7b81ad",
          700: "#6a6d97",
          800: "#575a7c",
          900: "#494c64",
          950: "#2d2f3d",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px 2px rgba(240, 181, 0, 0.3)" },
          "50%": { boxShadow: "0 0 25px 5px rgba(240, 181, 0, 0.6)" },
        },
      },
      boxShadow: {
        "prize-card": "0 4px 20px -2px rgba(0, 0, 0, 0.2)",
        "prize-card-hover": "0 8px 30px -2px rgba(0, 0, 0, 0.3)",
        legendary: "0 0 15px 2px rgba(240, 181, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
