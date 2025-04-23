import { Theme as ThemeMode } from '../context/ThemeContext';

// Theme Types
type ColorShade = {
  main: string;
  light: string;
  dark: string;
  contrast: string;
};

type BackgroundColors = {
  default: string;
  paper: string;
  elevated: string;
  glass: string;
  glassHover: string;
  glassActive: string;
};

type TextColors = {
  primary: string;
  secondary: string;
  disabled: string;
};

type BorderColors = {
  light: string;
  medium: string;
  strong: string;
};

type GradientColors = {
  primary: string;
  secondary: string;
  glass: string;
  glassHover: string;
  glassActive: string;
};

type ThemeColors = {
  primary: ColorShade;
  secondary: ColorShade;
  background: BackgroundColors;
  text: TextColors;
  border: BorderColors;
  gradient: GradientColors;
};

type ThemeColorMode = {
  dark: ThemeColors;
  light: ThemeColors;
};

type Shadows = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  glass: string;
  glassHover: string;
  glassActive: string;
};

type ThemeShadows = {
  dark: Shadows;
  light: Shadows;
};

type Transitions = {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  timing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
};

type BorderRadius = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
};

type Spacing = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
};

type Typography = {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
};

type ZIndex = {
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  modal: number;
  popover: number;
  tooltip: number;
};

type ThemeConfig = {
  colors: ThemeColorMode;
  shadows: ThemeShadows;
  transitions: Transitions;
  borderRadius: BorderRadius;
  spacing: Spacing;
  typography: Typography;
  zIndex: ZIndex;
};

// Theme Configuration
export const theme: ThemeConfig = {
  colors: {
    dark: {
      primary: {
        main: '#A78BFA', // Lighter purple for better visibility
        light: '#C4B5FD',
        dark: '#8B5CF6',
        contrast: '#FFFFFF',
      },
      secondary: {
        main: '#F472B6', // Lighter pink for better visibility
        light: '#F9A8D4',
        dark: '#EC4899',
        contrast: '#FFFFFF',
      },
      background: {
        default: 'rgba(17, 24, 39, 0.9)',
        paper: 'rgba(17, 24, 39, 0.95)',
        elevated: 'rgba(17, 24, 39, 0.98)',
        glass: 'rgba(17, 24, 39, 0.7)',
        glassHover: 'rgba(17, 24, 39, 0.8)',
        glassActive: 'rgba(17, 24, 39, 0.9)',
      },
      text: {
        primary: 'rgba(255, 255, 255, 0.87)',
        secondary: 'rgba(255, 255, 255, 0.6)',
        disabled: 'rgba(255, 255, 255, 0.38)',
      },
      border: {
        light: 'rgba(255, 255, 255, 0.12)',
        medium: 'rgba(255, 255, 255, 0.24)',
        strong: 'rgba(255, 255, 255, 0.36)',
      },
      gradient: {
        primary: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))',
        secondary: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
        glass: 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
        glassHover: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        glassActive: 'linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.1))',
      },
    },
    light: {
      primary: {
        main: '#7C3AED', // Purple
        light: '#8B5CF6',
        dark: '#6D28D9',
        contrast: '#FFFFFF',
      },
      secondary: {
        main: '#DB2777', // Pink
        light: '#EC4899',
        dark: '#BE185D',
        contrast: '#FFFFFF',
      },
      background: {
        default: 'rgba(255, 255, 255, 0.9)',
        paper: 'rgba(255, 255, 255, 0.95)',
        elevated: 'rgba(255, 255, 255, 0.98)',
        glass: 'rgba(255, 255, 255, 0.7)',
        glassHover: 'rgba(255, 255, 255, 0.8)',
        glassActive: 'rgba(255, 255, 255, 0.9)',
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      border: {
        light: 'rgba(0, 0, 0, 0.12)',
        medium: 'rgba(0, 0, 0, 0.24)',
        strong: 'rgba(0, 0, 0, 0.36)',
      },
      gradient: {
        primary: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))',
        secondary: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
        glass: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
        glassHover: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
        glassActive: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2))',
      },
    },
  },
  shadows: {
    dark: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      glass: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      glassHover: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
      glassActive: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    },
    light: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      glass: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      glassHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      glassActive: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

export const getBackgroundColor = (type: keyof BackgroundColors, currentTheme: ThemeMode) => {
  const colors = currentTheme === 'dark' ? theme.colors.dark : theme.colors.light;
  return colors.background[type] || colors.background.default;
};

export const getTextColor = (type: keyof TextColors, currentTheme: ThemeMode) => {
  const colors = currentTheme === 'dark' ? theme.colors.dark : theme.colors.light;
  return colors.text[type] || colors.text.primary;
};

export const getBorderColor = (type: keyof BorderColors, currentTheme: ThemeMode) => {
  const colors = currentTheme === 'dark' ? theme.colors.dark : theme.colors.light;
  return colors.border[type] || colors.border.light;
};

export const getGradient = (type: keyof GradientColors, currentTheme: ThemeMode) => {
  const colors = currentTheme === 'dark' ? theme.colors.dark : theme.colors.light;
  return colors.gradient[type] || colors.gradient.primary;
};

export const getShadow = (type: keyof Shadows, currentTheme: ThemeMode) => {
  const shadows = currentTheme === 'dark' ? theme.shadows.dark : theme.shadows.light;
  return shadows[type] || shadows.glass;
}; 