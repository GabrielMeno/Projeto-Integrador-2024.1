module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      md: { max: "1050px" },
      sm: { max: "550px" }
    },
    extend: {
      colors: {
        black: "#000000",
        gray: { 300: "#dddfeb" },
        indigo: {
          700: "#344789",
          800: "#344689",
          900: "#001489",
          "700_01": "#38448a",
          "800_01": "#37438a"
        },
        neutral: { neutral_0: "#ffffffbf" },
        red: { a700: "#d51515" },
        white: { a700: "#ffffff" }
      },
      boxShadow: {
        xs: "4px 8px 4px 0 rgba(0,0,0,0.3)",
        sm: "4px 8px 4px 0 rgba(0,0,0,0.5)",
        md: "4px 8px 4px 0 rgba(0,0,0,0.2)"
      },
      fontFamily: {
        poppins: "Poppins",
        paytoneone: "Paytone One",
        inter: "Inter"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};
