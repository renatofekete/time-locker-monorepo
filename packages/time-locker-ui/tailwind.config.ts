import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  corePlugins: { preflight: false },
};

export default config satisfies Config;
