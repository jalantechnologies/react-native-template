import { useTheme } from 'native-base';
import React, { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ButtonColor, ButtonKind, ButtonProps, ButtonShape, ButtonSize } from '../../types';
import { SpinnerTypes } from '../../types/spinner';
import Spinner from '../spinner/spinner';

import { useButtonStyles, useKindStyles, useSizeStyles, useColorStyles } from './button.styles';

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled = false,
  endEnhancer = undefined,
  isLoading = false,
  kind = ButtonKind.CONTAINED,
  color = ButtonColor.PRIMARY,
  onClick = undefined,
  shape = ButtonShape.REGULAR,
  size = ButtonSize.DEFAULT,
  startEnhancer = undefined,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const kindStyles = useKindStyles();
  const colorStyles = useColorStyles(isPressed || isLoading);
  const sizeStyles = useSizeStyles();
  const theme = useTheme();

  const kindStyle = kindStyles[kind];
  const colorStyle = colorStyles[color];
  const sizeStyle = sizeStyles[size];
  const styles = useButtonStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        colorStyle.base,
        kindStyle.base,
        disabled ? kindStyle.disabled : {},
        sizeStyle.container,
        shape === ButtonShape.CAPSULE && { borderRadius: theme.radii.full },
      ]}
      disabled={disabled || isLoading}
      onPress={event => {
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
            style={[
              disabled
                ? kindStyle.disabled
                : kind === ButtonKind.CONTAINED
                ? kindStyle.text
                : colorStyle.text,
              sizeStyle.text,
              styles.text,
            ]}
          >
            {children}
          </Text>
        )}

        {isLoading ? (
          <Spinner
            type={kind === ButtonKind.CONTAINED ? SpinnerTypes.SECONDARY : SpinnerTypes.PRIMARY}
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
