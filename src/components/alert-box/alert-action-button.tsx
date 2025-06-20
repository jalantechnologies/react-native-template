import { Button } from 'native-base';
import React from 'react';

import { AlertActionButtonProps } from '../../types/alert';

import { useAlertStyles } from './alert.styles';

export const AlertActionButton: React.FC<AlertActionButtonProps> = ({
  label,
  bgColor,
  onPress,
  textColor,
}) => {
  const styles = useAlertStyles();
  return (
    <Button
      onPress={onPress}
      bgColor={bgColor}
      _text={{ ...styles.buttonText, color: textColor }}
      style={styles.button}
    >
      {label}
    </Button>
  );
};
