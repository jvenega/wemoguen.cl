import type { Config } from "tailwindcss"

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4B2863",
          foreground: "#ffffff",
        },
      },
    },
  },
}

export default config