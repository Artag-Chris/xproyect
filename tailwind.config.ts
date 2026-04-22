import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#007bff",
          light: "#0d7ce4",
          dark: "#0056b3",
          50: "#f0f7ff",
          100: "#e0edff",
          200: "#bae6ff",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c3d66",
        },
        surface: {
          DEFAULT: "var(--surface)",
          secondary: "var(--surface-secondary)",
          tertiary: "var(--surface-tertiary)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          disabled: "var(--text-disabled)",
        },
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },
      },
      backgroundColor: {
        primary: "var(--background)",
        surface: "var(--surface)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
      },
      borderColor: {
        primary: "var(--border)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },
      backgroundImage: {
        "gradient-electric": "linear-gradient(135deg, #007bff 0%, #0d7ce4 100%)",
        "gradient-fade": "linear-gradient(180deg, rgba(0, 123, 255, 0.1) 0%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
