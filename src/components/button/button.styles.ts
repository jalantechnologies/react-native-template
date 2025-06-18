import { useTheme } from 'native-base';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ButtonKind, ButtonSize } from '../../types/button';

export const useButtonStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: theme.radii.md,
      justifyContent: 'center',
      marginVertical: theme.space['1'],
      marginHorizontal: theme.space['1'],
      minHeight: theme.sizes[10],
      alignSelf: 'flex-start',
      minWidth: 'auto',
    },
    enhancer: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: theme.sizes[6],
    },
    horizontalStack: {
      flexDirection: 'row',
      gap: theme.space['2'],
    },
  });
};

export const useKindStyles = () => {
  const appTheme = useTheme();
  return {
    [ButtonKind.DANGER]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.danger['700'],
        borderColor: appTheme.colors.danger['600'],
        borderRadius: appTheme.radii.md,
        borderWidth: 1,
      },
      disabled: { opacity: 0.5 },
      enabled: { opacity: 1 },
      text: { color: appTheme.colors.lightText },
    }),
    [ButtonKind.PRIMARY]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.primary['500'],
        borderColor: appTheme.colors.primary['500'],
        borderRadius: appTheme.radii.md,
        borderWidth: parseInt(appTheme.borderWidths[1]),
      },
      disabled: { opacity: 0.5 },
      enabled: { opacity: 1 },
      text: { color: appTheme.colors.lightText },
    }),
    [ButtonKind.SECONDARY]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.secondary['500'],
        borderColor: appTheme.colors.secondary['500'],
        borderRadius: appTheme.radii.md,
        borderWidth: parseInt(appTheme.borderWidths[1]),
      },
      disabled: { opacity: 0.5 },
      enabled: { opacity: 1 },
      text: { color: appTheme.colors.lightText },
    }),
    [ButtonKind.SUCCESS]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.success['500'],
        borderColor: appTheme.colors.success['500'],
        borderRadius: appTheme.radii.md,
        borderWidth: parseInt(appTheme.borderWidths[1]),
      },
      disabled: { opacity: 0.5 },
      enabled: { opacity: 1 },
      text: { color: appTheme.colors.lightText },
    }),
    [ButtonKind.TERTIARY]: StyleSheet.create({
      base: {
        borderWidth: 0,
        paddingHorizontal: appTheme.space[2], // optional for spacing
        paddingVertical: appTheme.space[1],
      },
      disabled: { opacity: 0.5 },
      enabled: { opacity: 1 },
      text: { color: appTheme.colors.primary['500'] },
    }),
    [ButtonKind.WARNING]: StyleSheet.create({
      base: {
        backgroundColor: appTheme.colors.warning['500'],
        borderColor: appTheme.colors.warning['500'],
        borderRadius: appTheme.radii.md,
        borderWidth: parseInt(appTheme.borderWidths[1]),
      },
      disabled: { opacity: 0.5 },
      enabled: { opacity: 1 },
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
