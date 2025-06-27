import { useTheme } from 'native-base';
import React, { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, Text, View, ViewStyle } from 'react-native';

import { ButtonKind, ButtonProps, ButtonShape, ButtonSize } from '../../types';
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
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  const kindStyles = useKindStyles(isPressed || isLoading, isActive);
  const sizeStyles = useSizeStyles();

  const kindStyle = kindStyles[kind];
  const sizeStyle = sizeStyles[size];

  const styles = useButtonStyles();

  const theme = useTheme();

  const shapeStyle: ViewStyle = (() => {
    const dynamicSize = Math.max(
      contentSize.width + theme.space[2],
      contentSize.height + theme.space[2],
    );
    switch (shape) {
      case ButtonShape.CIRCULAR:
        return {
          borderRadius: dynamicSize / 2,
          width: dynamicSize,
          height: dynamicSize,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
        };
      case ButtonShape.CAPSULE:
        return {
          borderRadius: dynamicSize,
          paddingVertical: sizeStyle.container.paddingVertical,
          paddingHorizontal: sizeStyle.container.paddingHorizontal,
        };
      case ButtonShape.SQUARE:
        return {
          borderRadius: theme.radii.sm,
          width: dynamicSize,
          height: dynamicSize,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
        };
      default:
        return sizeStyle.container;
    }
  })();

  return (
    <TouchableOpacity
      style={[styles.button, kindStyle.base, disabled ? kindStyle.disabled : {}, shapeStyle]}
      disabled={disabled || isLoading}
      onPress={event => {
        setIsActive(true);
        onClick?.(event);
      }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
    >
      <View
        style={styles.horizontalStack}
        onLayout={event => {
          const { width, height } = event.nativeEvent.layout;
          setContentSize({ width, height });
        }}
      >
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
