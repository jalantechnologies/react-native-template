import { useTheme } from 'native-base';
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import { AlertType } from './alert.types';
import { AlertStyles } from './alert.styles';

interface Props {
  confirmText: string;
  message: string;
  onClose: () => void;
  type: AlertType;
  title: string;
}

const SYMBOL = {
  [AlertType.DANGER]: '╳',
  [AlertType.INFO]: '💡',
  [AlertType.SUCCESS]: '✔',
  [AlertType.WARNING]: '⚠',
};

export const AlertBox: React.FC<Props> = ({ 
  type, 
  title, 
  message, 
  onClose, 
  confirmText 
}) => {
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
  const color = getAlertColor();

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconWrapper, { backgroundColor: color }]}>
              <View style={styles.unrotate}>
                <Text style={styles.iconText}>{SYMBOL[type]}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onClose}>
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
