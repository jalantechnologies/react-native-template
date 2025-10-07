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
  onMonthChange: (delta: number) => void;
  styles: any;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({ month, year, onMonthChange, styles }) => {
  const theme = useTheme();

  return (
    <View style={styles.monthYearRow}>
      <TouchableOpacity onPress={() => onMonthChange(-1)} style={styles.monthYearItems}>
        <Icon name="angle-left" style={styles.monthYearRowIcons} />
      </TouchableOpacity>

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

      <TouchableOpacity onPress={() => onMonthChange(1)} style={styles.monthYearItems}>
        <Icon name="angle-right" style={styles.monthYearRowIcons} />
      </TouchableOpacity>
    </View>
  );
};

export default MonthNavigator;
