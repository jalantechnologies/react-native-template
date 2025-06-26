import { useTheme } from 'native-base';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ButtonKind, ButtonSize } from '../../types';

export const useButtonStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    button: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space['2'],
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 0,
      elevation: 1,
      borderWidth: parseInt(theme.borderWidths['1'], 10),
    },
    enhancer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizontalStack: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space['2'],
    },
    text: {
      fontFamily: 'Public Sans',
      fontWeight: '400',
      lineHeight: Number(theme.lineHeights.sm),
    },
  });
};

export const useKindStyles = (isPressed: boolean, isActive: boolean) => {
  const appTheme = useTheme();
  return {
    [ButtonKind.PRIMARY]: StyleSheet.create({
      base: {
        backgroundColor: isPressed
          ? appTheme.colors.primary['400']
          : isActive
          ? appTheme.colors.primary['700']
          : appTheme.colors.primary['500'],
        borderColor: isPressed
          ? appTheme.colors.primary['400']
          : isActive
          ? appTheme.colors.primary['700']
          : appTheme.colors.primary['500'],
        borderRadius: appTheme.radii.sm,
        shadowOpacity: 0.043,
      },
      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
      text: { color: appTheme.colors.white },
    }),
    [ButtonKind.SECONDARY]: StyleSheet.create({
      base: {
        borderRadius: appTheme.radii.sm,
        borderColor: isPressed
          ? appTheme.colors.primary['400']
          : isActive
          ? appTheme.colors.primary['700']
          : appTheme.colors.secondary['300'],
        backgroundColor: appTheme.colors.white,
        borderWidth: 1,
        shadowOpacity: 0.016,
      },
      disabled: {
        borderColor: appTheme.colors.secondary['300'],
        backgroundColor: appTheme.colors.white,
        color: appTheme.colors.secondary['300'],
      },
      text: {
        color: isPressed
          ? appTheme.colors.primary['400']
          : isActive
          ? appTheme.colors.primary['700']
          : appTheme.colors.secondary['700'],
      },
    }),
    [ButtonKind.TERTIARY]: StyleSheet.create({
      base: {
        borderWidth: 0,
        borderRadius: appTheme.radii.xs,
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      disabled: {
        color: appTheme.colors.secondary['300'],
      },
      text: { color: isPressed ? appTheme.colors.primary['400'] : appTheme.colors.primary['500'] },
    }),
    [ButtonKind.SUCCESS]: StyleSheet.create({
      base: {
        backgroundColor: isPressed
          ? appTheme.colors.success['400']
          : appTheme.colors.success['500'],
        borderColor: appTheme.colors.success['500'],
        borderRadius: appTheme.radii.sm,
        borderWidth: parseInt(appTheme.borderWidths['1'], 10),
      },

      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
      text: { color: appTheme.colors.lightText },
    }),
    [ButtonKind.DANGER]: StyleSheet.create({
      base: {
        backgroundColor: isPressed ? appTheme.colors.danger['300'] : appTheme.colors.danger['500'],
        borderColor: appTheme.colors.danger['500'],
        borderRadius: appTheme.radii.sm,
        borderWidth: parseInt(appTheme.borderWidths['1'], 10),
      },

      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
      text: { color: appTheme.colors.white },
    }),
    [ButtonKind.DARK]: StyleSheet.create({
      base: {
        backgroundColor: isPressed
          ? appTheme.colors.secondary['300']
          : appTheme.colors.secondary['500'],
        borderColor: appTheme.colors.secondary['500'],
        borderWidth: parseInt(appTheme.borderWidths['1'], 10),
        borderRadius: appTheme.radii.sm,
      },
      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
      text: { color: appTheme.colors.white },
    }),
    [ButtonKind.WARNING]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.warning['500'],
        borderColor: appTheme.colors.warning['500'],
        borderWidth: parseInt(appTheme.borderWidths['1'], 10),
        borderRadius: appTheme.radii.sm,
      },

      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
      text: { color: appTheme.colors.secondary['900'] },
    }),
    [ButtonKind.DASHED]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.white,
        borderRadius: appTheme.radii.sm,
        borderColor: isPressed ? appTheme.colors.primary['500'] : appTheme.colors.secondary['300'],
        borderWidth: parseInt(appTheme.borderWidths['1'], 10),
        borderStyle: 'dashed',
      },

      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
      text: {
        color: isPressed ? appTheme.colors.primary['500'] : appTheme.colors.secondary['800'],
      },
    }),
    [ButtonKind.INFO]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.info['500'],
        borderRadius: appTheme.radii.md,
        borderColor: appTheme.colors.info['500'],
        borderWidth: parseInt(appTheme.borderWidths['1'], 10),
      },

      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
      text: { color: appTheme.colors.secondary['900'] },
    }),
  } as Record<ButtonKind, { base: ViewStyle; disabled: ViewStyle; text: TextStyle }>;
};

export const useSizeStyles = () => {
  const appTheme = useTheme();
  return {
    [ButtonSize.COMPACT]: StyleSheet.create({
      container: {
        paddingVertical: appTheme.space[1],
        paddingHorizontal: appTheme.space[2],
      },
      text: { fontSize: appTheme.fontSizes.sm },
    }),
    [ButtonSize.DEFAULT]: StyleSheet.create({
      container: {
        paddingHorizontal: appTheme.space[4],
        paddingVertical: appTheme.space[2],
      },
      text: { fontSize: appTheme.fontSizes.md },
    }),
    [ButtonSize.LARGE]: StyleSheet.create({
      container: {
        paddingVertical: appTheme.space[2],
        paddingHorizontal: appTheme.space[4],
      },
      text: { fontSize: appTheme.fontSizes.lg },
    }),
    [ButtonSize.MINI]: StyleSheet.create({
      container: {
        paddingVertical: appTheme.space[1],
        paddingHorizontal: appTheme.space[2],
      },
      text: { fontSize: appTheme.fontSizes.xs },
    }),
  } as Record<ButtonSize, { container: ViewStyle; text: TextStyle }>;
};
