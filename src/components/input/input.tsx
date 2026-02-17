import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

interface AppTextInputProps extends TextInputProps {
  errorText?: string;
  containerStyle?: ViewStyle;
}

const AppTextInput: React.FC<AppTextInputProps> = ({ 
  errorText, 
  containerStyle, 
  ...props 
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        mode="outlined"
        error={!!errorText}
        {...props}
      />
      {!!errorText && (
        <HelperText type="error" visible={!!errorText}>
          {errorText}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
});

export default AppTextInput;
