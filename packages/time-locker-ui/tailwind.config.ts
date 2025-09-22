import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#407BFF",
          dark: "#2C498B",
          darker: "#1A3366",
        },
      },
    },
  },
  corePlugins: { preflight: false },
};

export default config satisfies Config;
