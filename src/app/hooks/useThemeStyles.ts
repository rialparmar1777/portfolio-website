'use client';

import { useTheme } from '../context/ThemeContext';
import { 
  getBackgroundColor, 
  getTextColor, 
  getBorderColor, 
  getGradient, 
  getShadow,
  theme
} from '../styles/theme';

type BackgroundType = 'default' | 'paper' | 'elevated' | 'glass' | 'glassHover' | 'glassActive';
type TextType = 'primary' | 'secondary' | 'disabled';
type BorderType = 'light' | 'medium' | 'strong';
type GradientType = 'primary' | 'secondary' | 'glass' | 'glassHover' | 'glassActive';
type ShadowType = 'sm' | 'md' | 'lg' | 'xl' | 'glass' | 'glassHover' | 'glassActive';

export const useThemeStyles = () => {
  const { theme: currentTheme } = useTheme();
  const colors = currentTheme === 'dark' ? theme.colors.dark : theme.colors.light;
  const shadows = currentTheme === 'dark' ? theme.shadows.dark : theme.shadows.light;

  const getGlassStyles = (isActive: boolean, isHovered: boolean) => ({
    background: isActive
      ? getBackgroundColor('glassActive', currentTheme)
      : isHovered
        ? getBackgroundColor('glassHover', currentTheme)
        : getBackgroundColor('glass', currentTheme),
    border: isActive
      ? `1px solid ${getBorderColor('light', currentTheme)}`
      : isHovered
        ? `1px solid ${getBorderColor('medium', currentTheme)}`
        : '1px solid transparent',
    boxShadow: isActive
      ? getShadow('glassActive', currentTheme)
      : isHovered
        ? getShadow('glassHover', currentTheme)
        : 'none',
  });
  
  return {
    getGlassStyles,
    getTextColor: (type: TextType) => getTextColor(type, currentTheme),
    getBackgroundColor: (type: BackgroundType) => getBackgroundColor(type, currentTheme),
    getBorderColor: (type: BorderType) => getBorderColor(type, currentTheme),
    getGradient: (type: GradientType) => getGradient(type, currentTheme),
    getShadow: (type: ShadowType) => getShadow(type, currentTheme),
    colors: {
      primary: colors.primary.main,
      secondary: colors.secondary.main,
      gradient: colors.gradient,
    },
    shadows,
    isDark: currentTheme === 'dark',
  };
};