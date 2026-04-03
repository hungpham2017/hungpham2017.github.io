/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        gray: {
          200: 'rgb(var(--text-bright) / <alpha-value>)',
          400: 'rgb(var(--text-muted) / <alpha-value>)',
          500: 'rgb(var(--text-faint) / <alpha-value>)',
          600: 'rgb(var(--text-fainter) / <alpha-value>)',
          700: 'rgb(var(--border-dim) / <alpha-value>)',
          800: 'rgb(var(--border-main) / <alpha-value>)',
          900: 'rgb(var(--bg-card) / <alpha-value>)',
          950: 'rgb(var(--bg-base) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};
