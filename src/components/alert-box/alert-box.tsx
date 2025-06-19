import { useTheme } from 'native-base';
import React, { ReactNode } from 'react';
import { Modal, View } from 'react-native';

import { AlertBoxProps, AlertType } from '../../types';

import { AlertActionButton } from './alert-action-button';
import { AlertIcon } from './alert-icon';
import { useAlertStyles } from './alert.styles';

const SYMBOL = {
  [AlertType.DANGER]: '\u2718',
  [AlertType.INFO]: '\u24D8',
  [AlertType.SUCCESS]: '\u2714',
  [AlertType.WARNING]: '\u26A0',
};

const Alert = ({ type, onClose, confirmText, children }: AlertBoxProps) => {
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
          {children}
          <AlertActionButton label={confirmText} color={alertColor} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  const styles = useAlertStyles();
  return (
    <View style={styles.title}>
      <>{children}</>
    </View>
  );
};

const Body = ({ children }: { children: ReactNode }) => {
  const styles = useAlertStyles();
  return (
    <View style={styles.message}>
      <>{children}</>
    </View>
  );
};

Alert.Title = Title;
Alert.Body = Body;

export { Alert };
