// import type { Config } from "tailwindcss";

// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// } satisfies Config;

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const { apply } = require("file-loader");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
    }),

    extend: {
      boxShadow: {
        smd: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        "md-reverse":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      colors: {
        gray: {
          1: { active: "#222222", disabled: "#D8D8D8" },
          2: "#484848",
          3: "#848484",
          4: "#CABFBF",
          5: "#FFFFFF",
        },
        key: {
          1: "#280808",
          2: "#804F4F",
          3: "#A77878",
          4: "#CFA4A4",
          5: "#E9DBDB",
          6: "#EBDECD",
          7: "#F4EFE2",
          8: "#FBF8F1",
          9: "#FAFAFA",
        },
        point: {
          pink: "#FF2F61",
          peach: "#FFBFAB",
          blue: "#7675AE",
          orange: "#FFAB49",
          green: "#56DE64",
          warning: "#FF4A4A",
        },
        kakaoYellow: "#FEE500",
        naverGreen: "#03C75A",
      },
      fontFamily: {
        sans: ['"Spoqa Han Sans Neo"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        10: ["0.625rem", { lineHeight: "1rem" }],
        11: ["0.6875rem", { lineHeight: "1rem" }],
        12: defaultTheme.fontSize.xs,
        13: ["0.8125rem", { lineHeight: "1.125rem" }],
        14: defaultTheme.fontSize.sm,
        15: ["0.9375rem", { lineHeight: "1.375rem" }],
        16: defaultTheme.fontSize.base,
        17: ["1.0625rem", { lineHeight: "1.625rem" }],
        18: defaultTheme.fontSize.lg,
        19: ["1.1875rem", { lineHeight: "1.875rem" }],
        20: defaultTheme.fontSize.xl,
        22: ["1.375rem", { lineHeight: "2rem" }],
        24: defaultTheme.fontSize["2xl"],
        26: ["1.625rem", { lineHeight: "2.375rem" }],
        30: defaultTheme.fontSize["3xl"],
        36: defaultTheme.fontSize["4xl"],
        48: defaultTheme.fontSize["5xl"],
        60: defaultTheme.fontSize["6xl"],
        72: defaultTheme.fontSize["7xl"],
        96: defaultTheme.fontSize["8xl"],
        128: defaultTheme.fontSize["9xl"],
      },
      borderRadius: {
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "1fr-auto": "1fr auto",
        "auto-1fr-auto": "auto 1fr auto",
      },
      gridTemplateRows: {
        "auto-1fr": "auto 1fr",
        "auto-auto-1fr": "minmax(0, auto) minmax(0, auto) minmax(0, 1fr)",
        "auto-1fr-auto": "auto 1fr auto",
        "1fr-auto-auto": "1fr auto auto",
      },
      height: (theme) => ({
        97: "24.25rem",
        86: "21.5rem",
        auto: "auto",
        ...theme("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/10": "10%",
        full: "100%",
        screen: "100vh",
        "screen-5": "calc( 100vh - 5rem )",
        "screen-10": "calc( 100vh - 10rem )",
        "screen-15": "calc( 100vh - 15rem )",
      }),
      letterSpacing: {
        widest: "2rem",
      },
      minHeight: {
        12: "3rem",
        16: "4rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        "screen-4": "calc( 100vh - 4rem )",
        "screen-5": "calc( 100vh - 5rem )",
        "screen-10": "calc( 100vh - 10rem )",
        "screen-15": "calc( 100vh - 15rem )",
      },
      maxWidth: {
        inherit: "inherit",
      },
      top: {
        "1/2": "50%",
      },
      width: {
        sm: "40rem",
        34: "8.5rem",
        26: "6.5rem",
        76: "19rem",
        82: "20.5rem",
        104: "26rem",
        172: "43rem",
        148: "37rem",
        inherit: "inherit",
        "half-1": "calc( 50% - 0.25rem )",
        "half-2": "calc( 50% - 0.5rem )",
      },
      spacing: {
        34: "8.5rem",
        26: "6.5rem",
      },
      aspectRatio: {
        square: "1 / 1",
      },
    },
  },
  plugins: [
    // require('./tailwind/blueVariant'),
    require("@tailwindcss/aspect-ratio"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".label": {
          "@apply block text-left text-14 mb-2": "",
        },
        ".button-primary": {
          "@apply rounded-full border border-transparent bg-gray disabled:bg-gray-1-disabled text-white hover:bg-key-3":
            "",
        },
        ".button-secondary": {
          "@apply rounded-full border border-key-2 disabled:border-gray-1-disabled disabled:text-gray-1-disabled text-key-1":
            "",
        },
        ".text-title": {
          "@apply font-semibold text-[28px] leading-[33px]": "",
        },
        ".text-subTitle": {
          "@apply font-semibold text-[18px] leading-[21px] tracking-[-0.3px]":
            "",
        },
        ".text-normal1": {
          "@apply font-medium text-[16px] leading-[19px] tracking-[-0.3px]": "",
        },
        ".text-normal2": {
          "@apply font-medium text-[14px] leading-[130%] tracking-[-0.3px]": "",
        },
        ".text-filter": {
          "@apply font-medium text-[12px] leading-[14px] tracking-[-0.3px]": "",
        },
        ".text-tag": {
          "@apply text-[10px] leading-[12px] tracking-[-0.3px]": "",
        },
        ".text-disabled": {
          "@apply text-[12px] leading-[14px] tracking-[-0.3px]": "",
        },
        ".hide-scrollbar": {},
        ".center-absolute": {
          "@apply absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]":
            "",
        },
        ".center-absolute-x": {
          "@apply absolute left-[50%] -translate-x-[50%]": "",
        },
        ".center-absolute-y": {
          "@apply absolute top-[50%] -translate-y-[50%]": "",
        },
        ".center-fixed-x": {
          "@apply fixed left-[50%] -translate-x-[50%]": "",
        },
        ".center-fixed-y": {
          "@apply fixed top-[50%] -translate-y-[50%]": "",
        },
        ".gradient-cover": {
          "@apply before:absolute before:h-full before:w-full before:bg-gradient-to-b before:from-black/20 before:to-[#D9D9D9]/0":
            "",
        },
      });
    }),
  ],
};
