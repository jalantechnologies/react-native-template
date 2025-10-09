// Displays the current month and year with navigation arrows for moving between previous and next months.
import { useTheme } from 'native-base';
import React from 'react';
import { View, Text, TouchableOpacity, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface MonthNavigatorProps {
  month: number;
  year: number;
  // Handler for changing month (+1 for next, -1 for previous)
  onMonthChange: (delta: number) => void;
  styles: any;
}

// MonthNavigator — Displays month/year with left & right navigation buttons.
const MonthNavigator: React.FC<MonthNavigatorProps> = ({ month, year, onMonthChange, styles }) => {
  const theme = useTheme();

  return (
    <View style={styles.monthYearRow}>
      {/* Left navigation arrow — go to previous month */}
      <TouchableOpacity onPress={() => onMonthChange(-1)} style={styles.monthYearItems}>
        <Icon name="angle-left" style={styles.monthYearRowIcons} />
      </TouchableOpacity>

      {/* Display current month and year */}
      <View style={styles.monthYearItems}>
        <Text
          style={[
            styles.monthYearText,
            { fontWeight: `${theme.fontWeights.medium}` as TextStyle['fontWeight'] },
          ]}
        >
          {`${MONTH_NAMES[month]} ${year}`}
        </Text>
      </View>

      {/* Right navigation arrow — go to next month */}
      <TouchableOpacity onPress={() => onMonthChange(1)} style={styles.monthYearItems}>
        <Icon name="angle-right" style={styles.monthYearRowIcons} />
      </TouchableOpacity>
    </View>
  );
};

export default MonthNavigator;
