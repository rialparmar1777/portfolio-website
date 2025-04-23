export const theme = {
  dark: {
    background: {
      primary: 'linear-gradient(to right, rgba(12, 10, 9, 0.95), rgba(24, 24, 27, 0.95))',
      secondary: 'linear-gradient(135deg, rgba(12, 10, 9, 0.4), rgba(24, 24, 27, 0.4))',
      tertiary: 'rgba(12, 10, 9, 0.8)',
      overlay: 'rgba(12, 10, 9, 0.4)',
      glass: 'rgba(12, 10, 9, 0.2)',
      card: 'linear-gradient(135deg, rgba(12, 10, 9, 0.4), rgba(24, 24, 27, 0.4))',
      input: 'rgba(12, 10, 9, 0.3)',
      button: 'linear-gradient(135deg, rgba(12, 10, 9, 0.4), rgba(24, 24, 27, 0.4))',
      hover: 'rgba(24, 24, 27, 0.2)',
      active: 'rgba(236, 72, 153, 0.2)',
      border: 'rgba(236, 72, 153, 0.2)',
      shadow: 'rgba(12, 10, 9, 0.2)'
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
      accent: 'rgba(236, 72, 153, 1)',
      muted: 'rgba(255, 255, 255, 0.4)',
      error: 'rgba(239, 68, 68, 1)',
      success: 'rgba(34, 197, 94, 1)',
      warning: 'rgba(234, 179, 8, 1)',
      info: 'rgba(56, 189, 248, 1)'
    },
    accent: {
      primary: 'rgba(236, 72, 153, 1)',
      secondary: 'rgba(244, 114, 182, 1)',
      tertiary: 'rgba(219, 39, 119, 1)',
      hover: 'rgba(236, 72, 153, 0.8)',
      active: 'rgba(236, 72, 153, 0.6)',
      border: 'rgba(236, 72, 153, 0.2)',
      shadow: 'rgba(236, 72, 153, 0.3)'
    },
    gradient: {
      primary: 'linear-gradient(135deg, rgba(236, 72, 153, 0.5), rgba(244, 114, 182, 0.3))',
      secondary: 'linear-gradient(135deg, rgba(12, 10, 9, 0.4), rgba(24, 24, 27, 0.4))',
      accent: 'linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(244, 114, 182, 0.6))',
      hover: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(244, 114, 182, 0.2))',
      active: 'linear-gradient(135deg, rgba(236, 72, 153, 0.4), rgba(244, 114, 182, 0.3))'
    },
    shadow: {
      sm: '0 1px 2px rgba(12, 10, 9, 0.05)',
      md: '0 4px 6px rgba(12, 10, 9, 0.1)',
      lg: '0 10px 15px rgba(12, 10, 9, 0.1)',
      xl: '0 20px 25px rgba(12, 10, 9, 0.15)',
      '2xl': '0 25px 50px rgba(12, 10, 9, 0.25)',
      inner: 'inset 0 2px 4px rgba(12, 10, 9, 0.05)',
      none: 'none'
    },
    border: {
      primary: '1px solid rgba(236, 72, 153, 0.2)',
      secondary: '1px solid rgba(244, 114, 182, 0.2)',
      accent: '1px solid rgba(236, 72, 153, 0.3)',
      hover: '1px solid rgba(236, 72, 153, 0.4)',
      active: '1px solid rgba(236, 72, 153, 0.5)'
    }
  }
} as const;

export type Theme = typeof theme;
export type ThemeMode = keyof Theme;
export type ThemeSection = keyof Theme['dark'];
export type ThemeValue = Theme['dark'][ThemeSection][keyof Theme['dark'][ThemeSection]]; 