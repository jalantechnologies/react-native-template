import { useTheme } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';

export const useSliderStyles = (isVertical: boolean) => {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return StyleSheet.create({
    container: {
      margin: theme.space[5],
      flexDirection: isVertical ? 'row' : 'column',
      gap: isVertical ? theme.space['3'] : 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    track: {
      width: isVertical ? screenHeight * 0.3 : screenWidth * 0.8,
      height: theme.sizes['2'],
      borderRadius: theme.radii.full,
      justifyContent: 'center',
      backgroundColor: theme.colors.primary['50'],
    },
    horizontalTrack: {
      width: screenWidth * 0.8,
      height: theme.sizes['2'],
      borderRadius: theme.radii.full,
      justifyContent: 'center',
    },
    verticalTrack: {
      height: screenHeight * 0.3,
      width: theme.sizes['2'],
      borderRadius: theme.radii.full,
      justifyContent: 'flex-start',
    },
    filledTrack: {
      position: 'absolute',
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.primary['500'],
    },
    filledHorizontal: {
      height: theme.sizes['2'],
    },
    filledVertical: {
      width: theme.sizes['2'],
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
    handle: {
      position: 'absolute',
      width: theme.sizes['5'],
      height: theme.sizes['5'],
      backgroundColor: theme.colors.primary['500'],
      borderRadius: theme.radii.full,
      borderWidth: parseInt(theme.borderWidths['4']),
      borderColor: theme.colors.white,
    },
    valueText: {
      marginTop: theme.space[2],
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.bold}` as any,
      minWidth: theme.sizes['10'],
      textAlign: 'center',
    },
  });
};
