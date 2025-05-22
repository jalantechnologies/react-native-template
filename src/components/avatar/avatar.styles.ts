import { AvatarSize } from 'boilerplate-react-native/src/types';
import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';
import type { ViewStyle, ImageStyle, TextStyle } from 'react-native';

const sizeMap = {
  [AvatarSize.small]: 32,
  [AvatarSize.medium]: 48,
  [AvatarSize.large]: 64,
};

const textSizeMap = {
  [AvatarSize.small]: 14,
  [AvatarSize.medium]: 18,
  [AvatarSize.large]: 22,
};

export const useAvatarStyles = () => {
  const { colors, fontWeights, radii } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary['200'],
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    sizeSmall: {
      width: sizeMap.small,
      height: sizeMap.small,
    } as ViewStyle,
    sizeMedium: {
      width: sizeMap.medium,
      height: sizeMap.medium,
    } as ViewStyle,
    sizeLarge: {
      width: sizeMap.large,
      height: sizeMap.large,
    } as ViewStyle,
    circleSmall: {
      borderRadius: sizeMap.small / 2,
    } as ViewStyle,
    circleMedium: {
      borderRadius: sizeMap.medium / 2,
    } as ViewStyle,
    circleLarge: {
      borderRadius: sizeMap.large / 2,
    } as ViewStyle,
    square: {
      borderRadius: radii.lg,
    } as ViewStyle,
    image: {
      width: '100%',
      height: '100%',
    } as ImageStyle,
    initialsText: {
      color: colors.primary['500'],
      fontWeight: `${fontWeights.bold}`,
    } as TextStyle,
    textSmall: {
      fontSize: textSizeMap.small,
    } as TextStyle,
    textMedium: {
      fontSize: textSizeMap.medium,
    } as TextStyle,
    textLarge: {
      fontSize: textSizeMap.large,
    } as TextStyle,
    iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
  });
};
