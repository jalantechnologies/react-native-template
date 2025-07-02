import { useTheme } from 'native-base';
import { Dimensions, StyleSheet, TextStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

export const useCalendarStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: theme.space[5],
    },
    modalContent: {
      ...theme.shadows[5],
      shadowColor: theme.colors.secondary[600],
      backgroundColor: theme.colors.white,
      borderRadius: theme.radii.md,
      padding: theme.space[3],
      gap: theme.space[2],
      minHeight: height * 0.6,
    },
    headerCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    header: {
      backgroundColor: theme.colors.primary[400],
      borderWidth: parseInt(theme.borderWidths[1], 10),
      borderColor: theme.colors.secondary[50],
      borderRadius: theme.radii.md,
      paddingVertical: theme.space[1],
      paddingHorizontal: theme.space[2],
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      color: theme.colors.secondary[50],
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.medium}` as TextStyle['fontWeight'],
    },
    selectedDateHeader: {
      fontSize: theme.fontSizes['3xl'],
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      color: theme.colors.primary[800],
    },
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.space[2],
    },
    dayLabel: {
      color: theme.colors.primary[700],
      width: theme.sizes[8],
      textAlign: 'center',
      fontSize: theme.fontSizes.lg,
    },
    calendarCont: {
      borderWidth: parseInt(theme.borderWidths[1], 10),
      borderRadius: theme.radii['3xl'],
      padding: theme.space[4],
      backgroundColor: theme.colors.secondary[50],
      borderColor: theme.colors.secondary[50],
      minHeight: height * 0.46,
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
      borderRadius: theme.radii.xl,
    },
    selectedCell: {
      ...theme.shadows[3],
      shadowColor: theme.colors.primary[300],
      backgroundColor: theme.colors.primary[400],
    },
    selectedDate: {
      color: theme.colors.secondary[50],
      fontWeight: `${theme.fontWeights.bold}` as TextStyle['fontWeight'],
    },
    dateTextCell: {
      color: theme.colors.primary[800],
      fontSize: theme.fontSizes.md,
    },
    rangeCell: {
      backgroundColor: theme.colors.primary[100],
      borderRadius: 0,
    },
    rangeDateText: {
      color: theme.colors.primary[700],
    },
    todayCell: {
      backgroundColor: theme.colors.primary[100],
    },
    todayCellText: {
      color: theme.colors.primary[400],
    },
    blockedCell: {
      backgroundColor: theme.colors.secondary[200],
    },
    blockedCellText: {
      color: theme.colors.secondary[700],
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
      borderColor: theme.colors.secondary[100],
      paddingHorizontal: theme.space[3],
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.white,
    },
    monthYear: {
      flexDirection: 'row',
      gap: theme.space[1],
    },
    monthYearText: {
      fontSize: theme.fontSizes.lg,
      color: theme.colors.primary[800],
    },
    selectByButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectByText: {
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
    },
    headerIcon: {
      marginLeft: theme.space[1],
    },
    presetOverlay: {
      position: 'absolute',
      top: theme.space[10],
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
      borderRadius: theme.radii.lg,
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
      padding: theme.space[3],
      borderWidth: parseInt(theme.borderWidths[1], 10),
      borderRadius: theme.radii.xl,
      borderColor: theme.colors.secondary[100],
    },
    selectedCell: {
      ...theme.shadows[3],
      shadowColor: theme.colors.primary[300],
      backgroundColor: theme.colors.primary[400],
    },
    selectedYear: {
      color: theme.colors.secondary[50],
      fontWeight: `${theme.fontWeights.bold}` as TextStyle['fontWeight'],
    },
    yearTextCell: {
      color: theme.colors.primary[700],
    },
  });
};

export const useTimePickerStyles = (ITEM_HEIGHT: number) => {
  const theme = useTheme();
  return StyleSheet.create({
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
      color: theme.colors.primary[800],
      fontSize: theme.fontSizes.md,
      marginBottom: theme.space[5],
      textAlign: 'center',
    },
    timerItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickerRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    separator: {
      width: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.secondary[300],
      height: ITEM_HEIGHT * 3,
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
