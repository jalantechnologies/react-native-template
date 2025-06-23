import { CloseIcon, useTheme } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import { AlertCloseButtonProps } from '../../types';
import { ButtonKind } from '../../types/button';
import Button from '../button/button';

import { useAlertStyles } from './alert.styles';

export const AlertCloseButton: React.FC<AlertCloseButtonProps> = ({ onPress }) => {
  const { colors } = useTheme();
  const styles = useAlertStyles();

  return (
    <View style={styles.closeIconContainer}>
      <Button onClick={onPress} kind={ButtonKind.TERTIARY}>
        <CloseIcon size="4" color={colors.gray[400]} />
      </Button>
    </View>
  );
};
