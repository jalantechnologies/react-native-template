import { useTheme } from 'native-base';
import { Button } from 'native-base';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { InputStatus, CardDetailsInputProps, KeyboardTypes } from '../../types';

import { useCardDetailsInputStyles } from './input.styles';

// constants for validation
const cardNumberMinLen = 13;
const cardNumberMaxLen = 19;
const expiryYearDigits = 2;
const cvvLength = 3;

// main card details component
const CardDetailsInput: React.FC<CardDetailsInputProps> = ({
  cardHolderName,
  onCardHolderNameChange,
  cardNumber,
  onCardNumberChange,
  expiry,
  onExpiryChange,
  cvv,
  onCvvChange,
  disabled = false,
  label,
  status,
  errorMessage,
  successMessage,
  onValidate,
}) => {
  const theme = useTheme();
  const styles = useCardDetailsInputStyles();

  const expiryRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);
  const cardNameRef = useRef<TextInput>(null);

  // Local states for validation & focus
  const [localStatus, setLocalStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [localErrorMessage, setLocalErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const currentStatus = status !== undefined ? status : localStatus;
  const currentErrorMessage = errorMessage !== undefined ? errorMessage : localErrorMessage;

  // hange border color based on status/focus
  const getBorderColor = () => {
    if (currentStatus === InputStatus.ERROR) {
      return theme.colors.danger[500];
    }
    if (focusedField) {
      return theme.colors.primary[300];
    }
    return theme.colors.secondary[200];
  };

  // reset validation when typing
  const resetValidation = () => {
    if (status === undefined) {
      setLocalStatus(InputStatus.DEFAULT);
      setLocalErrorMessage('');
    }
  };

  // Handlers for each field
  const handleCardHolderNameChange = (text: string) => {
    resetValidation();
    onCardHolderNameChange(text);
  };

  const handleCardNumberChange = (text: string) => {
    resetValidation();
    onCardNumberChange(text);
  };

  // Auto-add "/" for expiry input after 2 digits (MM/YY format)
  const EXPIRY_SLASH_POSITION = 2;
  const handleExpiryInput = (text: string) => {
    resetValidation();
    let formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length >= 3) {
      formatted = `${formatted.substring(0, EXPIRY_SLASH_POSITION)}/${formatted.substring(
        EXPIRY_SLASH_POSITION,
        EXPIRY_SLASH_POSITION + 2,
      )}`;
    }
    onExpiryChange(formatted);
  };

  const handleCvvChange = (text: string) => {
    resetValidation();
    onCvvChange(text);
  };

  // Final Validation before submitting
  const handleValidation = () => {
    const expiryRegex = new RegExp(`^(0[1-9]|1[0-2])/\\d{${expiryYearDigits}}$`); // matches MM/YY
    const cvvRegex = new RegExp(`^\\d{${cvvLength}}$`); // matches 3-digit CVV

    // Validate Cardholder Name
    if (!cardHolderName || cardHolderName.trim().length === 0) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('Enter the cardholder name');
      }
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    // Validate Card Number length
    if (
      !cardNumber ||
      cardNumber.length < cardNumberMinLen ||
      cardNumber.length > cardNumberMaxLen
    ) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('Enter a valid card number');
      }
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    // Validate Expiry Date format
    if (!expiryRegex.test(expiry)) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('Enter expiry in MM/YY format');
      }
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    // Validate CVV
    if (!cvvRegex.test(cvv)) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('CVV must be 3 digits');
      }
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    // If all validations pass
    if (status === undefined) {
      setLocalStatus(InputStatus.SUCCESS);
      setLocalErrorMessage('');
    }

    // Send success response to parent form
    onValidate?.({ cardHolderName, cardNumber, expiry, cvv }, InputStatus.SUCCESS);
  };

  // UI rendering
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

      {/* Cardholder Name Input */}
      <TextInput
        ref={cardNameRef}
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
        onChangeText={handleCardHolderNameChange}
        placeholder="Cardholder Name"
        placeholderTextColor={disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]}
        keyboardType={KeyboardTypes.DEFAULT}
        editable={!disabled}
        onFocus={() => setFocusedField('name')}
        onBlur={() => setFocusedField(null)}
        returnKeyType="next"
      />

      {/* Card Details Container */}
      <View
        style={[
          styles.container,
          {
            borderColor: getBorderColor(),
            backgroundColor: disabled ? theme.colors.secondary[50] : theme.colors.white,
          },
        ]}
      >
        <Icon name="credit-card" size={16} />

        <TextInput
          style={[
            styles.inputField,
            styles.cardInput,
            {
              color: disabled
                ? theme.colors.secondary[500]
                : currentStatus === InputStatus.ERROR
                ? theme.colors.danger[800]
                : theme.colors.secondary[900],
            },
          ]}
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          placeholder="Card Number"
          placeholderTextColor={
            disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
          }
          keyboardType={KeyboardTypes.NUMBER_PAD}
          editable={!disabled}
          onFocus={() => setFocusedField('card')}
          onBlur={() => setFocusedField(null)}
          returnKeyType="next"
          onSubmitEditing={() => expiryRef.current?.focus()}
          numberOfLines={1}
          multiline={false}
          maxLength={cardNumberMaxLen}
        />

        <TextInput
          ref={expiryRef}
          style={[
            styles.inputField,
            styles.expiryInput,
            {
              color: disabled
                ? theme.colors.secondary[500]
                : currentStatus === InputStatus.ERROR
                ? theme.colors.danger[500]
                : theme.colors.secondary[900],
            },
          ]}
          value={expiry}
          onChangeText={handleExpiryInput}
          placeholder="MM/YY"
          placeholderTextColor={
            disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
          }
          keyboardType={KeyboardTypes.NUMBER_PAD}
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
            {
              color: disabled
                ? theme.colors.secondary[500]
                : currentStatus === InputStatus.ERROR
                ? theme.colors.danger[500]
                : theme.colors.secondary[900],
            },
          ]}
          value={cvv}
          onChangeText={handleCvvChange}
          placeholder="CVV"
          placeholderTextColor={
            disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
          }
          keyboardType={KeyboardTypes.NUMBER_PAD}
          editable={!disabled}
          maxLength={cvvLength}
          onFocus={() => setFocusedField('cvv')}
          onBlur={() => setFocusedField(null)}
          returnKeyType="done"
          onSubmitEditing={handleValidation}
        />
      </View>

      <Button onPress={handleValidation} isDisabled={disabled} size="md" mt={3}>
        Validate Card
      </Button>

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

export default CardDetailsInput;
