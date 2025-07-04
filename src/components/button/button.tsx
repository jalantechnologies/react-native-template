import { useTheme } from 'native-base';
import React, { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ButtonClass, ButtonKind, ButtonProps, ButtonShape, ButtonSize } from '../../types';
import { SpinnerTypes } from '../../types/spinner';
import Spinner from '../spinner/spinner';

import { useButtonStyles, useKindStyles, useSizeStyles, useClassStyles } from './button.styles';

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled = false,
  endEnhancer = undefined,
  isLoading = false,
  kind = ButtonKind.PRIMARY,
  buttonClass = ButtonClass.NORMAL,
  onClick = undefined,
  shape = ButtonShape.REGULAR,
  size = ButtonSize.DEFAULT,
  startEnhancer = undefined,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const kindStyles = useKindStyles();
  const classStyles = useClassStyles(isPressed || isLoading);
  const sizeStyles = useSizeStyles();
  const theme = useTheme();

  const kindStyle = kindStyles[kind];
  const classStyle = classStyles[buttonClass];
  const sizeStyle = sizeStyles[size];
  const styles = useButtonStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        classStyle.base,
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
                : kind === ButtonKind.PRIMARY
                ? kindStyle.text
                : classStyle.text,
              sizeStyle.text,
              styles.text,
            ]}
          >
            {children}
          </Text>
        )}

        {isLoading ? (
          <Spinner
            type={kind === ButtonKind.PRIMARY ? SpinnerTypes.SECONDARY : SpinnerTypes.PRIMARY}
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
