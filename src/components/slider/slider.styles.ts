import { useTheme } from 'native-base';
import { StyleSheet, TextStyle } from 'react-native';

export const useSliderStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: theme.space['0'],
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    sliderLine: {
      width: '100%',
      marginTop: theme.space[2],
      height: theme.sizes['2'],
      borderRadius: theme.radii.full,
      justifyContent: 'center',
      backgroundColor: theme.colors.primary['50'],
    },
    sliderFilledLine: {
      position: 'absolute',
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.primary['500'],
      height: theme.sizes['2'],
    },
    sliderHandle: {
      position: 'absolute',
      width: theme.sizes['5'],
      height: theme.sizes['5'],
      backgroundColor: theme.colors.primary['500'],
      borderRadius: theme.radii.full,
      borderWidth: parseInt(theme.borderWidths['4'], 10),
      borderColor: theme.colors.white,
    },
    valueLabelWrapper: {
      position: 'absolute',
      alignItems: 'center',
      zIndex: 10,
    },
    valueLabel: {
      ...theme.shadows['7'],
      backgroundColor: theme.colors.white,
      paddingHorizontal: theme.space['2.5'],
      paddingVertical: theme.space[1.5],
      borderRadius: theme.radii.sm,
      borderWidth: parseInt(theme.borderWidths['2'], 10),
      borderColor: theme.colors.white,
      minWidth: theme.sizes['10'],
      minHeight: theme.sizes['10'],
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    valueLabelText: {
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      color: theme.colors.secondary['500'],
    },
    pointer: {
      backgroundColor: theme.colors.white,
      position: 'absolute',
      bottom: -theme.sizes['2.5'],
      borderLeftWidth: theme.borderWidths[0],
      borderTopWidth: theme.borderWidths[0],
      width: theme.sizes['4'],
      height: theme.sizes['4'],
      transform: [{ rotate: '45deg' }],
      zIndex: -1,
    },
    endMarkersRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.space['1'],
      alignItems: 'center',
    },
    markerText: {
      fontSize: theme.fontSizes.xs,
      color: theme.colors.secondary['500'],
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      letterSpacing: Number(theme.letterSpacings.lg),
    },
    internalMarker: {
      position: 'absolute',
      bottom: -theme.sizes['5'],
      transform: [{ translateX: -theme.sizes[2] }],
      alignItems: 'center',
    },
    sliderWithInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inputBox: {
      alignSelf: 'flex-end',
      minWidth: theme.sizes['12'],
      maxWidth: theme.sizes['20'],
    },
    disabledTrack: {
      backgroundColor: theme.colors.secondary['100'],
    },
    disabledHandle: {
      backgroundColor: theme.colors.secondary['200'],
      borderWidth: parseInt(theme.borderWidths['4'], 10),
      borderColor: theme.colors.secondary['200'],
    },
    disabledMarkers: {
      color: theme.colors.secondary['200'],
    },
  });
};
