'use client';

import { useTheme } from '../context/ThemeContext';
import { theme } from '../styles/theme';
import { useMemo } from 'react';

export const useThemeStyles = () => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  const colors = useMemo(() => {
    try {
      return isDark ? theme.colors.dark : theme.colors.light;
    } catch (error) {
      console.error('Error getting theme colors:', error);
      return theme.colors.dark; // Fallback to dark theme
    }
  }, [isDark]);
  
  const shadows = useMemo(() => {
    try {
      return isDark ? theme.shadows.dark : theme.shadows.light;
    } catch (error) {
      console.error('Error getting theme shadows:', error);
      return theme.shadows.dark; // Fallback to dark theme
    }
  }, [isDark]);
  
  const getGlassStyles = (isActive = false, isHovered = false) => {
    try {
      if (isActive) {
        return {
          background: colors.gradient.glassActive,
          border: `1px solid ${colors.border.strong}`,
          boxShadow: shadows.glassActive,
        };
      }
      
      if (isHovered) {
        return {
          background: colors.gradient.glassHover,
          border: `1px solid ${colors.border.medium}`,
          boxShadow: shadows.glassHover,
        };
      }
      
      return {
        background: colors.gradient.glass,
        border: `1px solid ${colors.border.light}`,
        boxShadow: shadows.glass,
      };
    } catch (error) {
      console.error('Error getting glass styles:', error);
      return {
        background: colors.gradient.glass,
        border: `1px solid ${colors.border.light}`,
        boxShadow: shadows.glass,
      };
    }
  };
  
  const getTextColor = (variant: 'primary' | 'secondary' | 'disabled' = 'primary') => {
    try {
      return colors.text[variant];
    } catch (error) {
      console.error('Error getting text color:', error);
      return colors.text.primary; // Fallback to primary text color
    }
  };
  
  const getBackgroundColor = (variant: 'default' | 'paper' | 'elevated' | 'glass' = 'default') => {
    try {
      return colors.background[variant];
    } catch (error) {
      console.error('Error getting background color:', error);
      return colors.background.default; // Fallback to default background
    }
  };
  
  const getBorderColor = (variant: 'light' | 'medium' | 'strong' = 'light') => {
    try {
      return colors.border[variant];
    } catch (error) {
      console.error('Error getting border color:', error);
      return colors.border.light; // Fallback to light border
    }
  };
  
  const getGradient = (variant: 'primary' | 'secondary' | 'glass' | 'glassHover' | 'glassActive' = 'primary') => {
    try {
      return colors.gradient[variant];
    } catch (error) {
      console.error('Error getting gradient:', error);
      return colors.gradient.primary; // Fallback to primary gradient
    }
  };
  
  return {
    isDark,
    colors,
    shadows,
    getGlassStyles,
    getTextColor,
    getBackgroundColor,
    getBorderColor,
    getGradient,
  };
};