import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native-paper';

const AppSpinner: React.FC<ActivityIndicatorProps> = (props) => (
  <ActivityIndicator animating={true} {...props} />
);

export default AppSpinner;
