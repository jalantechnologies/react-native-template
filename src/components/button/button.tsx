import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ButtonKind, ButtonProps, ButtonSize } from '../../types';
import Spinner from '../spinner/spinner';

import { useButtonStyles, useKindStyles, useSizeStyles } from './button.styles';

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled = false,
  endEnhancer = undefined,
  isLoading = false,
  kind = ButtonKind.PRIMARY,
  onClick = undefined,
  size = ButtonSize.DEFAULT,
  startEnhancer = undefined,
  width = undefined,
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
        width ? { width } : {},
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
        {isLoading ? <Spinner /> : null}
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

export default Button;
