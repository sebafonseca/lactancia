/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        rosePastel: "#F9DDE3",
        violetSoft: "#CABDFF",
        cream: "#FFF8F0",
        babyBlue: "#DDEBFF",
        mint: "#DAF3EA",
        violetDeep: "#5A4FCF"
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 12px 30px rgba(90, 79, 207, 0.15)"
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem"
      }
    }
  },
  plugins: []
};
