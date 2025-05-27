import { useTheme, ITheme } from 'native-base';
import { useMemo } from 'react';

export const useThemeColor = (color: string): string => {
  const theme = useTheme();

  return useMemo(() => {
    const [colorKey, shade] = color.split('.');
    const themeColor = theme.colors[colorKey as keyof ITheme['colors']];

    if (!themeColor) {
      return color;
    }

    return shade && typeof themeColor === 'object'
      ? (themeColor[shade as unknown as keyof typeof themeColor] as string)
      : (themeColor as string);
  }, [color]);
};
