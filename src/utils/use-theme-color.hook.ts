import { useMemo } from 'react';
import { useTheme } from 'react-native-paper';

/**
 * Custom React hook that resolves a theme-based color string into its corresponding
 * hex or RGB value, with support for shade lookup.
 */
export const useThemeColor = (color: string): string => {
  const theme = useTheme() as any;

  return useMemo(() => {
    const [colorKey, shade = '500'] = color.split('.');
    
    // Check in customColors (ICOLORHUES) first
    const customColor = theme.customColors?.[colorKey];
    if (customColor) {
      return customColor[shade] || customColor['500'] || color;
    }

    // Check in standard Paper colors
    const themeColor = theme.colors?.[colorKey];
    if (themeColor) {
      return themeColor;
    }

    return color;
  }, [color, theme]);
};
