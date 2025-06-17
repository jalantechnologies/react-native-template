import React from 'react';
import { View, Text } from 'react-native';

import { AlertContentProps } from './../../types/alert';

import { useAlertStyles } from './alert.styles';

export const AlertContent: React.FC<AlertContentProps> = ({ title, message }) => {
  const styles = useAlertStyles();
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
