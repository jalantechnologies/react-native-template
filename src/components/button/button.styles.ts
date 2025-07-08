import { ButtonKind, ButtonSize } from 'boilerplate-react-native/src/types/button';
import { useTheme } from 'native-base';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const useButtonStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    activityIndicator: {
      marginHorizontal: theme.space['1'],
    },
    button: {
      alignItems: 'center',
      borderRadius: theme.radii.md,
      flexDirection: 'row',
      gap: theme.space['2'],
      justifyContent: 'center',
      minHeight: 40,
    },
    compact: {
      padding: theme.space['2'],
    },
    danger: {
      backgroundColor: theme.colors.danger['700'],
      borderColor: theme.colors.danger['600'],
    },
    default: {
      padding: theme.space['3'],
    },
    enhancer: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 24,
    },
    horizontalStack: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space['1'],
    },
    large: {
      padding: theme.space['4'],
    },
    mini: {
      padding: theme.space['1'],
    },
    primary: {
      backgroundColor: theme.colors.primary['500'],
      borderColor: theme.colors.primary['500'],
    },
    secondary: {
      backgroundColor: theme.colors.secondary['500'],
      borderColor: theme.colors.secondary['500'],
    },
    tertiary: {
      backgroundColor: theme.colors.tertiary['500'],
      borderColor: theme.colors.tertiary['500'],
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
    [ButtonKind.DANGER]: StyleSheet.create({
      base: { backgroundColor: appTheme.colors.danger['700'], borderRadius: 8 },
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
