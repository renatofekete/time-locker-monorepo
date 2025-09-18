import type { Config } from "tailwindcss";

export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{ts,tsx}",
      "../time-locker-ui/src/**/*.{ts,tsx}", // when using npm link
      "./node_modules/time-locker-ui/dist/**/*.{js}", // when installed from npm
    ],
  },
  theme: { extend: {} },
} satisfies Config;
