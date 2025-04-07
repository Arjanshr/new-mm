import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      small: "575px",
      medium: "768px",
      large: "1350px",
    },
    extend: {
      borderImage: {
        'gradient': 'linear-gradient(180deg, #DD2F2F 0%, #0EF516 46%, #0F88FA 100%) 1'
      },

      animation: {
        fadeInDown: 'fadeInDown 0.5s ease-out',
        fadeOutUp: 'fadeOutUp 0.5s ease-in',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOutUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'custom-gradient': 'linear-gradient(180deg, #1B88D3 24%, #9A72F8 100%)',

        "abouttop": 'linear-gradient(180deg, #4C94E9 0%, #7F2B83 64%)',
        "pricing": 'linear-gradient(262.94deg, #FFFFFF 1.49%, #E2E7FF 98.51%)',
        "software": 'linear-gradient(262.94deg, #FFFFFF 26.81%, #B4C6FF 98.51%)',
        "seo": 'linear-gradient(262.94deg, #FFFFFF 1.49%, #FAEFD5 98.51%)',
        "app": 'linear-gradient(262.94deg, #FFFFFF 1.49%, #BCE798 98.51%)',
        "social": 'linear-gradient(262.94deg, #FFFFFF 1.49%, #FFD3D3 98.51%)',
        "graphics": 'linear-gradient(262.94deg, #FFFFFF 1.49%, #6BDCFF 98.51%)',






      },
      colors: {
        primary: "#1058a5",
        yellow: "#FEA501",
        secondary: "#a38d35",
        bgsecondary: "#f1f4f9",
        background: "#F4f4f4",
        webblack: "#443D3D"
      },

      width: {
        content: "1250px",
      },
      boxShadow: {
        slider: "0px 7px 14.9px 0px #00000038;",
        shadow: "4px 4px 4px rgba(33, 33, 33, 0.20)",
        card: "0px 4px 15.7px 0px #00000024",
        image: "2px 4px 4px 0px #00000040",
        list: "0px 4px 114px 0px #00000017",
        document: "1px 1px 2px 2px rgba(237, 237, 237, 0.671)"


      },
    },
  },
  plugins: [

  ],
};
export default config;
