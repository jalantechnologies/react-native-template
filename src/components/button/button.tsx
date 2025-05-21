import { ButtonKind, ButtonSize } from 'boilerplate-react-native/src/types/button';
import React, { PropsWithChildren } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from 'react-native';

import { useButtonStyles, useKindStyles, useSizeStyles } from './button.styles';
interface ButtonProps {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (event: GestureResponderEvent) => void;
  size?: ButtonSize;
  startEnhancer?: React.ReactElement | string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled = false,
  endEnhancer = undefined,
  isLoading = false,
  kind = ButtonKind.PRIMARY,
  onClick = undefined,
  size = ButtonSize.DEFAULT,
  startEnhancer = undefined,
}) => {
  const kindStyles = useKindStyles();
  const sizeStyles = useSizeStyles();

  const kindStyle = kindStyles[kind];
  const sizeStyle = sizeStyles[size];

  const styles = useButtonStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        kindStyle.base,
        disabled || isLoading ? kindStyle.disabled : kindStyle.enabled,
        sizeStyle.container,
      ]}
      disabled={disabled || isLoading}
      onPress={onClick}
      accessibilityRole="button"
    >
      <View style={styles.horizontalStack}>
        {startEnhancer ? (
          <View style={styles.enhancer}>
            {typeof startEnhancer === 'string' ? (
              <Text style={[kindStyle.text, sizeStyle.text]}>{startEnhancer}</Text>
            ) : (
              startEnhancer
            )}
          </View>
        ) : null}
        <Text style={[kindStyle.text, sizeStyle.text]}>{children}</Text>
        {isLoading ? (
          <ActivityIndicator color={kindStyle.text.color} style={styles.activityIndicator} />
        ) : null}
        {endEnhancer ? (
          <View style={styles.enhancer}>
            {typeof endEnhancer === 'string' ? (
              <Text style={[kindStyle.text, sizeStyle.text]}>{endEnhancer}</Text>
            ) : (
              endEnhancer
            )}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  disabled: false,
  endEnhancer: undefined,
  isLoading: false,
  kind: ButtonKind.PRIMARY,
  onClick: undefined,
  size: ButtonSize.DEFAULT,
  startEnhancer: undefined,
};

export default Button;
