/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "BrightBlue" : "#052F5F",
        "WarmYellow" : "#FDD835",
        "Carmin Red" : "#E63946",
        "EconGreen900" : "#59B666",
        "DarkTeal" : "#052F5F",
        "White" : "#FFFFFF",
        "Placeholder" : "475569",
        "Blue Royal" : "#02A6FF"
      }
    },
  },
  plugins: [],
};
