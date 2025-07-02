import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { InputStatus, KeyboardTypes, MobileNumberInputProps } from '../../types';

import DropdownInput from './dropdown-input';
import { useMobileInputStyles } from './input.styles';

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  label,
  country,
  onCountryChange,
  mobileNumber,
  onMobileNumberChange,
  onValidate,
  status,
  errorMessage,
  successMessage,
  disabled = false,
  countryOptions,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [localStatus, setLocalStatus] = useState(InputStatus.DEFAULT);
  const [localErrorMessage, setLocalErrorMessage] = useState('');

  const styles = useMobileInputStyles();

  const currentStatus = status !== undefined ? status : localStatus;
  const currentErrorMessage = status !== undefined ? errorMessage : localErrorMessage;

  const resetValidation = () => {
    if (status === undefined) {
      setLocalStatus(InputStatus.DEFAULT);
      setLocalErrorMessage('');
    }
  };

  const handleValidation = () => {
    if (!mobileNumber || mobileNumber.length < 7 || mobileNumber.length > 15) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('Enter a valid mobile number');
      }
      onValidate?.('', InputStatus.ERROR);
    } else {
      if (status === undefined) {
        setLocalStatus(InputStatus.SUCCESS);
      }
      const finalNumber = selectedCountry?.value + mobileNumber;
      onValidate?.(finalNumber, InputStatus.SUCCESS);
    }
  };

  const getBorderColor = () => {
    if (currentStatus === InputStatus.ERROR) {
      return theme.colors.danger[500];
    }
    if (isFocused) {
      return theme.colors.primary[300];
    }
    return theme.colors.secondary[200];
  };

  const selectedCountry = countryOptions.find(option => option.value === country);

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: disabled ? theme.colors.secondary[500] : theme.colors.secondary[900] },
          ]}
        >
          {label}
        </Text>
      )}

      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <DropdownInput
            value={selectedCountry ? selectedCountry.label : ''}
            onValueChange={onCountryChange}
            status={InputStatus.DEFAULT}
            disabled={disabled}
          >
            {countryOptions.map(option => (
              <DropdownInput.Option key={label} value={option.value}>
                {typeof option.label === 'string' ? (
                  <Text
                    style={{
                      color: disabled ? theme.colors.secondary[500] : theme.colors.secondary[900],
                    }}
                  >
                    {option.label}
                  </Text>
                ) : (
                  option.label
                )}
              </DropdownInput.Option>
            ))}
          </DropdownInput>
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              borderColor: getBorderColor(),
              backgroundColor: disabled ? theme.colors.secondary[50] : theme.colors.white,
            },
          ]}
        >
          <TextInput
            style={[
              styles.text,
              {
                color: disabled
                  ? theme.colors.secondary[500]
                  : currentStatus === InputStatus.ERROR
                  ? theme.colors.danger[800]
                  : theme.colors.secondary[900],
              },
            ]}
            value={mobileNumber}
            onChangeText={text => {
              resetValidation();
              onMobileNumberChange(text);
            }}
            placeholder="Mobile Number"
            placeholderTextColor={
              disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
            }
            keyboardType={KeyboardTypes.PHONE_PAD}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleValidation}
            maxLength={15}
          />
        </View>
      </View>

      {currentStatus === InputStatus.ERROR && !!currentErrorMessage && (
        <Text style={[styles.message, { color: theme.colors.danger[500] }]}>
          {currentErrorMessage}
        </Text>
      )}

      {currentStatus === InputStatus.SUCCESS && !!successMessage && (
        <Text style={[styles.message, { color: theme.colors.success[500] }]}>{successMessage}</Text>
      )}
    </View>
  );
};

export default MobileNumberInput;
