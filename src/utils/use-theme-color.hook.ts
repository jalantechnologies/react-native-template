import { useTheme, ITheme } from 'native-base';
import { useMemo } from 'react';

import { ICOLORHUES } from '@/app-theme';
export type ThemeColorKey = keyof typeof ICOLORHUES;

/**
 * Custom React hook that resolves a theme-based color string into its corresponding
 * hex or RGB value, with support for shade lookup.
 *
 * @param color - A string identifier like "primary.600" or just "primary"
 *                (defaults to shade 200 if omitted).
 *
 * @returns Resolved color value from theme or fallback to original string.
 */
export const useThemeColor = (color: `${ThemeColorKey}` | `${ThemeColorKey}.${string}`): string => {
  const theme = useTheme();

  return useMemo(() => {
    const [colorKey, shade = '200'] = color.split('.') as [ThemeColorKey, string];
    const themeColor = theme.colors[colorKey];

    if (!themeColor) {
      return color;
    }

    return typeof themeColor === 'object'
      ? themeColor[shade as keyof typeof themeColor] ?? color
      : (themeColor as string);
  }, [color]);
};
