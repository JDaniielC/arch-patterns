import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        border: '#262626',
        'text-primary': '#fafafa',
        'text-secondary': '#a3a3a3',
        accent: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
      },
    },
  },
  plugins: [],
}

export default config
