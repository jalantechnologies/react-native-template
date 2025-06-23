import { useTheme } from 'native-base';
import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

import { AlertBodyProps, AlertProps, AlertTitleProps, AlertType } from '../../types';

import { AlertActionButton } from './alert-action-button';
import { AlertCloseButton } from './alert-close-button';
import { AlertIcon } from './alert-icon';
import { useAlertStyles } from './alert.styles';

const SYMBOL = {
  [AlertType.DANGER]: '\u2718',
  [AlertType.INFO]: '\u24D8',
  [AlertType.SUCCESS]: '\u2714',
  [AlertType.WARNING]: '\u26A0',
};

const Alert: React.FC<AlertProps> & {
  Title: React.FC<AlertTitleProps>;
  Body: React.FC<AlertBodyProps>;
} = ({ type, onClose, onConfirm, confirmText, children }) => {
  const { colors } = useTheme();
  const styles = useAlertStyles();

  const getAlertColors = () => {
    const alertColorMap = {
      [AlertType.DANGER]: { bgColor: colors.error[500], textColor: colors.white },
      [AlertType.SUCCESS]: { bgColor: colors.success[500], textColor: colors.white },
      [AlertType.INFO]: { bgColor: colors.info[500], textColor: colors.white },
      [AlertType.WARNING]: { bgColor: colors.warning[300], textColor: colors.secondary[900] },
    };
    return alertColorMap[type] || { bgColor: colors.secondary[400], textColor: colors.white };
  };

  const { bgColor, textColor } = getAlertColors();

  return (
    <Modal transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <AlertCloseButton onPress={onClose} />
              <AlertIcon symbol={SYMBOL[type]} bgColor={bgColor} textColor={textColor} />
              {children}
              <AlertActionButton
                label={confirmText}
                bgColor={bgColor}
                textColor={textColor}
                onPress={onConfirm}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Title: React.FC<AlertTitleProps> = ({ children }) => {
  const styles = useAlertStyles();
  return (
    <View style={styles.title}>
      <>{children}</>
    </View>
  );
};

const Body: React.FC<AlertBodyProps> = ({ children }) => {
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
