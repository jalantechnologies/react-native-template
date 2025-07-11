import React from 'react';
import { View } from 'react-native';

import CloseIcon from '../../../assets/img/close.svg';
import { AlertCloseButtonProps } from '../../types';
import { ButtonKind, ButtonSize } from '../../types/button';
import Button from '../button/button';

import { useAlertStyles } from './alert.styles';

export const AlertCloseButton: React.FC<AlertCloseButtonProps> = ({ onPress }) => {
  const styles = useAlertStyles();
  return (
    <View style={styles.closeButtonContainer}>
      <Button kind={ButtonKind.LINK} onClick={onPress} size={ButtonSize.COMPACT}>
        <CloseIcon width={24} height={24} />
      </Button>
    </View>
  );
};
