import { useTheme } from 'native-base';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ButtonKind, ButtonSize } from '../../types';

export const useButtonStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: theme.radii.md,
      flexDirection: 'row',
      gap: theme.space['2'],
      justifyContent: 'center',
      minHeight: theme.sizes[10],
    },
    enhancer: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: theme.sizes[6],
    },
    horizontalStack: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space['1'],
    },
  });
};

export const useKindStyles = () => {
  const appTheme = useTheme();
  return {
    [ButtonKind.PRIMARY]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.primary['500'],
        borderRadius: appTheme.radii.md,
      },
      enabled: { opacity: 1 },
      disabled: { opacity: 0.5 },
      text: { color: appTheme.colors.lightText },
    }),
    [ButtonKind.SECONDARY]: StyleSheet.create({
      base: {
        borderRadius: appTheme.radii.md,
        borderColor: appTheme.colors.primary['500'],
        borderWidth: 1,
      },
      enabled: { opacity: 1 },
      disabled: { opacity: 0.5 },
      text: { color: appTheme.colors.primary['500'] },
    }),
    [ButtonKind.TERTIARY]: StyleSheet.create({
      base: {
        borderWidth: 0,
      },
      enabled: { opacity: 1 },
      disabled: { opacity: 0.5 },
      text: { color: appTheme.colors.primary['500'] },
    }),
    [ButtonKind.SUCCESS]: StyleSheet.create({
      base: { backgroundColor: appTheme.colors.success['500'], borderRadius: appTheme.radii.md },
      enabled: { opacity: 1 },
      disabled: { opacity: 0.5 },
      text: { color: appTheme.colors.lightText },
    }),
    [ButtonKind.DANGER]: StyleSheet.create({
      base: { backgroundColor: appTheme.colors.danger['700'], borderRadius: appTheme.radii.md },
      enabled: { opacity: 1 },
      disabled: { opacity: 0.5 },
      text: { color: appTheme.colors.lightText },
    }),
    [ButtonKind.WARNING]: StyleSheet.create({
      base: { backgroundColor: appTheme.colors.warning['600'], borderRadius: appTheme.radii.md },
      enabled: { opacity: 1 },
      disabled: { opacity: 0.5 },
      text: { color: appTheme.colors.lightText },
    }),
  } as Record<
    ButtonKind,
    { base: ViewStyle; disabled: ViewStyle; enabled: ViewStyle; text: TextStyle }
  >;
};

export const useSizeStyles = () => {
  const appTheme = useTheme();
  return {
    [ButtonSize.COMPACT]: StyleSheet.create({
      container: { padding: appTheme.space[1] },
      text: { fontSize: appTheme.fontSizes.sm },
    }),
    [ButtonSize.DEFAULT]: StyleSheet.create({
      container: { padding: appTheme.space[2] },
      text: { fontSize: appTheme.fontSizes.md },
    }),
    [ButtonSize.LARGE]: StyleSheet.create({
      container: { padding: appTheme.space[3] },
      text: { fontSize: appTheme.fontSizes.lg },
    }),
    [ButtonSize.MINI]: StyleSheet.create({
      container: { padding: appTheme.space['0.5'] },
      text: { fontSize: appTheme.fontSizes.xs },
    }),
  } as Record<ButtonSize, { container: ViewStyle; text: TextStyle }>;
};
