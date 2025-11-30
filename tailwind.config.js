// tailwind.config.js
module.exports = {
  purge: {
    content: [
      './src/pages/**/*.js',
      './src/pages/**/*.jsx',
      './src/components/**/*.js',
      './src/components/**/*.jsx',
    ],

    // These options are passed through directly to PurgeCSS
    options: {
      whitelist: [
        'text-orange-300', 'text-orange-500', 'bg-orange-100',
        'text-green-300', 'text-green-500', 'bg-green-100',
        'text-purple-300', 'text-purple-500', 'bg-purple-100',
      ]
    }
  },
  theme: {
    extend: {
      colors: {
        'indigo': {
          500: '#667eea',
          600: '#5a67d8'
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
