module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      roseColor: "#bf3276",
      white: "#ffffff",
      black: "#000000",
      green: "#218838",
      lightBlue: "#F5F8FB",
    },
  },
  variants: {
    extend: {},
    margin: ["responsive", "hover"],
  },
  plugins: [],
};
