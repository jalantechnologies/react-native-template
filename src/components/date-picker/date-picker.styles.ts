import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useCalendarStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: theme.space[5],
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    headerText: {
      color: '#333',
      fontSize: 12,
      marginBottom: 10,
    },
    selectedDateHeader: {
      fontSize: 24,
      fontWeight: '500',
      color: '#000',
      marginBottom: 10,
    },
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    dayLabel: {
      color: '#333',
      width: 30,
      textAlign: 'center',
    },
    calendarGrid: {
      flexDirection: 'column',
    },
    calendarRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateCell: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 15,
    },
    selectedCell: {
      backgroundColor: 'blue',
    },
    selectedDate: {
      color: '#fff',
      fontWeight: 'bold',
    },
    dateTextCell: {
      color: '#000',
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    actionText: {
      color: '#4d8bf5',
      fontSize: 16,
    },
    monthYearRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    monthYearCont: {
      flexDirection: 'row',
      gap: 5,
    },
  });
};

export const useYearPickerStyles = () => {
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 20,
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      maxHeight: 350,
    },
    headerText: {
      color: '#333',
      fontSize: 12,
      marginBottom: 10,
    },
    yearGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    yearCell: {
      width: '22%',
      marginVertical: 10,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
    },
    selectedCell: {
      backgroundColor: 'blue',
    },
    selectedDate: {
      color: '#fff',
      fontWeight: 'bold',
    },
    dateTextCell: {
      color: '#000',
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    actionText: {
      color: '#4d8bf5',
      fontSize: 16,
    },
  });
};

export const useClockStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 20,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 20,
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
    },
    headerText: {
      color: '#333',
      fontSize: 12,
      marginBottom: 10,
    },
    clockLabel: {
      color: '#333',
      marginBottom: 10,
      fontSize: 16,
    },
    clockItem: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    clockHand: {
      position: 'absolute',
      height: 2,
      backgroundColor: '#4d8bf5',
    },
    amPmModalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      maxHeight: 200,
    },
    amPmGrid: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    amPmCell: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginHorizontal: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      alignItems: 'center',
    },
    amPmSelectedCell: {
      backgroundColor: '#4d8bf5',
    },
    amPmText: {
      color: '#000',
      fontSize: 16,
    },
    amPmSelectedText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    actionText: {
      color: '#4d8bf5',
      fontSize: 16,
    },
  });
};
