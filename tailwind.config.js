module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
    './src/sections/**/*.html',
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        bg:        '#F7F9F2',
        text:      '#333333',
        primary:   '#406932',
        secondary: '#617A43',
        accent:    '#87A66F',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body:    ['Roboto', 'sans-serif'],
      },
      fontSize: {
        '2xl': ['3rem',    { lineHeight: '1.2' }],
        xl:   ['2.5rem',  { lineHeight: '1.3' }],
        lg:   ['2rem',    { lineHeight: '1.4' }],
        base: ['1rem',    { lineHeight: '1.6' }],
        sm:   ['0.875rem',{ lineHeight: '1.5' }],
      },
      letterSpacing: {
        wide: '0.05em',
      },
      screens: {
        'navshrink': '1064px',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
  safelist: [
    'masonry',
    'masonry-group',
    'masonry-item',
    'gallery-hidden',
    // add more if needed
  ],
}; 