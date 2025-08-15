// Design System Type Definitions

export interface ColorPalette {
  light: string;
  onLight: string;
  dark: string;
  onDark: string;
}

export interface DesignTokens {
  colors: {
    primary: ColorPalette;
    secondary: ColorPalette;
    tertiary: ColorPalette;
    error: ColorPalette;
  };
  typography: {
    fontFamily: {
      body: string;
      display: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

export interface ThemeConfig {
  name: string;
  tokens: DesignTokens;
  isDark: boolean;
}

export interface TailwindConfig {
  colors: Record<string, string>;
  fontFamily: Record<string, string[]>;
  extend?: Record<string, any>;
}
