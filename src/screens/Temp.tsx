import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'native-base';
import CardDetailsInput from '../components/inputs/card-details-input'; // adjust path as needed
import { InputStatus } from '../types';

const TempCardDetailsScreen: React.FC = () => {
  const theme = useTheme();

  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleValidate = (cardData: any, inputStatus: InputStatus) => {
    if (inputStatus === InputStatus.SUCCESS) {
      console.log('Valid Card Data:', cardData);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.secondary[50],
        padding: 20,
      }}
    >
      <View>
        <CardDetailsInput
          label="Enter Card Details"
          cardHolderName={cardHolderName}
          onCardHolderNameChange={setCardHolderName}
          cardNumber={cardNumber}
          onCardNumberChange={setCardNumber}
          expiry={expiry}
          onExpiryChange={setExpiry}
          cvv={cvv}
          onCvvChange={setCvv}
          onValidate={handleValidate}
          successMessage="Card is valid ✅ "
        />
      </View>
    </ScrollView>
  );
};

export default TempCardDetailsScreen;
