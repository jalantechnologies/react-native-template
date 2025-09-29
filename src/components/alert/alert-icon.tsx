import React from 'react';
import { View } from 'react-native';

import { AlertIconProps } from '../../types';

import { useAlertStyles } from './alert.styles';

export const AlertIcon: React.FC<AlertIconProps> = ({ symbol, bgColor }) => {
  const styles = useAlertStyles();
  return <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>{symbol}</View>;
};
