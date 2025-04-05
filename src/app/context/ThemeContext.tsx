'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme
  useEffect(() => {
    try {
      // Check if user has a theme preference in localStorage
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (savedTheme) {
        setTheme(savedTheme);
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        setIsDarkMode(prefersDark);
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing theme:', error);
      // Fallback to dark theme
      setTheme('dark');
      setIsDarkMode(true);
      setIsInitialized(true);
    }
  }, []);

  // Update theme
  useEffect(() => {
    if (!isInitialized) return;

    try {
      // Update document class when theme changes
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      
      // Save theme preference
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      
      // Update isDarkMode state
      setIsDarkMode(theme === 'dark');

      // Update meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = theme === 'dark' ? '#000000' : '#ffffff';
        document.head.appendChild(meta);
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    try {
      setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};