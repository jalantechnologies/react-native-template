import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface FormControlProps {
  error?: string;
  label?: string;
}

const FormControl: React.FC<PropsWithChildren<FormControlProps>> = ({ children, error, label }) => {
  const theme = useTheme();
  const spacing = (theme as any).spacing;
  const fontSizes = (theme as any).fonts?.fontSize;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.sm,
    },
    label: {
      marginBottom: spacing.xs,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    inputContainer: {
      justifyContent: 'center',
    },
    error: {
      color: theme.colors.errorContainer || theme.colors.error,
      fontSize: fontSizes?.xs,
      marginTop: spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text variant="labelLarge" style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>{children}</View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

FormControl.defaultProps = {
  error: undefined,
  label: undefined,
};

export default FormControl;
