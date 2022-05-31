module.exports = {
  content: ["./src/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffedef",
          100: "#ffd9df",
          200: "#ffb2c0",
          300: "#ff86a0",
          400: "#ff4d7f",
          500: "#ff0069",
          600: "#bc0049",
          700: "#900036",
          800: "#670024",
          900: "#3f0013",
        },
      },
      aspectRatio: {
        full: "4 / 5",
      },
    },
  },
  variants: {},
  plugins: [],
};
