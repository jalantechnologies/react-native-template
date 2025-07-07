import { useTheme } from 'native-base';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { BadgeColor, BadgeSize, BadgeType } from '../../types';

export const useBadgeStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      borderRadius: theme.radii.full,
      alignSelf: 'flex-start',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[1],
    },
    label: {
      fontWeight: `${theme.fontWeights.medium}` as TextStyle['fontWeight'],
      letterSpacing: theme.letterSpacings.md,
    },
    enhancer: {
      marginHorizontal: theme.space[1],
    },
  });
};

export const useColorStyles = (type: BadgeType) => {
  const theme = useTheme();
  return {
    [BadgeColor.GRAY]: StyleSheet.create({
      solid: {
        backgroundColor: theme.colors.secondary['400'],
      },
      light: {
        backgroundColor: theme.colors.secondary['100'],
      },
      text: {
        color:
          type === BadgeType.TEXT || type === BadgeType.LIGHT
            ? theme.colors.secondary['500']
            : theme.colors.white,
      },
    }),
    [BadgeColor.PRIMARY]: StyleSheet.create({
      solid: {
        backgroundColor: theme.colors.primary['500'],
      },
      light: {
        backgroundColor: theme.colors.primary['50'],
      },
      text: {
        color:
          type === BadgeType.TEXT || type === BadgeType.LIGHT
            ? theme.colors.primary['500']
            : theme.colors.white,
      },
    }),
    [BadgeColor.ERROR]: StyleSheet.create({
      solid: {
        backgroundColor: theme.colors.danger['500'],
      },
      light: {
        backgroundColor: theme.colors.danger['50'],
      },
      text: {
        color:
          type === BadgeType.TEXT || type === BadgeType.LIGHT
            ? theme.colors.danger['500']
            : theme.colors.white,
      },
    }),
    [BadgeColor.WARNING]: StyleSheet.create({
      solid: {
        backgroundColor: theme.colors.warning['600'],
      },
      light: {
        backgroundColor: theme.colors.warning['100'],
      },
      text: {
        color:
          type === BadgeType.TEXT || type === BadgeType.LIGHT
            ? theme.colors.warning['600']
            : theme.colors.white,
      },
    }),
    [BadgeColor.SUCCESS]: StyleSheet.create({
      solid: {
        backgroundColor: theme.colors.success['500'],
      },
      light: {
        backgroundColor: theme.colors.success['50'],
      },
      text: {
        color:
          type === BadgeType.TEXT || type === BadgeType.LIGHT
            ? theme.colors.success['500']
            : theme.colors.white,
      },
    }),
    [BadgeColor.INFO]: StyleSheet.create({
      solid: {
        backgroundColor: theme.colors.info[500],
      },
      light: {
        backgroundColor: theme.colors.info[50],
      },
      text: {
        color:
          type === BadgeType.TEXT || type === BadgeType.LIGHT
            ? theme.colors.info['500']
            : theme.colors.white,
      },
    }),
    [BadgeColor.DARK]: StyleSheet.create({
      solid: {
        backgroundColor: theme.colors.secondary['900'],
      },
      light: {
        backgroundColor: theme.colors.secondary['500'],
      },
      text: {
        color: type === BadgeType.TEXT ? theme.colors.secondary['900'] : theme.colors.white,
      },
    }),
  } as Record<BadgeColor, { solid: ViewStyle; light: ViewStyle; text: TextStyle }>;
};

export const useSizeStyles = () => {
  const theme = useTheme();
  return {
    [BadgeSize.SMALL]: StyleSheet.create({
      base: {
        paddingVertical: theme.space[1],
        paddingHorizontal: theme.space[1],
      },
      text: {
        fontSize: theme.fontSizes.xs,
        lineHeight: Number(theme.lineHeights.xs),
      },
    }),
    [BadgeSize.MEDIUM]: StyleSheet.create({
      base: {
        paddingVertical: theme.space[1],
        paddingHorizontal: theme.space[2],
      },
      text: {
        fontSize: theme.fontSizes.sm,
        lineHeight: Number(theme.lineHeights.sm),
      },
    }),
    [BadgeSize.LARGE]: StyleSheet.create({
      base: {
        paddingVertical: theme.space[2],
        paddingHorizontal: theme.space[3],
      },
      text: {
        fontSize: theme.fontSizes.md,
        lineHeight: Number(theme.lineHeights.md),
      },
    }),
  } as Record<BadgeSize, { base: ViewStyle; text: TextStyle }>;
};
