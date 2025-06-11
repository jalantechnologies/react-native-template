import { useTheme } from 'native-base';
import { useMemo } from 'react';

import { ICOLORHUES } from '@/app-theme';

export type ThemeColorKey = keyof typeof ICOLORHUES;

export const useThemeColor = (color: `${ThemeColorKey}` | `${ThemeColorKey}.${string}`): string => {
  const theme = useTheme();

  return useMemo(() => {
    const [colorKey, shade = '200'] = color.split('.') as [ThemeColorKey, string];

    if (!Object.prototype.hasOwnProperty.call(theme.colors, colorKey)) {
      return color;
    }

    const themeColor = theme.colors[colorKey as keyof typeof theme.colors];

    if (typeof themeColor === 'string') {
      return themeColor;
    }

    return themeColor?.[shade as keyof typeof themeColor] ?? color;
  }, [color]);
};
