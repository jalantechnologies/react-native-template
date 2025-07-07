import { useTheme } from 'native-base';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ButtonKind, ButtonSize, ButtonColor } from '../../types';

export const useButtonStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    button: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space['2'],
      justifyContent: 'center',
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
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      fontSize: theme.fontSizes.sm,
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: theme.letterSpacings.md
    },
  });
};

export const useColorStyles = (isPressed: boolean) => {
  const theme = useTheme();
  return {
    [ButtonColor.DANGER]: StyleSheet.create({
      base: {
        backgroundColor: isPressed ? theme.colors.danger[400] : theme.colors.danger[500],
        borderColor: theme.colors.danger[500],
      },
      text: { color: isPressed ? theme.colors.danger[400] : theme.colors.danger[500] },
    }),
    [ButtonColor.INFO]: StyleSheet.create({
      base: {
        backgroundColor: isPressed ? theme.colors.info[400] : theme.colors.info[500],
        borderColor: theme.colors.info[500],
      },
      text: { color: isPressed ? theme.colors.info[400] : theme.colors.info[500] },
    }),
    [ButtonColor.PRIMARY]: StyleSheet.create({
      base: {
        backgroundColor: theme.colors.primary[500],
        borderColor: theme.colors.primary[500],
      },
      text: { color: isPressed ? theme.colors.primary[400] : theme.colors.primary[500] },
    }),
    [ButtonColor.SECONDARY]: StyleSheet.create({
      base: {
        backgroundColor: isPressed ? theme.colors.secondary[400] : theme.colors.secondary[500],
        borderColor: theme.colors.secondary[500],
      },
      text: { color: isPressed ? theme.colors.secondary[400] : theme.colors.secondary[500] },
    }),
    [ButtonColor.SUCCESS]: StyleSheet.create({
      base: {
        backgroundColor: isPressed ? theme.colors.success[400] : theme.colors.success[500],
        borderColor: theme.colors.success[500],
      },
      text: { color: isPressed ? theme.colors.success[400] : theme.colors.success[500] },
    }),
    [ButtonColor.WARNING]: StyleSheet.create({
      base: {
        backgroundColor: isPressed ? theme.colors.warning[400] : theme.colors.warning[500],
        borderColor: theme.colors.warning[500],
      },
      text: { color: isPressed ? theme.colors.warning[400] : theme.colors.warning[500] },
    }),
  } as Record<ButtonColor, { base: ViewStyle; text: TextStyle }>;
};

export const useKindStyles = () => {
  const appTheme = useTheme();
  return {
    [ButtonKind.CONTAINED]: StyleSheet.create({
      base: {
        ...appTheme.shadows[2],
        borderRadius: appTheme.radii.sm,
      },
      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
      text: { color: appTheme.colors.white },
    }),
    [ButtonKind.DASHED]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.white,
        borderRadius: appTheme.radii.sm,
        borderWidth: parseInt(appTheme.borderWidths['1'], 10),
        borderStyle: 'dashed',
      },

      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
    }),
    [ButtonKind.OUTLINED]: StyleSheet.create({
      base: {
        ...appTheme.shadows[1],
        borderRadius: appTheme.radii.sm,
        backgroundColor: appTheme.colors.white,
        borderWidth: parseInt(appTheme.borderWidths['1'], 10),
      },
      disabled: {
        backgroundColor: appTheme.colors.secondary[100],
        borderColor: appTheme.colors.secondary[300],
        color: appTheme.colors.secondary[300],
      },
    }),
    [ButtonKind.LINK]: StyleSheet.create({
      base: {
        borderWidth: 0,
        borderRadius: appTheme.radii.xs,
        backgroundColor: 'transparent',
      },
      disabled: {
        color: appTheme.colors.secondary['300'],
      },
    }),
  } as Record<ButtonKind, { base: ViewStyle; disabled: ViewStyle; text?: TextStyle }>;
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
