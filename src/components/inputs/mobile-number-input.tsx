import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { InputStatus, MobileNumberInputProps } from '../../types';

import DropdownInput from './dropdown-input';
import { useMobileInputStyles } from './input.styles';

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  label,
  country,
  onCountryChange,
  mobileNumber,
  onMobileNumberChange,
  status = InputStatus.DEFAULT,
  errorMessage,
  successMessage,
  disabled = false,
  countryOptions,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const styles = useMobileInputStyles();

  const getBorderColor = () => {
    if (disabled) {
      return theme.colors.secondary[200];
    }
    if (status === InputStatus.ERROR) {
      return theme.colors.danger[500];
    }
    if (status === InputStatus.SUCCESS) {
      return theme.colors.success[500];
    }
    if (isFocused) {
      return theme.colors.primary[300];
    }
    return theme.colors.secondary[200];
  };

  const selectedCountry = countryOptions.find(option => option.value === country);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          { backgroundColor: disabled ? theme.colors.secondary[100] : theme.colors.secondary[50] },
        ]}
      >
        <View style={styles.dropdownContainer}>
          <DropdownInput
            value={selectedCountry ? selectedCountry.label : ''}
            onValueChange={onCountryChange}
            status={InputStatus.DEFAULT}
            disabled={disabled}
          >
            {countryOptions.map(option => (
              <DropdownInput.Option value={option.value}>
                {typeof option.label === 'string' ? <Text>{option.label}</Text> : option.label}
              </DropdownInput.Option>
            ))}
          </DropdownInput>
        </View>

        <View style={[styles.inputContainer, { borderColor: getBorderColor() }]}>
          <TextInput
            style={[
              styles.inputField,
              {
                color: disabled ? theme.colors.secondary[500] : theme.colors.black,
              },
            ]}
            value={mobileNumber}
            onChangeText={onMobileNumberChange}
            placeholder="Mobile Number"
            placeholderTextColor={theme.colors.secondary[400]}
            keyboardType="phone-pad"
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>

      {status === InputStatus.ERROR && !!errorMessage && (
        <Text style={[styles.message, { color: theme.colors.danger[500] }]}>{errorMessage}</Text>
      )}

      {status === InputStatus.SUCCESS && !!successMessage && (
        <Text style={[styles.message, { color: theme.colors.success[500] }]}>{successMessage}</Text>
      )}
    </View>
  );
};

export default MobileNumberInput;
