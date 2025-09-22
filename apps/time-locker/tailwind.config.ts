import type { Config } from "tailwindcss";

export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{ts,tsx}",
      "../../packages/time-locker-ui/src/**/*.{ts,tsx}",
      "../../node_modules/time-locker-ui/dist/**/*.{js}",
    ],
  },
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
} satisfies Config;
