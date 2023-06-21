const sharedConfig = require("@trms/tailwind-config/tailwind.config");

module.exports = {
  presets: [sharedConfig],
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    {
      pattern:
        /((bg|text|border)-(white|black|current|transparent|blue|cyan|gray|green|indigo|magenta|neutral|orange|purple|red|teal|yellow)?-(\d+))/,
      variants: ["active", "dark", "disabled", "empty", "focus", "hover"],
    },
  ],
};
// const tailwindConfig = require('../../packages/ui/tailwind.config')

// module.exports = {
//   ...tailwindConfig,
//   content: [
//     './app/**/*.{js,ts,jsx,tsx}',
//     './pages/**/*.{js,ts,jsx,tsx}',
//     '../../packages/ui/**/*.{js,ts,jsx,tsx}',
//   ],
//   plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
//   safelist: [
//     {
//       pattern:
//         /((bg|text|border)-(white|black|current|transparent|blue|cyan|gray|green|indigo|magenta|neutral|orange|purple|red|teal|yellow)?-(\d+))|((justify)-(items|content)?-(\w+))|(shadow?-\w+)/,
//       //     // ((rounded-\w+|rounded)?-(none|sm|md|lg|2xl|3xl|full))|((border)?-(0|2|4|8|solid|dashed|dotted|double|hidden|none))|((m|mx|my|ms|me|mt|mr|mb|ml|p|px|py|ps|pe|pt|pr|pb|pl)?-(auto|\d+))/,
//       variants: ['hover', 'dark', 'focus', 'active', 'disabled'],
//     },
//   ],
// }
