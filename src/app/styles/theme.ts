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
        default: 'rgba(15, 23, 42, 0.95)', // Slate-900 with better opacity
        paper: 'rgba(30, 41, 59, 0.98)', // Slate-800 with high opacity
        elevated: 'rgba(51, 65, 85, 0.99)', // Slate-700 with very high opacity
        glass: 'rgba(15, 23, 42, 0.8)', // Slate-900 with glass effect
        glassHover: 'rgba(30, 41, 59, 0.85)', // Slate-800 with hover effect
        glassActive: 'rgba(51, 65, 85, 0.9)', // Slate-700 with active effect
      },
      text: {
        primary: 'rgba(248, 250, 252, 0.95)', // Slate-50 with high opacity
        secondary: 'rgba(203, 213, 225, 0.8)', // Slate-300 with good opacity
        disabled: 'rgba(148, 163, 184, 0.5)', // Slate-400 with medium opacity
      },
      border: {
        light: 'rgba(148, 163, 184, 0.2)', // Slate-400 with subtle opacity
        medium: 'rgba(203, 213, 225, 0.3)', // Slate-300 with medium opacity
        strong: 'rgba(248, 250, 252, 0.4)', // Slate-50 with stronger opacity
      },
      gradient: {
        primary: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25))',
        secondary: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25))',
        glass: 'linear-gradient(45deg, rgba(248, 250, 252, 0.08), rgba(203, 213, 225, 0.02))',
        glassHover: 'linear-gradient(45deg, rgba(248, 250, 252, 0.12), rgba(203, 213, 225, 0.06))',
        glassActive: 'linear-gradient(45deg, rgba(248, 250, 252, 0.16), rgba(203, 213, 225, 0.1))',
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
        default: 'rgba(255, 255, 255, 0.95)',
        paper: 'rgba(248, 250, 252, 0.98)', // Slate-50 with high opacity
        elevated: 'rgba(241, 245, 249, 0.99)', // Slate-100 with very high opacity
        glass: 'rgba(255, 255, 255, 0.8)',
        glassHover: 'rgba(248, 250, 252, 0.85)', // Slate-50 with hover effect
        glassActive: 'rgba(241, 245, 249, 0.9)', // Slate-100 with active effect
      },
      text: {
        primary: 'rgba(15, 23, 42, 0.95)', // Slate-900 with high opacity
        secondary: 'rgba(51, 65, 85, 0.8)', // Slate-700 with good opacity
        disabled: 'rgba(100, 116, 139, 0.5)', // Slate-500 with medium opacity
      },
      border: {
        light: 'rgba(148, 163, 184, 0.2)', // Slate-400 with subtle opacity
        medium: 'rgba(100, 116, 139, 0.3)', // Slate-500 with medium opacity
        strong: 'rgba(51, 65, 85, 0.4)', // Slate-700 with stronger opacity
      },
      gradient: {
        primary: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))',
        secondary: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
        glass: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15), rgba(248, 250, 252, 0.05))',
        glassHover: 'linear-gradient(45deg, rgba(255, 255, 255, 0.25), rgba(248, 250, 252, 0.1))',
        glassActive: 'linear-gradient(45deg, rgba(255, 255, 255, 0.35), rgba(248, 250, 252, 0.15))',
      },
    },
  },
  shadows: {
    dark: {
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      glass: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      glassHover: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      glassActive: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    light: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      glass: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      glassHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      glassActive: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)',
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