import { useTheme, ITheme } from 'native-base';
import { useMemo } from 'react';

/**
 * Custom React hook that resolves a theme-based color string into its corresponding
 * hex or RGB value, with support for shade lookup.
 *
 * @param color - A string identifier for the desired theme color. It may include
 *                an optional shade suffix separated by a dot (e.g., "primary.600").
 *
 * @returns The resolved color value from the theme (e.g., "#ff5722"), or
 *          the original `color` string if the key is not found in the theme.
 *
 * @remarks
 * - Uses the `useTheme` hook to access the current theme object.
 * - Uses `useMemo` for performance optimization, recalculating only when `color`
 *   changes.
 * - If the theme color is an object and a shade is provided, it will return the
 *   specific shade value. Otherwise, it returns the base color value.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const textColor = useThemeColor("text.700");
 *   return <Text style={{ color: textColor }}>Hello, world!</Text>;
 * };
 * ```
 */
export const useThemeColor = (color: string): string => {
  const theme = useTheme();

  return useMemo(() => {
    const [colorKey, shade = '500'] = color.split('.');
    const themeColor = theme.colors[colorKey as keyof ITheme['colors']];

    if (!themeColor) {
      return color;
    }

    return shade && typeof themeColor === 'object'
      ? (themeColor[shade as unknown as keyof typeof themeColor] as string)
      : (themeColor as string);
  }, [color]);
};
