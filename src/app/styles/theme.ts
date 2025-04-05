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

type ThemeMode = {
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

type Theme = {
  colors: ThemeMode;
  shadows: ThemeShadows;
  transitions: Transitions;
  borderRadius: BorderRadius;
  spacing: Spacing;
  typography: Typography;
  zIndex: ZIndex;
};

// Theme Configuration
export const theme: Theme = {
  colors: {
    dark: {
      primary: {
        main: '#8B5CF6', // Purple
        light: '#A78BFA',
        dark: '#7C3AED',
        contrast: '#FFFFFF',
      },
      secondary: {
        main: '#EC4899', // Pink
        light: '#F472B6',
        dark: '#DB2777',
        contrast: '#FFFFFF',
      },
      background: {
        default: '#000000',
        paper: 'rgba(0, 0, 0, 0.8)',
        elevated: 'rgba(0, 0, 0, 0.9)',
        glass: 'rgba(0, 0, 0, 0.7)',
      },
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
      },
      border: {
        light: 'rgba(255, 255, 255, 0.1)',
        medium: 'rgba(255, 255, 255, 0.2)',
        strong: 'rgba(255, 255, 255, 0.3)',
      },
      gradient: {
        primary: 'linear-gradient(to right, #8B5CF6, #EC4899)',
        secondary: 'linear-gradient(to right, #EC4899, #8B5CF6)',
        glass: 'linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
        glassHover: 'linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
        glassActive: 'linear-gradient(to right, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
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
        default: '#F9FAFB',
        paper: 'rgba(255, 255, 255, 0.8)',
        elevated: 'rgba(255, 255, 255, 0.9)',
        glass: 'rgba(255, 255, 255, 0.7)',
      },
      text: {
        primary: '#111827',
        secondary: 'rgba(17, 24, 39, 0.7)',
        disabled: 'rgba(17, 24, 39, 0.5)',
      },
      border: {
        light: 'rgba(17, 24, 39, 0.1)',
        medium: 'rgba(17, 24, 39, 0.2)',
        strong: 'rgba(17, 24, 39, 0.3)',
      },
      gradient: {
        primary: 'linear-gradient(to right, #7C3AED, #DB2777)',
        secondary: 'linear-gradient(to right, #DB2777, #7C3AED)',
        glass: 'linear-gradient(to right, rgba(124, 58, 237, 0.1), rgba(219, 39, 119, 0.1))',
        glassHover: 'linear-gradient(to right, rgba(124, 58, 237, 0.2), rgba(219, 39, 119, 0.2))',
        glassActive: 'linear-gradient(to right, rgba(124, 58, 237, 0.3), rgba(219, 39, 119, 0.3))',
      },
    },
  },
  shadows: {
    dark: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      glass: '0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(236, 72, 153, 0.06)',
      glassHover: '0 4px 12px -1px rgba(139, 92, 246, 0.2), 0 2px 6px -1px rgba(236, 72, 153, 0.1)',
      glassActive: '0 4px 12px -1px rgba(139, 92, 246, 0.3), 0 2px 6px -1px rgba(236, 72, 153, 0.2)',
    },
    light: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      glass: '0 4px 6px -1px rgba(124, 58, 237, 0.1), 0 2px 4px -1px rgba(219, 39, 119, 0.06)',
      glassHover: '0 4px 12px -1px rgba(124, 58, 237, 0.2), 0 2px 6px -1px rgba(219, 39, 119, 0.1)',
      glassActive: '0 4px 12px -1px rgba(124, 58, 237, 0.3), 0 2px 6px -1px rgba(219, 39, 119, 0.2)',
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