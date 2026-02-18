import React from 'react';
import { Checkbox } from 'react-native-paper';

interface AppCheckboxProps {
  status: 'checked' | 'unchecked' | 'indeterminate';
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
}

const AppCheckbox: React.FC<AppCheckboxProps> = (props) => (
  <Checkbox.Android {...props} />
);

export default AppCheckbox;
