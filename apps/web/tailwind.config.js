const tailwindConfig = require('@trms/config/tailwind.config')
const { theme } = require('@trms/theme')

module.exports = {
  ...tailwindConfig,
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme,
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
