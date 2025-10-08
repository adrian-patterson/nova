export interface Theme {
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#999999',
    border: '#cccccc',
    primary: '#000000',
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#000000',
    surface: '#111111',
    text: '#ffffff',
    textSecondary: '#666666',
    border: '#333333',
    primary: '#ffffff',
  },
};

export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};
