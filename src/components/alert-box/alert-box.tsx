import { useTheme } from 'native-base';
import React from 'react';
import { Modal, View } from 'react-native';

import { AlertBoxProps, AlertType } from '../../types/alert';

import { AlertIcon } from './alert-icon';
import { AlertContent } from './alert-content';
import { AlertActionButton } from './alert-action-button';
import { useAlertStyles } from './alert.styles';

const SYMBOL = {
  [AlertType.DANGER]: '\u2718',
  [AlertType.INFO]: '\u24D8',
  [AlertType.SUCCESS]: '\u2714',
  [AlertType.WARNING]: '\u26A0',
};

export const AlertBox: React.FC<AlertBoxProps> = ({
  type,
  title,
  message,
  onClose,
  confirmText,
}) => {
  const { colors } = useTheme();
  const styles = useAlertStyles();

  const getAlertColor = () => {
    switch (type) {
      case AlertType.DANGER:
        return colors.error[500];
      case AlertType.SUCCESS:
        return colors.success[500];
      case AlertType.INFO:
        return colors.info[500];
      case AlertType.WARNING:
        return colors.warning[500];
      default:
        return colors.gray[400];
    }
  };

  const alertColor = getAlertColor();

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <AlertIcon symbol={SYMBOL[type]} color={alertColor} />
          <AlertContent title={title} message={message} />
          <AlertActionButton label={confirmText} color={alertColor} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
