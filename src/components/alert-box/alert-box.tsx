import { useTheme, Button } from 'native-base';
import React from 'react';
import { Modal, View, Text } from 'react-native';

import { AlertType } from '../../types/alert';

import { AlertStyles } from './alert.styles';

interface Props {
  confirmText: string;
  message: string;
  onClose: () => void;
  type: AlertType;
  title: string;
}

const SYMBOL = {
  [AlertType.DANGER]: '\u2718',
  [AlertType.INFO]: '\u24D8',
  [AlertType.SUCCESS]: '\u2714',
  [AlertType.WARNING]: '\u26A0',
};

export const AlertBox: React.FC<Props> = ({ type, title, message, onClose, confirmText }) => {
  const { colors } = useTheme();
  const styles = AlertStyles();

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

const AlertIcon = ({ symbol, color }: { symbol: string; color: string }) => {
  const styles = AlertStyles();
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.iconWrapper, { backgroundColor: color }]}>
        <View style={styles.unrotate}>
          <Text style={styles.iconText}>{symbol}</Text>
        </View>
      </View>
    </View>
  );
};

const AlertContent = ({ title, message }: { title: string; message: string }) => {
  const styles = AlertStyles();
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const AlertActionButton = ({
  label,
  color,
  onPress,
}: {
  label: string;
  color: string;
  onPress: () => void;
}) => {
  const styles = AlertStyles();
  return (
    <Button onPress={onPress} bgColor={color} _text={styles.buttonText} style={styles.button}>
      {label}
    </Button>
  );
};
