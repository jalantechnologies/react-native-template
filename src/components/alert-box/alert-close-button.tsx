import { CloseIcon, IconButton, useTheme } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import { AlertCloseButtonProps } from '../../types';

import { useAlertStyles } from './alert.styles';

const AlertClose: React.FC<AlertCloseButtonProps> = ({ onPress }) => {
  const { colors } = useTheme();
  const styles = useAlertStyles();

  return (
    <View style={styles.closeIconContainer}>
      <IconButton
        icon={<CloseIcon size="4" color={colors.gray[500]} />}
        onPress={onPress}
        borderRadius="full"
        _pressed={{ bg: 'transparent' }}
      />
    </View>
  );
};

export default AlertClose;
