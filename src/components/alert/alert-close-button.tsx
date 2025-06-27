import React from 'react';
import { View } from 'react-native';

import Button from '../button/button';
import { AlertCloseButtonProps } from '../../types';
import { ButtonKind } from '../../types/button';

import { useAlertStyles } from './alert.styles';

export const AlertCloseButton: React.FC<AlertCloseButtonProps> = ({ onPress }) => {
  const styles = useAlertStyles();
  return (
    <View style={styles.closeButtonContainer}>
      <Button kind={ButtonKind.TERTIARY} onClick={onPress}>
        ✕
      </Button>
    </View>
  );
};
