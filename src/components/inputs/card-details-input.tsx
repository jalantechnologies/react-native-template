import { useTheme } from 'native-base';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from 'native-base';


import { InputStatus, CardDetailsInputProps, KeyboardTypes } from '../../types';
import { useCardDetailsInputStyles } from './input.styles';

const CardDetailsInput: React.FC<CardDetailsInputProps> = ({
  label,
  cardNumber,
  onCardNumberChange,
  expiry,
  onExpiryChange,
  cvv,
  onCvvChange,
  status,
  errorMessage,
  successMessage,
  disabled = false,
  onValidate,
}) => {
  const theme = useTheme();
  const styles = useCardDetailsInputStyles();

  const expiryRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);
  const cardNameRef = useRef<TextInput>(null);

  const [localStatus, setLocalStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [localErrorMessage, setLocalErrorMessage] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const currentStatus = status !== undefined ? status : localStatus;
  const currentErrorMessage = errorMessage !== undefined ? errorMessage : localErrorMessage;

  const getBorderColor = () => {
    if (currentStatus === InputStatus.ERROR) return theme.colors.danger[500];
    if (focusedField) return theme.colors.primary[300];
    return theme.colors.secondary[200];
  };

  const resetValidation = () => {
    if (status === undefined) {
      setLocalStatus(InputStatus.DEFAULT);
      setLocalErrorMessage('');
    }
  };

  const handleCardHolderNameChange = (text: string) => {
    resetValidation();
    setCardHolderName(text);
  };

  const handleCardNumberChange = (text: string) => {
    resetValidation();
    onCardNumberChange(text);
  };

  const handleExpiryInput = (text: string) => {
    resetValidation();
    let formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length >= 3) {
      formatted = `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}`;
    }
    onExpiryChange(formatted);
  };

  const handleCvvChange = (text: string) => {
    resetValidation();
    onCvvChange(text);
  };

  const handleValidation = () => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardHolderName || cardHolderName.trim().length === 0) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('Enter the cardholder name');
      }
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('Enter a valid card number');
      }
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    if (!expiryRegex.test(expiry)) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('Enter expiry in MM/YY format');
      }
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    if (!cvvRegex.test(cvv)) {
      if (status === undefined) {
        setLocalStatus(InputStatus.ERROR);
        setLocalErrorMessage('CVV must be 3 digits');
      }
      onValidate?.('', InputStatus.ERROR);
      return;
    }

    if (status === undefined) {
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
          placeholderTextColor={disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]}
          keyboardType={KeyboardTypes.NUMBER_PAD}
          editable={!disabled}
          onFocus={() => setFocusedField('card')}
          onBlur={() => setFocusedField(null)}
          returnKeyType="next"
          onSubmitEditing={() => expiryRef.current?.focus()}
          numberOfLines={1}
          multiline={false}
          maxLength={19}
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
          placeholderTextColor={disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]}
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
          placeholderTextColor={disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]}
          keyboardType={KeyboardTypes.NUMBER_PAD}
          editable={!disabled}
          maxLength={3}
          onFocus={() => setFocusedField('cvv')}
          onBlur={() => setFocusedField(null)}
          returnKeyType="done"
          onSubmitEditing={handleValidation}
        />
      </View>

      
      <Button
        onPress={handleValidation}
        isDisabled={disabled}
        size="md"
        mt={3}
      >
      Validate Card
    </Button>


      {currentStatus === InputStatus.ERROR && !!currentErrorMessage && (
        <Text style={[styles.message, { color: theme.colors.danger[500] }]}>{currentErrorMessage}</Text>
      )}

      {currentStatus === InputStatus.SUCCESS && !!successMessage && (
        <Text style={[styles.message, { color: theme.colors.success[500] }]}>{successMessage}</Text>
      )}
    </View>
  );
};

export default CardDetailsInput;
