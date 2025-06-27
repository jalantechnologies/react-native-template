import { useTheme } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { Modal, TouchableWithoutFeedback, View, Animated, Dimensions } from 'react-native';

import DeleteIcon from '../../../assets/img/delete.svg';
import InfoIcon from '../../../assets/img/info.svg';
import SavedIcon from '../../../assets/img/saved.svg';
import SuccessIcon from '../../../assets/img/success.svg';
import WarningIcon from '../../../assets/img/warning.svg';

import { AlertProps, AlertType, AlertBodyProps, AlertTitleProps, AlertPosition } from '../../types';
import { ButtonKind } from '../../types/button';

import { AlertActionButton } from './alert-action-button';
import { AlertCloseButton } from './alert-close-button';
import { AlertIcon } from './alert-icon';
import { useAlertStyles } from './alert.styles';

const { height } = Dimensions.get('window');

const SYMBOL = {
  [AlertType.DELETE]: <DeleteIcon width={28} height={28} />,
  [AlertType.INFO]: <InfoIcon width={28} height={28} />,
  [AlertType.SUCCESS]: <SuccessIcon width={28} height={28} />,
  [AlertType.SAVED]: <SavedIcon width={28} height={28} />,
  [AlertType.WARNING]: <WarningIcon width={28} height={28} />,
};

const Alert: React.FC<AlertProps> & {
  Title: React.FC<AlertTitleProps>;
  Body: React.FC<AlertBodyProps>;
} = ({
  type,
  onClose,
  onConfirm,
  onCancel = () => {},
  confirmText = 'Confirm',
  cancelText,
  position = AlertPosition.CENTER,
  children,
}) => {
  const { colors } = useTheme();
  const styles = useAlertStyles();
  const slideAnim = useRef(new Animated.Value(height)).current;

  const getIconBgColors = () => {
    if (type === AlertType.DELETE) {
      return colors.danger[50];
    } else if (type === AlertType.SUCCESS) {
      return colors.success[50];
    } else if (type === AlertType.WARNING) {
      return colors.warning[50];
    } else if (type === AlertType.SAVED) {
      return colors.secondary[50];
    } else {
      return colors.info[50];
    }
  };
  const bgColor = getIconBgColors();

  const getButtonTypeFromAlertType = () => {
    if (type === AlertType.DELETE) {
      return ButtonKind.DANGER;
    } else if (type === AlertType.SUCCESS) {
      return ButtonKind.SECONDARY;
    } else if (type === AlertType.WARNING) {
      return ButtonKind.TERTIARY;
    } else {
      return ButtonKind.PRIMARY;
    }
  };

  const buttonType = getButtonTypeFromAlertType();

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Modal transparent animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.overlay,
            position === AlertPosition.BOTTOM
              ? { justifyContent: 'flex-end' }
              : { justifyContent: 'center' },
          ]}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={[
                { transform: [{ translateY: slideAnim }] },
                position === AlertPosition.BOTTOM ? styles.bottomContainer : styles.centerContainer,
              ]}
            >
              {position === AlertPosition.BOTTOM ? (
                <View style={styles.handleBar} />
              ) : (
                <AlertCloseButton onPress={onClose} />
              )}
              <AlertIcon symbol={SYMBOL[type]} bgColor={bgColor} />
              <View style={styles.childrenContainer}>{children}</View>
              <View style={styles.buttonContainer}>
                {cancelText && (
                  <>
                    <View style={styles.buttonWrapper}>
                      <AlertActionButton
                        label={cancelText}
                        onPress={onCancel}
                        type={ButtonKind.SECONDARY}
                      />
                    </View>
                    <View style={styles.buttonSpacing} />
                  </>
                )}
                <View style={styles.buttonWrapper}>
                  <AlertActionButton label={confirmText} onPress={onConfirm} type={buttonType} />
                </View>
              </View>
            </Animated.View>
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
