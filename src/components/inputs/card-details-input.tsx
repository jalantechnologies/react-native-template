import { useTheme } from 'native-base';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { InputStatus, CardDetailsInputProps } from '../../types';

import { useCardDetailsInputStyles } from './input.styles';

const CardDetailsInput: React.FC<CardDetailsInputProps> = ({
  label,
  cardNumber,
  onCardNumberChange,
  expiry,
  onExpiryChange,
  cvv,
  onCvvChange,
  status = InputStatus.DEFAULT,
  errorMessage,
  successMessage,
  disabled = false,
  onValidate,
}) => {
  const theme = useTheme();
  const styles = useCardDetailsInputStyles();

  const expiryRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  const [localStatus, setLocalStatus] = useState(status);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getBorderColor = () => {
    if (disabled) {
        return theme.colors.secondary[200];
    }
    if ((status ? status : localStatus) === InputStatus.ERROR) {
        return theme.colors.danger[500];
    }
    if ((status ? status : localStatus) === InputStatus.SUCCESS) {
        return theme.colors.success[500];
    }
    if (focusedField) {
        return theme.colors.primary[300];
    }
    return theme.colors.secondary[200];
  };

  const handleExpiryInput = (text: string) => {
    let formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length >= 3) {
      formatted = `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}`;
    }
    onExpiryChange(formatted);
  };

  const handleValidation = () => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      setLocalStatus(InputStatus.ERROR);
      setErrorMsg('Enter a valid card number');
      setSuccessMsg('');
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    if (!expiryRegex.test(expiry)) {
      setLocalStatus(InputStatus.ERROR);
      setErrorMsg('Enter expiry in MM/YY format');
      setSuccessMsg('');
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    if (!cvvRegex.test(cvv)) {
      setLocalStatus(InputStatus.ERROR);
      setErrorMsg('CVV must be 3 digits');
      setSuccessMsg('');
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    setLocalStatus(InputStatus.SUCCESS);
    setErrorMsg('');
    setSuccessMsg('Card details are perfect valid');
    const cardData = { cardNumber, expiry, cvv };
    onValidate?.(cardData, InputStatus.SUCCESS);
    console.log('Validated Card Details:', cardData);
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          {
            borderColor: getBorderColor(),
            backgroundColor: disabled ? theme.colors.secondary[100] : theme.colors.secondary[50],
          },
        ]}
      >
        <Icon
          name="credit-card"
          size={18}
          color={disabled ? theme.colors.secondary[400] : theme.colors.black}
        />
        <TextInput
          style={[
            styles.inputField,
            styles.cardInput,
            { color: disabled ? theme.colors.secondary[400] : theme.colors.black },
          ]}
          value={cardNumber}
          onChangeText={onCardNumberChange}
          placeholder="Card Number"
          placeholderTextColor={theme.colors.secondary[400]}
          keyboardType="number-pad"
          editable={!disabled}
          onFocus={() => setFocusedField('card')}
          onBlur={() => setFocusedField(null)}
          returnKeyType="next"
          onSubmitEditing={() => expiryRef.current?.focus()}
        />

        <TextInput
          ref={expiryRef}
          style={[
            styles.inputField,
            styles.expiryInput,
            { color: disabled ? theme.colors.secondary[400] : theme.colors.black },
          ]}
          value={expiry}
          onChangeText={handleExpiryInput}
          placeholder="MM/YY"
          placeholderTextColor={theme.colors.secondary[400]}
          keyboardType="number-pad"
          editable={!disabled}
          onFocus={() => setFocusedField('expiry')}
          onBlur={() => setFocusedField(null)}
          returnKeyType="next"
          onSubmitEditing={() => cvvRef.current?.focus()}
        />

        <TextInput
          ref={cvvRef}
          style={[
            styles.inputField,
            styles.cvvInput,
            { color: disabled ? theme.colors.secondary[400] : theme.colors.black },
          ]}
          value={cvv}
          onChangeText={onCvvChange}
          placeholder="CVV"
          placeholderTextColor={theme.colors.secondary[400]}
          keyboardType="number-pad"
          editable={!disabled}
          maxLength={3}
          onFocus={() => setFocusedField('cvv')}
          onBlur={() => setFocusedField(null)}
          returnKeyType="done"
          onSubmitEditing={handleValidation}
        />
      </View>

      {status === InputStatus.ERROR && !!errorMessage && (
        <Text style={{ color: theme.colors.danger[500], fontSize: 12, marginTop: 4 }}>
          {errorMessage ? errorMessage : errorMsg}
        </Text>
      )}

      {status === InputStatus.SUCCESS && !!successMessage && (
        <Text style={{ color: theme.colors.success[500], fontSize: 12, marginTop: 4 }}>
          {successMessage ? successMessage : successMsg}
        </Text>
      )}
    </View>
  );
};

export default CardDetailsInput;
