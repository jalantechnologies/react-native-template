import { Button, useTheme } from 'native-base';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { InputStatus, CardDetailsInputProps, KeyboardTypes } from '../../types';

import { useCardDetailsInputStyles } from './input.styles';

const CARD_NUMBER_MIN_LEN = 13;
const CARD_NUMBER_MAX_LEN = 19;
const EXPIRY_YEAR_DIGITS = 2;
const CVV_DIGITS = 3;
const EXPIRY_SLASH_POS = 2;
const CARD_ICON_SIZE = 16;

const CardDetailsInput: React.FC<CardDetailsInputProps> = ({
  label,
  cardHolderName,
  onCardHolderNameChange,
  cardNumber,
  onCardNumberChange,
  expiry,
  onExpiryChange,
  cvv,
  onCvvChange,
  disabled = false,
  onValidate,
  status,
  errorMessage,
  successMessage,
}) => {
  const theme = useTheme();
  const styles = useCardDetailsInputStyles();

  const expiryRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  const [localStatus, setLocalStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [localErrorMessage, setLocalErrorMessage] = useState('');
  const [activeInputField, setActiveInputField] = useState<string | null>(null);

  const currentStatus = status ?? localStatus;
  const currentErrorMessage = errorMessage ?? localErrorMessage;

  const resetValidation = () => {
    if (status === undefined) {
      setLocalStatus(InputStatus.DEFAULT);
      setLocalErrorMessage('');
    }
  };

  const handleValidatedInputChange =
    (onChange: (value: string) => void, formatter?: (text: string) => string) => (text: string) => {
      resetValidation();
      onChange(formatter ? formatter(text) : text);
    };

  const formatExpiry = (text: string) => {
    const digitsOnly = text.replace(/[^0-9]/g, '');
    return digitsOnly.length > EXPIRY_SLASH_POS
      ? `${digitsOnly.slice(0, EXPIRY_SLASH_POS)}/${digitsOnly.slice(
          EXPIRY_SLASH_POS,
          EXPIRY_SLASH_POS + EXPIRY_YEAR_DIGITS,
        )}`
      : digitsOnly;
  };

  const getInputBorderColorByStatus = () => {
    if (currentStatus === InputStatus.ERROR) {
      return theme.colors.danger[500];
    }
    if (activeInputField) {
      return theme.colors.primary[300];
    }
    return theme.colors.secondary[900];
  };

  const setValidationError = (message: string) => {
    if (!status) {
      setLocalStatus(InputStatus.ERROR);
      setLocalErrorMessage(message);
    }
    onValidate?.('', InputStatus.ERROR);
  };

  const validateCardDetails = () => {
    const cardExpiryFormat = new RegExp(`^(0[1-9]|1[0-2])/\\d{${EXPIRY_YEAR_DIGITS}}$`);
    const cvvFormat = new RegExp(`^\\d{${CVV_DIGITS}}$`);

    if (!cardHolderName) {
      return setValidationError('Enter the cardholder name');
    }

    if (
      !cardNumber ||
      cardNumber.length < CARD_NUMBER_MIN_LEN ||
      cardNumber.length > CARD_NUMBER_MAX_LEN
    ) {
      return setValidationError('Enter a valid card number');
    }

    if (!cardExpiryFormat.test(expiry)) {
      return setValidationError('Enter expiry in MM/YY format');
    }

    if (!cvvFormat.test(cvv)) {
      return setValidationError('CVV must be 3 digits');
    }

    if (!status) {
      setLocalStatus(InputStatus.SUCCESS);
      setLocalErrorMessage('');
    }

    onValidate?.({ cardHolderName, cardNumber, expiry, cvv }, InputStatus.SUCCESS);
  };

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

      <TextInput
        style={[
          styles.inputField,
          styles.cardHolderInput,
          {
            color: disabled
              ? theme.colors.secondary[500]
              : currentStatus === InputStatus.ERROR
              ? theme.colors.danger[500]
              : theme.colors.secondary[900],
          },
        ]}
        value={cardHolderName}
        onChangeText={handleValidatedInputChange(onCardHolderNameChange)}
        placeholder="Cardholder Name"
        placeholderTextColor={disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]}
        keyboardType={KeyboardTypes.DEFAULT}
        editable={!disabled}
        onFocus={() => setActiveInputField('name')}
        onBlur={() => setActiveInputField(null)}
        returnKeyType="next"
      />

      <View
        style={[
          styles.container,
          {
            borderColor: getInputBorderColorByStatus(),
            backgroundColor: disabled ? theme.colors.secondary[50] : theme.colors.white,
          },
        ]}
      >
        <Icon name="credit-card" size={CARD_ICON_SIZE} />

        <TextInput
          style={[styles.inputField, styles.cardInput]}
          value={cardNumber}
          onChangeText={handleValidatedInputChange(onCardNumberChange)}
          placeholder="Card Number"
          placeholderTextColor={
            disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
          }
          keyboardType={KeyboardTypes.NUMBER_PAD}
          editable={!disabled}
          onFocus={() => setActiveInputField('card')}
          onBlur={() => setActiveInputField(null)}
          returnKeyType="next"
          onSubmitEditing={() => expiryRef.current?.focus()}
          maxLength={CARD_NUMBER_MAX_LEN}
        />

        <TextInput
          ref={expiryRef}
          style={[styles.inputField, styles.expiryInput]}
          value={expiry}
          onChangeText={handleValidatedInputChange(onExpiryChange, formatExpiry)}
          placeholder="MM/YY"
          placeholderTextColor={
            disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
          }
          keyboardType={KeyboardTypes.NUMBER_PAD}
          editable={!disabled}
          onFocus={() => setActiveInputField('expiry')}
          onBlur={() => setActiveInputField(null)}
          returnKeyType="next"
          onSubmitEditing={() => cvvRef.current?.focus()}
        />

        <TextInput
          ref={cvvRef}
          style={[styles.inputField, styles.cvvInput]}
          value={cvv}
          onChangeText={handleValidatedInputChange(onCvvChange)}
          placeholder="CVV"
          placeholderTextColor={
            disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
          }
          keyboardType={KeyboardTypes.NUMBER_PAD}
          editable={!disabled}
          maxLength={CVV_DIGITS}
          onFocus={() => setActiveInputField('cvv')}
          onBlur={() => setActiveInputField(null)}
          returnKeyType="done"
          onSubmitEditing={validateCardDetails}
        />
      </View>

      <Button onPress={validateCardDetails} isDisabled={disabled} size="md" mt={3}>
        Validate Card
      </Button>

      {currentStatus === InputStatus.ERROR && currentErrorMessage && (
        <Text style={[styles.message, { color: theme.colors.danger[500] }]}>
          {currentErrorMessage}
        </Text>
      )}

      {currentStatus === InputStatus.SUCCESS && successMessage && (
        <Text style={[styles.message, { color: theme.colors.success[500] }]}>{successMessage}</Text>
      )}
    </View>
  );
};

export default CardDetailsInput;
