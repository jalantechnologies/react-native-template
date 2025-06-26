import React, { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, Text, View, ViewStyle } from 'react-native';

import { ButtonKind, ButtonProps, ButtonSize } from '../../types';
import Spinner from '../spinner/spinner';

import { useButtonStyles, useKindStyles, useSizeStyles } from './button.styles';
import { useTheme } from 'native-base';

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled = false,
  diameter,
  endEnhancer = undefined,
  isLoading = false,
  isCircular = false,
  kind = ButtonKind.PRIMARY,
  onClick = undefined,
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

  const isCircularStyle = {
    borderRadius: theme.radii.full,
    width: diameter ?? theme.sizes[12],
    height: diameter ?? theme.sizes[12],
    justifyContent: 'center' as ViewStyle['justifyContent'],
    alignItems: 'center' as ViewStyle['alignItems'],
    padding: 0,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        kindStyle.base,
        disabled ? kindStyle.disabled : {},
        isCircular ? isCircularStyle : sizeStyle.container,
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
