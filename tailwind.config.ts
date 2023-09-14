import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans"],
      },
      colors: {
        primary: {
          light: "#FF5733", // Light variant
          DEFAULT: "#FF5733", // Default variant
          dark: "#E63E0A", // Dark variant
        },
        secondary: {
          light: "#5AA6FF", // Light variant
          DEFAULT: "#3498DB", // Default variant
          dark: "#1E56A0", // Dark variant
        },
        accent: {
          light: "#FFC04D", // Light variant
          DEFAULT: "#F39C12", // Default variant
          dark: "#D97A0D", // Dark variant
        },
      },

      gradientColorStops: {
        primary: {
          start: "#FF5733",
          end: "#F39C12",
        },
        secondary: {
          start: "#3498DB",
          end: "#F39C12",
        },
        accent: {
          start: "#F39C12",
          end: "#FF5733",
        },
      },
      linearGradientColors: (theme: any) => theme("gradientColorStops"),
    },
  },
  plugins: [require("@tailwindcss/forms"),
  require('@tailwindcss/aspect-ratio'),
],
};
export default config;
