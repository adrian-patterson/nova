import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { getTheme, Theme } from '../styles/theme';

export const useTheme = (): { theme: Theme; isDark: boolean } => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const isDark = colorScheme === 'dark';
  const theme = getTheme(isDark);

  return { theme, isDark };
};
