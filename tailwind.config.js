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
      boxShadow: {
        navglow: '0 2px 8px #b7eac7, 0 1px 0 #fff',
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
    'gallery-header',
    'timeline-year',
    'timeline-year.active',
    'timeline-year:focus',
    'timeline-year:hover',
    'timeline-years',
    'shadow-navglow',
    'hover:shadow-navglow',
    // add more if needed
  ],
}; 