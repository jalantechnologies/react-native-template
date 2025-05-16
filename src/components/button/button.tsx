import appTheme from 'boilerplate-react-native/src/app-theme';
import { ButtonKind, ButtonSize } from 'boilerplate-react-native/src/types/button';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { styles } from './button.styles';
interface ButtonProps {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (event: GestureResponderEvent) => void;
  size?: ButtonSize;
  startEnhancer?: React.ReactElement | string;
  children: React.ReactNode;
}

const kindStyles: Record<
  ButtonKind,
  { base: ViewStyle; disabled: ViewStyle; enabled: ViewStyle; text: TextStyle }
> = {
  [ButtonKind.PRIMARY]: {
    base: { backgroundColor: appTheme.colors.primary, borderRadius: 8 },
    enabled: { opacity: 1 },
    disabled: { opacity: 0.5 },
    text: { color: '#fff' },
  },
  [ButtonKind.SECONDARY]: {
    base: { backgroundColor: appTheme.colors.secondary, borderRadius: 8 },
    enabled: { opacity: 1 },
    disabled: { opacity: 0.5 },
    text: { color: '#fff' },
  },
  [ButtonKind.TERTIARY]: {
    base: {
      backgroundColor: appTheme.colors.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: appTheme.colors.primary,
    },
    enabled: { opacity: 1 },
    disabled: { opacity: 0.5 },
    text: { color: appTheme.colors.primary },
  },
  [ButtonKind.DANGER]: {
    base: { backgroundColor: appTheme.components.Button.variants.danger.bg, borderRadius: 8 },
    enabled: { opacity: 1 },
    disabled: { opacity: 0.5 },
    text: { color: '#fff' },
  },
};

const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  [ButtonSize.COMPACT]: {
    container: { padding: 8 },
    text: { fontSize: 14 },
  },
  [ButtonSize.DEFAULT]: {
    container: { padding: 10 },
    text: { fontSize: 16 },
  },
  [ButtonSize.LARGE]: {
    container: { padding: 14 },
    text: { fontSize: 18 },
  },
  [ButtonSize.MINI]: {
    container: { padding: 6 },
    text: { fontSize: 12 },
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  endEnhancer = undefined,
  isLoading = false,
  kind = ButtonKind.PRIMARY,
  onClick = undefined,
  size = ButtonSize.DEFAULT,
  startEnhancer = undefined,
}) => {
  const kindStyle = kindStyles[kind];
  const sizeStyle = sizeStyles[size];

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
        {isLoading && kind === ButtonKind.PRIMARY ? (
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
