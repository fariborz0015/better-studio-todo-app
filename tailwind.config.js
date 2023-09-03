const colors = require("tailwindcss/colors");

const customColors = {
  todoTitle: "#6E1E29",
  todoBackground: "#FEF4F3",
  todoInfo: "#D4AFB4",
  todoAction: "#D37A87",
  doingTitle: "#795B19",
  doingBackground: "#FFFBF2",
  doingInfo: "#DECCA4",
  doingAction: "#C2A25B",
  doneTitle: "#286C1A",
  doneBackground: "#F4F9F3",
  doneInfo: "#BCD7B6",
  doneAction: "",
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern:
        /(todoTitle|todoBackground|todoInfo|todoAction|doingTitle|doingBackground|doingInfo|doingAction|doneTitle|doneBackground|doneInfo|doneAction)/, // This includes your custom text colors
    },
  ],
  theme: {
    colors: {
      ...colors,
      ...customColors,
    },
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: "1rem",

      // default breakpoints but with 40px removed
      screens: {
        sm: "600px",
        md: "728px",
        lg: "1060px",
      },
    },
  },
  plugins: [],
};
