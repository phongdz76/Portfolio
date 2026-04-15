/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "420px",
        "3xl": "1600px",
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(15, 23, 42, 0.35)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 10% 20%, rgba(251, 146, 60, 0.2), transparent 45%), radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.18), transparent 40%), radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.14), transparent 50%)",
      },
    },
  },
  plugins: [],
};
