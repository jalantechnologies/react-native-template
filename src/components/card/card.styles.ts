import { useTheme } from 'native-base';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const useCardStyles = () => {
  const { colors, space: spacing, radii: borderRadius, fontSizes, fontWeights } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        cardBase: {
          backgroundColor: colors.secondary['50'],
          borderRadius: borderRadius.lg,
          overflow: 'hidden',
          paddingHorizontal: spacing[5],
          paddingVertical: spacing[3],
          borderWidth: 1,
          borderColor: colors.secondary['200'],
        } as ViewStyle,
        filled: {
          shadowColor: colors.primary['900'],
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.18,
          shadowRadius: 12,
          elevation: 6,
        } as ViewStyle,
        outlined: {
          borderWidth: 1.5,
          borderColor: colors.primary['400'],
          backgroundColor: 'transparent',
        } as ViewStyle,
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: spacing[2],
        } as ViewStyle,
        avatar: {
          width: 54,
          height: 54,
          borderRadius: 27,
          marginRight: spacing[2],
          borderWidth: 2,
          borderColor: colors.primary['200'],
        } as ImageStyle,
        headerTextContainer: {
          flex: 1,
        } as ViewStyle,
        title: {
          fontSize: fontSizes.lg,
          fontWeight: `${fontWeights.bold}`,
          color: colors.primary['900'],
          letterSpacing: 0.5,
        } as TextStyle,
        subtitle: {
          fontSize: fontSizes.md,
          color: colors.secondary['600'],
          fontWeight: `${fontWeights.medium}`,
        } as TextStyle,
        content: {
          fontSize: fontSizes.sm,
          color: colors.secondary['800'],
          fontWeight: `${fontWeights.normal}`,
        } as TextStyle,
        actions: {
          paddingBottom: spacing[2],
          flexDirection: 'row',
          justifyContent: 'flex-end',
        } as ViewStyle,
        media: {
          width: '100%',
          resizeMode: 'cover',
          marginBottom: spacing[2],
          borderRadius: borderRadius.sm,
        } as ImageStyle,
      }),
    [colors, spacing, borderRadius, fontSizes, fontWeights],
  );
};
