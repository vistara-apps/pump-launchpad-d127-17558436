
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220 70% 50%)',
        accent: 'hsl(45 90% 50%)',
        bg: 'hsl(210 20% 15%)',
        surface: 'hsl(210 20% 20%)',
        textPrimary: 'hsl(0 0% 95%)',
        textSecondary: 'hsl(0 0% 70%)',
        border: 'hsl(210 20% 30%)',
        success: 'hsl(120 60% 50%)',
        warning: 'hsl(45 90% 50%)',
        error: 'hsl(0 70% 50%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(0, 0%, 0%, 0.2)',
        modal: '0 8px 32px hsla(0, 0%, 0%, 0.3)',
        glow: '0 0 20px hsla(220, 70%, 50%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px hsla(220, 70%, 50%, 0.3)' },
          '50%': { boxShadow: '0 0 30px hsla(220, 70%, 50%, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
