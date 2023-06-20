/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        dashboardIn: {
          from: {
            opacity: 0.5,
            scale: "1.05",
          },
          to: {
            opacity: 1,
            scale: "1",
          },
        },
        floatIn: {
          from: {
            transform: "translateY(16px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0px)",
            opacity: "1",
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        shake: {
          "0%": {
            transform: "translateX(0px)",
          },
          "25%": {
            transform: "translateX(-10px)",
          },
          "50%": {
            transform: "translateX(7px)",
          },
          "75%": {
            transform: "translateX(-5px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
      },
      animation: {
        dashboardIn: "dashboardIn 0.3s forwards ease-in",
        blogIn: "floatIn 0.3s forwards ease-in",
        fadeIn: "fadeIn 0.3s forwards ease-in",
        shake: "shake 0.5s ease-in",
      },
    },
  },
  plugins: [],
};
