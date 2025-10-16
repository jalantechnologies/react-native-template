import React, { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { CardDetailsInputProps, CardValidationResult, InputStatus, KeyboardTypes } from '../../types';

import { useCardDetailsInputStyles } from './input.styles';

const CARD_ICON_SIZE = 16;
const CARD_NUMBER_MAX_LEN = 19;
const CARD_NUMBER_MIN_LEN = 13;
const CVV_DIGITS = 3;
const EXPIRY_SLASH_POS = 2;
const EXPIRY_YEAR_DIGITS = 2;

const CardDetailsInput: React.FC<CardDetailsInputProps> = ({
  cardHolderName,
  cardNumber,
  cvv,
  disabled = false,
  errorMessage,
  expiry,
  label,
  onCardHolderNameChange,
  onCardNumberChange,
  onCvvChange,
  onExpiryChange,
  onValidate,
  status,
  successMessage,
}) => {
  const theme = useTheme();
  const styles = useCardDetailsInputStyles();

  const cvvRef = useRef<TextInput>(null);
  const expiryRef = useRef<TextInput>(null);

  const [activeInputField, setActiveInputField] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [localErrorMessage, setLocalErrorMessage] = useState('');
  const [localStatus, setLocalStatus] = useState<InputStatus>(InputStatus.DEFAULT);

  const currentErrorMessage = errorMessage ?? localErrorMessage;
  const currentStatus = status ?? localStatus;
  const isExternallyControlled = status !== undefined;

  const formatExpiryWithSlash = (text: string): string => {
    const digitsOnly = text.replace(/[^0-9]/g, '');
    const hasEnoughDigitsForSlash = digitsOnly.length > EXPIRY_SLASH_POS;

    if (hasEnoughDigitsForSlash) {
      const monthPart = digitsOnly.slice(0, EXPIRY_SLASH_POS);
      const yearPart = digitsOnly.slice(EXPIRY_SLASH_POS, EXPIRY_SLASH_POS + EXPIRY_YEAR_DIGITS);
      return `${monthPart}/${yearPart}`;
    }

    return digitsOnly;
  };

  const getBorderColor = (fieldName: string): string => {
    if (currentStatus === InputStatus.ERROR && errorField === fieldName) {
      return theme.colors.danger[500];
    }

    if (activeInputField === fieldName) {
      return theme.colors.primary[300];
    }

    return theme.colors.secondary[200];
  };

  const getCardContainerBorderColor = (): string => {
    const cardFields = ['card', 'expiry', 'cvv'];
    const hasCardFieldError = currentStatus === InputStatus.ERROR && errorField && cardFields.includes(errorField);

    if (hasCardFieldError) {
      return theme.colors.danger[500];
    }

    if (activeInputField && cardFields.includes(activeInputField)) {
      return theme.colors.primary[300];
    }

    return theme.colors.secondary[200];
  };

  const getDisabledColor = (): string => theme.colors.secondary[500];

  const getPlaceholderColor = (): string => {
    return disabled ? getDisabledColor() : theme.colors.secondary[600];
  };

  const getTextColor = (fieldName: string): string => {
    if (disabled) {
      return getDisabledColor();
    }

    if (currentStatus === InputStatus.ERROR && errorField === fieldName) {
      return theme.colors.danger[500];
    }

    return theme.colors.secondary[900];
  };

  const handleInputChange =
    (onChange: (value: string) => void, formatter?: (text: string) => string) =>
    (text: string) => {
      if (!isExternallyControlled) {
        setLocalStatus(InputStatus.DEFAULT);
        setLocalErrorMessage('');
        setErrorField(null);
      }

      const formattedValue = formatter ? formatter(text) : text;
      onChange(formattedValue);
    };

  const setValidationError = (fieldName: string, message: string): void => {
    if (!isExternallyControlled) {
      setLocalStatus(InputStatus.ERROR);
      setLocalErrorMessage(message);
      setErrorField(fieldName);
    }
    onValidate?.(null, InputStatus.ERROR);
  };

  const validateCardDetails = (): void => {
    const expiryDateRegex = new RegExp(`^(0[1-9]|1[0-2])/\\d{${EXPIRY_YEAR_DIGITS}}$`);
    const cvvRegex = new RegExp(`^\\d{${CVV_DIGITS}}$`);

    const isCardHolderNameEmpty = !cardHolderName;
    if (isCardHolderNameEmpty) {
      return setValidationError('name', 'Enter the cardholder name');
    }

    const isCardNumberEmpty = !cardNumber;
    const isCardNumberTooShort = cardNumber.length < CARD_NUMBER_MIN_LEN;
    const isCardNumberTooLong = cardNumber.length > CARD_NUMBER_MAX_LEN;
    const isCardNumberInvalid = isCardNumberEmpty || isCardNumberTooShort || isCardNumberTooLong;

    if (isCardNumberInvalid) {
      return setValidationError('card', 'Enter a valid card number');
    }

    const isExpiryInvalid = !expiryDateRegex.test(expiry);
    if (isExpiryInvalid) {
      return setValidationError('expiry', 'Enter expiry in MM/YY format');
    }

    const isCvvInvalid = !cvvRegex.test(cvv);
    if (isCvvInvalid) {
      return setValidationError('cvv', 'CVV must be 3 digits');
    }

    if (!isExternallyControlled) {
      setLocalStatus(InputStatus.SUCCESS);
      setLocalErrorMessage('');
      setErrorField(null);
    }

    const validCardData: CardValidationResult = {
      cardHolderName,
      cardNumber,
      cvv,
      expiry,
    };
    onValidate?.(validCardData, InputStatus.SUCCESS);
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.secondary[900] }]}>
          {label}
        </Text>
      )}

      <TextInput
        editable={!disabled}
        keyboardType={KeyboardTypes.DEFAULT}
        onBlur={() => setActiveInputField(null)}
        onChangeText={handleInputChange(onCardHolderNameChange)}
        onFocus={() => setActiveInputField('name')}
        placeholder="Cardholder Name"
        placeholderTextColor={getPlaceholderColor()}
        returnKeyType="next"
        style={[
          styles.cardHolderInput,
          styles.inputField,
          {
            borderColor: getBorderColor('name'),
            color: getTextColor('name'),
          },
        ]}
        value={cardHolderName}
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor: disabled ? theme.colors.secondary[50] : theme.colors.white,
            borderColor: getCardContainerBorderColor(),
          },
        ]}
      >
        <Icon name="credit-card" size={CARD_ICON_SIZE} />

        <TextInput
          editable={!disabled}
          keyboardType={KeyboardTypes.NUMBER_PAD}
          maxLength={CARD_NUMBER_MAX_LEN}
          onBlur={() => setActiveInputField(null)}
          onChangeText={handleInputChange(onCardNumberChange)}
          onFocus={() => setActiveInputField('card')}
          onSubmitEditing={() => expiryRef.current?.focus()}
          placeholder="Card Number"
          placeholderTextColor={getPlaceholderColor()}
          returnKeyType="next"
          style={[styles.cardInput, styles.inputField, { color: getTextColor('card') }]}
          value={cardNumber}
        />

        <TextInput
          editable={!disabled}
          keyboardType={KeyboardTypes.NUMBER_PAD}
          onBlur={() => setActiveInputField(null)}
          onChangeText={handleInputChange(onExpiryChange, formatExpiryWithSlash)}
          onFocus={() => setActiveInputField('expiry')}
          onSubmitEditing={() => cvvRef.current?.focus()}
          placeholder="MM/YY"
          placeholderTextColor={getPlaceholderColor()}
          ref={expiryRef}
          returnKeyType="next"
          style={[styles.expiryInput, styles.inputField, { color: getTextColor('expiry') }]}
          value={expiry}
        />

        <TextInput
          editable={!disabled}
          keyboardType={KeyboardTypes.NUMBER_PAD}
          maxLength={CVV_DIGITS}
          onBlur={() => setActiveInputField(null)}
          onChangeText={handleInputChange(onCvvChange)}
          onFocus={() => setActiveInputField('cvv')}
          onSubmitEditing={validateCardDetails}
          placeholder="CVV"
          placeholderTextColor={getPlaceholderColor()}
          ref={cvvRef}
          returnKeyType="done"
          style={[styles.cvvInput, styles.inputField, { color: getTextColor('cvv') }]}
          value={cvv}
        />
      </View>

      <Button isDisabled={disabled} mt={3} onPress={validateCardDetails} size="md">
        Validate Card
      </Button>

      {currentStatus === InputStatus.ERROR && currentErrorMessage && (
        <Text style={[styles.message, { color: theme.colors.danger[500] }]}>
          {currentErrorMessage}
        </Text>
      )}

      {currentStatus === InputStatus.SUCCESS && successMessage && (
        <Text style={[styles.message, { color: theme.colors.success[500] }]}>
          {successMessage}
        </Text>
      )}
    </View>
  );
};

export default CardDetailsInput;

