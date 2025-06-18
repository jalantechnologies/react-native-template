import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ButtonKind, ButtonSize, ButtonProps } from '../../types/button';
import Spinner from '../spinner/spinner';

import { useButtonStyles, useKindStyles, useSizeStyles } from './button.styles';

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  disabled = false,
  icon = undefined,
  kind = ButtonKind.PRIMARY,
  loading = false,
  onPress = undefined,
  size = ButtonSize.DEFAULT,
  style = undefined,
  title,
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
        disabled || loading ? kindStyle.disabled : kindStyle.enabled,
        sizeStyle.container,
        style,
      ]}
      disabled={disabled || loading}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.horizontalStack}>
        {title && <Text style={[kindStyle.text, sizeStyle.text]}>{title}</Text>}
        {loading ? <Spinner /> : null}
        {icon && (
          <View style={styles.enhancer}>
            <Text style={[kindStyle.text, sizeStyle.text]}>{icon}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
