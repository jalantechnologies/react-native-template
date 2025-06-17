import { Button } from 'native-base';
import React from 'react';

import { AlertActionButtonProps } from '../../types/alert';

import { useAlertStyles } from './alert.styles';

export const AlertActionButton: React.FC<AlertActionButtonProps> = ({ label, color, onPress }) => {
  const styles = useAlertStyles();
  return (
    <Button onPress={onPress} bgColor={color} _text={styles.buttonText} style={styles.button}>
      {label}
    </Button>
  );
};
