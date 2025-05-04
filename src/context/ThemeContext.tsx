import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type ThemeMode = 'dark' | 'light';

interface ThemeColors {
  borderColor: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

interface ThemeContextType {
  theme: ThemeColors;
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const themes: Record<ThemeMode, ThemeColors> = {
  dark: {
    borderColor: 'border-zinc-800',
    bgColor: 'bg-zinc-900',
    textColor: 'text-zinc-100',
    accentColor: 'text-blue-500',
  },
  light: {
    borderColor: 'border-zinc-200',
    bgColor: 'bg-zinc-50',
    textColor: 'text-zinc-900',
    accentColor: 'text-blue-600',
  },
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  themeMode: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  
  // Toggle between dark and light mode
  const toggleTheme = useCallback(() => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);
  
  // Update document styles when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#18181b'; // zinc-900
      document.body.style.color = '#f4f4f5'; // zinc-100
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#fafafa'; // zinc-50
      document.body.style.color = '#18181b'; // zinc-900
    }
  }, [themeMode]);
  
  return (
    <ThemeContext.Provider value={{ theme: themes[themeMode], themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};