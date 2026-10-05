/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F3EE",
        paper: "#FFFCF8",
        blush: "#F3EBE4",
        ink: "#2C2622",
        muted: "#5C534C",
        line: "#E4D8CE",
        sage: "#3E5346",
        sageHover: "#314237",
        danger: "#8E3B32"
      },
      fontFamily: {
        sans: ["Source Sans 3", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};
