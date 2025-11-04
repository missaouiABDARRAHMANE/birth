module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'romantic-pink': '#FFB6C1',
        'soft-lavender': '#E6E6FA',
        'warm-peach': '#FFDAB9',
        'rose-gold': '#B76E79',
        'deep-romance': '#8B008B',
        'midnight-rose': '#4B0082'
      },
      fontFamily: {
        'elegant': ['Playfair Display', 'serif'],
        'romantic': ['Dancing Script', 'cursive']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
        'shine': 'shine 3s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        twinkle: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' }
        },
        shine: {
          '0%': { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #FFB6C1' },
          '100%': { textShadow: '0 0 10px #fff, 0 0 20px #FFB6C1, 0 0 30px #FFB6C1' }
        }
      }
    },
  },
  plugins: [],
}