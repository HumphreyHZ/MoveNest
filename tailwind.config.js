/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        health: {
          bg: '#f2f2f7',
          soft: '#eeeeF3',
          card: '#ffffff',
          ink: '#000000',
          muted: '#8e8e93',
          chevron: '#c7c7cc',
          orange: '#ff5a1f',
          blue: '#3478f6',
          purple: '#bf43d8',
        },
        nest: {
          ivory: '#F7F1E8',
          oat: '#E9DDCC',
          cloud: '#FEFBF6',
          mist: '#EEF2EA',
          sage: '#9BAF9D',
          sageDeep: '#4D6A57',
          coral: '#D98773',
          ink: '#27312B',
          smoke: '#6F776E',
        },
      },
      boxShadow: {
        phone: '0 28px 90px rgba(22, 22, 28, 0.18)',
        card: '0 12px 34px rgba(30, 30, 35, 0.05)',
        circle: '0 16px 34px rgba(20, 20, 25, 0.12)',
        soft: '0 18px 45px rgba(77, 106, 87, 0.13)',
        button: '0 10px 24px rgba(77, 106, 87, 0.22)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        rise: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        breathe: 'breathe 4.8s ease-in-out infinite',
        rise: 'rise 420ms ease-out both',
      },
    },
  },
  plugins: [],
};
