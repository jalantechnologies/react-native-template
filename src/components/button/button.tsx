import { useTheme } from 'native-base';
import React, { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ButtonKind, ButtonProps, ButtonShape, ButtonSize } from '../../types';
import { SpinnerTypes } from '../../types/spinner';
import Spinner from '../spinner/spinner';

import { useButtonStyles, useKindStyles, useSizeStyles } from './button.styles';

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled = false,
  endEnhancer = undefined,
  isLoading = false,
  kind = ButtonKind.PRIMARY,
  onClick = undefined,
  shape = ButtonShape.DEFAULT,
  size = ButtonSize.DEFAULT,
  startEnhancer = undefined,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const kindStyles = useKindStyles(isPressed || isLoading, isActive);
  const sizeStyles = useSizeStyles();

  const kindStyle = kindStyles[kind];
  const sizeStyle = sizeStyles[size];

  const styles = useButtonStyles();

  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        kindStyle.base,
        disabled ? kindStyle.disabled : {},
        sizeStyle.container,
        shape === ButtonShape.CAPSULE && { borderRadius: theme.radii.full },
      ]}
      disabled={disabled || isLoading}
      onPress={event => {
        setIsActive(true);
        onClick?.(event);
      }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
    >
      <View style={styles.horizontalStack}>
        {startEnhancer ? (
          <View style={styles.enhancer}>
            {typeof startEnhancer === 'string' ? (
              <Text
                style={[
                  disabled ? kindStyle.disabled : kindStyle.text,
                  sizeStyle.text,
                  styles.text,
                ]}
              >
                {startEnhancer}
              </Text>
            ) : (
              startEnhancer
            )}
          </View>
        ) : null}
        {children && (
          <Text
            style={[disabled ? kindStyle.disabled : kindStyle.text, sizeStyle.text, styles.text]}
          >
            {children}
          </Text>
        )}

        {isLoading ? (
          <Spinner
            type={
              kind === ButtonKind.SECONDARY ||
              kind === ButtonKind.TERTIARY ||
              kind === ButtonKind.DASHED
                ? SpinnerTypes.PRIMARY
                : SpinnerTypes.SECONDARY
            }
          />
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

export default Button;
