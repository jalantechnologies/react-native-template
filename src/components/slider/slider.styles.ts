import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const SliderStyles = () => {
    const theme = useTheme();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.space[5],
    },
    track: {
      width: theme.sizes['48'],
      height: theme.sizes['2'],
      borderRadius: theme.radii.full,
      justifyContent: 'center',
    },
    horizontalTrack: {
      width: theme.sizes['48'],
      height: 8,
      borderRadius: 5,
      justifyContent: 'center',
    },
    verticalTrack: {
      height: 200,
      width: theme.sizes['2'],
      borderRadius: theme.radii.full,
      justifyContent: 'flex-start',
    },
    filledTrack: {
      position: 'absolute',
      borderRadius: theme.radii.full,
    },
    filledHorizontal: {
      height: theme.sizes['2'],
    },
    filledVertical: {
      width: theme.sizes['2'],
    },
    handle: {
      position: 'absolute',
      width: theme.sizes['5'],
      height: theme.sizes['5'],
      borderRadius: theme.radii.full,
      borderWidth: parseInt(theme.borderWidths['1']),
    },
    valueText: {
      marginTop: theme.space[2],
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.bold}` as any,
    },
  });
};
