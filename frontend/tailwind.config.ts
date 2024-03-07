import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      typography: (theme:any) => ({
        gray: {
          css: {
            '--tw-prose-headings': theme('colors.primary'),
          },
        },
      }),
      colors: {
        red: {
          800: "#5c050c",
        },
      },
      spacing: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
      },
      fontSize: {
        'd2': ['6rem', {
          lineHeight: '1.5',
          fontWeight: '700',
        }],
        'd1': ['4rem', {
          lineHeight: '1.25',
          fontWeight: '700',
        }],
        'h1': ['3rem', {
          lineHeight: '1.25',
          fontWeight: '700',
        }],
        'h2': ['2.5rem', {
          lineHeight: '1.25',
          fontWeight: '700',
        }],
        'h3': ['2rem', {
          lineHeight: '1.25',
          fontWeight: '500',
        }],
        'h4': ['1.5rem', {
          lineHeight: '1.25',
          fontWeight: '500',
        }],
        'h5': ['1.25rem', {
          lineHeight: '1.25',
          fontWeight: '400',
        }],
        'h6': ['1rem', {
          lineHeight: '1.25',
          fontWeight: '700',
        }],
        'p-lg': ['1rem', {
          lineHeight: '1.25',
          fontWeight: '400',
        }],
        'p-md': ['.875rem', {
          lineHeight: '1.25',
          fontWeight: '400',
        }],
        'p': ['.75rem', {
          lineHeight: '1.25',
          fontWeight: '400',
        }],
        'p-sm': ['.625rem', {
          lineHeight: '1',
          fontWeight: '400',
        }],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      prefix: "nextui",
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        disabledOpacity: ".3",
        radius: {
          small: "2px",
          medium: "4px",
          large: "6px",
        },
        borderWidth: {
          small: "1px",
          medium: "1px",
          large: "2px",
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#024940",
              foreground: "#f8fbef",
              500: "#0a3832",
            },
            secondary: {
              DEFAULT: "#f8fbef",
              foreground: "#024940",
              500: "#edefe4"
            }
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#f8fbef",
              foreground: "#024940",
              500: "#edefe4"

            },
            secondary: {
              DEFAULT: "#024940",
              foreground: "#f8fbef",
              500: "#0a3832",
            },
          },
        },
      },
    })
  ],
};
export default config;
