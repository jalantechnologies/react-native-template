import { useTheme } from 'native-base';
import React, { ReactNode } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

import { AlertBoxProps, AlertType } from '../../types';

import { AlertActionButton } from './alert-action-button';
import AlertClose from './alert-close-button';
import { AlertIcon } from './alert-icon';
import { useAlertStyles } from './alert.styles';

const SYMBOL = {
  [AlertType.DANGER]: '\u2718',
  [AlertType.INFO]: '\u24D8',
  [AlertType.SUCCESS]: '\u2714',
  [AlertType.WARNING]: '\u26A0',
};

const Alert = ({ type, onClose, onConfirm, confirmText, children }: AlertBoxProps) => {
  const { colors } = useTheme();
  const styles = useAlertStyles();

  const getAlertColors = () => {
    switch (type) {
      case AlertType.DANGER:
        return {
          bgColor: colors.error[500],
          textColor: colors.white,
        };
      case AlertType.SUCCESS:
        return {
          bgColor: colors.success[500],
          textColor: colors.white,
        };
      case AlertType.INFO:
        return {
          bgColor: colors.info[500],
          textColor: colors.white,
        };
      case AlertType.WARNING:
        return {
          bgColor: colors.warning[300],
          textColor: colors.secondary[900],
        };
      default:
        return {
          bgColor: colors.secondary[400],
          textColor: colors.white,
        };
    }
  };

  const { bgColor, textColor } = getAlertColors();

  return (
    <Modal transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <AlertClose onPress={onClose} />
            <AlertIcon symbol={SYMBOL[type]} bgColor={bgColor} textColor={textColor} />
            {children}
            <AlertActionButton
              label={confirmText}
              bgColor={bgColor}
              textColor={textColor}
              onPress={onConfirm}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
