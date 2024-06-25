module.exports = {
mode: "jit",
content: ["./src/**/**/*.{js,ts, jsx, tsx, html, mdx}", "./src/**/*.{js,ts,jsx, tsx, html, mdx}"], 
darkMode: "class",
theme: {
  screens: { md: { max: "1050px" }, sm: { max: "550px" } },
  extend: {
    colors: {
    black: {"900_33": "#00000033", "900_3f": "#0000003f", "900_5f": "#0000005f" },
    gray: {300: "#dddfeb" },
    indigo: {700: "#344789", 800: "#344689", 900: "#001489", "700_01": "#38448a", "800_01": "#37438a" }, 
    neutral: { neutral_0: "#ffffffbf" },
    red: { a700: "#d51515" },
    white: { a700: "#ffffff" },
    },
    boxShadow: { xs: "4px 8px 4px 0 #0000003f", sm: "4px 8px 4px 0 #0000005f", md: "4px 8px 4px 0 #00000033" }, 
    fontFamily: { poppins: "Poppins", paytoneone: "Paytone One", inter: "Inter" },
},  
},
  plugins: [require("@tailwindcss/forms")],
};