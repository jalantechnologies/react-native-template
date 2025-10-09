import { useTheme } from 'native-base';
import { Dimensions, StyleSheet, TextStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

// Calender styles
export const useCalendarStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    // Outer modal container
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: theme.space[4],
    },
    // Main calendar modal
    modalContent: {
      ...theme.shadows[5],
      shadowColor: theme.colors.secondary[600],
      backgroundColor: theme.colors.white,
      borderRadius: theme.radii.xl,
      padding: theme.space[5],
      gap: theme.space[2],
      minHeight: height * 0.6,
      overflow: 'hidden',
    },
    // Header container: Year + "Select By"
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    yearDropdownButton: {
      backgroundColor: theme.colors.primary[500],
      borderWidth: parseInt(theme.borderWidths[1], 10),
      borderColor: theme.colors.secondary[50],
      borderRadius: theme.radii.md,
      paddingVertical: theme.space[1],
      paddingHorizontal: theme.space[2],
      flexDirection: 'row',
      alignItems: 'center',
    },
    yearDropdownText: {
      color: theme.colors.white,
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
    },
    yearDropdownIcon: {
      marginLeft: theme.space[1],
    },
    selectedDateText: {
      fontSize: theme.fontSizes['3xl'],
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      color: theme.colors.secondary[800],
    },
    // Day names row (Sun, Mon, ...)
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.space[2],
    },
    dayLabelText: {
      color: theme.colors.secondary[500],
      lineHeight: Number(theme.lineHeights.md),
      letterSpacing: theme.letterSpacings.md,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
      width: theme.sizes[8],
      textAlign: 'center',
      fontSize: theme.fontSizes.lg,
    },
    // Calendar grid
    calendarGrid: {
      flexDirection: 'column',
      minHeight: height * 0.3,
    },
    calendarRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateCell: {
      minWidth: theme.sizes[8],
      minHeight: theme.sizes[8],
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: theme.space[1],
      borderRadius: theme.radii.lg,
    },
    selectedDateCell: {
      ...theme.shadows[3],
      shadowColor: theme.colors.primary[400],
      backgroundColor: theme.colors.primary[500],
    },
    selectedDateTextWhite: {
      color: theme.colors.white,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
    },
    dateText: {
      color: theme.colors.secondary[900],
      fontSize: theme.fontSizes.lg,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(theme.lineHeights.md),
      letterSpacing: theme.letterSpacings.md,
    },
    rangeDateCell: {
      backgroundColor: theme.colors.primary[100],
    },
    rangeDateText: {
      color: theme.colors.primary[500],
    },
    todayDateCell: {
      borderColor: theme.colors.primary[500],
      borderWidth: parseInt(theme.borderWidths['1'], 10),
    },
    todayDateText: {
      color: theme.colors.primary[500],
    },
    blockedDateCell: {
      backgroundColor: theme.colors.secondary[100],
    },
    blockedDateText: {
      color: theme.colors.secondary[400],
    },
    // Action buttons row (Confirm / Cancel)
    actionRow: {
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
    },
    actionText: {
      minWidth: width * 0.2,
    },
    // Month-Year row
    monthYearRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.space[4],
    },
    monthYearButton: {
      borderWidth: parseInt(theme.borderWidths[1], 10),
      borderColor: theme.colors.primary[50],
      paddingHorizontal: theme.space[3],
      borderRadius: theme.radii.lg,
    },
    monthYearText: {
      fontSize: theme.fontSizes.lg,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
      color: theme.colors.primary[500],
      lineHeight: Number(theme.lineHeights.md),
      letterSpacing: theme.letterSpacings.md,
      textAlign: 'center',
    },
    monthYearNavIcon: {
      fontSize: theme.fontSizes.lg,
      color: theme.colors.secondary[500],
    },
    // "Select By" dropdown
    selectByButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectByText: {
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
    },
    // Preset overlay
    presetOverlay: {
      position: 'absolute',
      top: theme.space[12],
      left: theme.space[0],
      right: theme.space[4],
      bottom: theme.space[0],
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      zIndex: 9999,
    },
    presetContainer: {
      ...theme.shadows[5],
      shadowColor: theme.colors.secondary[600],
      backgroundColor: theme.colors.white,
      borderRadius: theme.radii.xl,
      paddingVertical: theme.space[4],
      paddingHorizontal: theme.space[5],
    },
    presetOption: {
      paddingVertical: theme.space[2],
    },
    presetOptionText: {
      fontSize: theme.fontSizes.md,
      textAlign: 'center',
    },
  });
};

// Styles for Year Picker component
export const useYearPickerStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'flex-end',
      padding: theme.space[5],
    },
    modalContent: {
      ...theme.shadows[5],
      shadowColor: theme.colors.secondary[600],
      backgroundColor: theme.colors.white,
      padding: theme.space[5],
      borderRadius: theme.radii.xl,
      maxHeight: height * 0.4,
      width: width * 0.8,
      alignSelf: 'center',
      gap: theme.space[2],
    },
    yearGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: theme.space[2],
    },
    yearCell: {
      width: '27%',
      marginVertical: theme.space[2],
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.space[3],
      borderWidth: parseInt(theme.borderWidths[1], 10),
      borderRadius: theme.radii.lg,
      borderColor: theme.colors.primary[50],
    },
    selectedYearCell: {
      ...theme.shadows[3],
      shadowColor: theme.colors.primary[400],
      backgroundColor: theme.colors.primary[500],
    },
    selectedYearText: {
      color: theme.colors.white,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
    },
    yearText: {
      color: theme.colors.secondary[900],
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(theme.lineHeights.md),
      letterSpacing: theme.letterSpacings.md,
    },
  });
};

// Time Picker styles 
export const useTimePickerStyles = (ITEM_HEIGHT: number) => {
  const theme = useTheme();
  return StyleSheet.create({
    position: {
      position: 'absolute',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: theme.space[5],
    },
    modalContent: {
      ...theme.shadows[5],
      shadowColor: theme.colors.secondary[600],
      backgroundColor: theme.colors.white,
      borderRadius: theme.radii.xl,
      padding: theme.space[5],
      alignSelf: 'center',
      width: width * 0.8,
      maxHeight: height * 0.4,
    },
    headerText: {
      color: theme.colors.secondary[900],
      fontSize: theme.fontSizes.lg,
      marginBottom: theme.space[5],
      textAlign: 'center',
    },
    pickerRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    separatorLine: {
      width: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.secondary[400],
      height: ITEM_HEIGHT * 3,
    },
    pickerContainer: {
      height: ITEM_HEIGHT * 3,
      overflow: 'hidden',
    },
    pickerContent: {
      paddingVertical: ITEM_HEIGHT,
    },
    timerItem: {
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timerItemText: {
      fontSize: theme.fontSizes.lg,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(theme.lineHeights.md),
      letterSpacing: theme.letterSpacings.md,
    },
    highlight: {
      position: 'absolute',
      top: ITEM_HEIGHT,
      height: ITEM_HEIGHT,
      width: '100%',
      borderTopWidth: parseInt(theme.borderWidths['1'], 10),
      borderBottomWidth: parseInt(theme.borderWidths['1'], 10),
      borderColor: theme.colors.secondary[300],
    },
    actionRow: {
      paddingTop: theme.space[3],
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: theme.space[5],
    },
    actionText: {
      flex: 1,
    },
  });
};
