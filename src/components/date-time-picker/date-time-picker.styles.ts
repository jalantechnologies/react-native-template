import { useTheme } from 'native-base';
import { Dimensions, StyleSheet, TextStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

export const useCalendarStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: theme.space[4],
    },
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
    headerCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    header: {
      backgroundColor: theme.colors.primary[500],
      borderWidth: parseInt(theme.borderWidths[1], 10),
      borderColor: theme.colors.secondary[50],
      borderRadius: theme.radii.md,
      paddingVertical: theme.space[1],
      paddingHorizontal: theme.space[2],
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      color: theme.colors.white,
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
    },
    headerIcon: {
      marginLeft: theme.space[1],
    },
    selectedDateHeader: {
      fontSize: theme.fontSizes['3xl'],
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      color: theme.colors.secondary[800],
    },
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.space[2],
    },
    dayLabel: {
      color: theme.colors.secondary[500],
      lineHeight: Number(theme.lineHeights.md),
      letterSpacing: theme.letterSpacings.md,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
      width: theme.sizes[8],
      textAlign: 'center',
      fontSize: theme.fontSizes.lg,
    },
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
    selectedCell: {
      ...theme.shadows[3],
      shadowColor: theme.colors.primary[400],
      backgroundColor: theme.colors.primary[500],
    },
    selectedDate: {
      color: theme.colors.white,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
    },
    dateTextCell: {
      color: theme.colors.secondary[900],
      fontSize: theme.fontSizes.lg,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(theme.lineHeights.md),
      letterSpacing: theme.letterSpacings.md,
    },
    rangeCell: {
      backgroundColor: theme.colors.primary[100],
    },
    rangeDateText: {
      color: theme.colors.primary[500],
    },
    todayCell: {
      borderColor: theme.colors.primary[500],
      borderWidth: parseInt(theme.borderWidths['1'], 10),
    },
    todayCellText: {
      color: theme.colors.primary[500],
    },
    blockedCell: {
      backgroundColor: theme.colors.secondary[100],
    },
    blockedCellText: {
      color: theme.colors.secondary[400],
    },
    actionRow: {
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
    },
    actionText: {
      minWidth: width * 0.2,
    },
    monthYearRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.space[4],
    },
    monthYearItems: {
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
    monthYearRowIcons: {
      fontSize: theme.fontSizes.lg,
      color: theme.colors.secondary[500],
    },
    selectByButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectByText: {
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
    },
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
    presetCont: {
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
    selectedCell: {
      ...theme.shadows[3],
      shadowColor: theme.colors.primary[400],
      backgroundColor: theme.colors.primary[500],
    },
    selectedYear: {
      color: theme.colors.white,
      fontWeight: `${theme.fontWeights.semibold}` as TextStyle['fontWeight'],
    },
    yearTextCell: {
      color: theme.colors.secondary[900],
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(theme.lineHeights.md),
      letterSpacing: theme.letterSpacings.md,
    },
  });
};

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
    separator: {
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
