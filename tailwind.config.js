module.exports = {
  purge: ['./index.html', './web/**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3AB9D4',
          DEFAULT: '#3AB9D4',
          dark: '#3AB9D4',
        },
        'light-bg': {
          DEFAULT: '#ddd',
        },
        'dark-bg': {
          DEFAULT: '#222',
        }
      },
      fontFamily: {
        sans: "'sans', apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        mono: "'IBM Plex Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
