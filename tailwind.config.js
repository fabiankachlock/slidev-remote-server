module.exports = {
  purge: ['./index.html', './web/**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4ac9e4',
          DEFAULT: '#3AB9D4',
          dark: '#2aa9c4',
        },
        'light-bg': {
          light: '#e4e4e4',
          DEFAULT: '#ddd',
          dark: '#d4d4d4',
        },
        'dark-bg': {
          light: '#2b2b2b',
          DEFAULT: '#222',
          dark: '#1b1b1b',
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
