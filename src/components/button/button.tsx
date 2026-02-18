import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

interface AppButtonProps extends ButtonProps {
  style?: ViewStyle;
}

const AppButton: React.FC<AppButtonProps> = ({ 
  children, 
  mode = 'contained', 
  style, 
  ...props 
}) => {
  return (
    <Button
      mode={mode}
      style={[styles.button, style]}
      {...props}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default AppButton;
