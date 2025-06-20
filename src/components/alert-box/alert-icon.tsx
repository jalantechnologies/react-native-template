import React from 'react';
import { View, Text } from 'react-native';

import { AlertIconProps } from '../../types/alert';

import { useAlertStyles } from './alert.styles';

export const AlertIcon: React.FC<AlertIconProps> = ({ symbol, bgColor, textColor }) => {
  const styles = useAlertStyles();
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
        <View style={styles.unrotate}>
          <Text style={[styles.iconText, { color: textColor }]}>{symbol}</Text>
        </View>
      </View>
    </View>
  );
};
