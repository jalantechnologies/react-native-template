import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import CardDetailsInput from '../components/inputs/card-details-input';
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondary[50],
      flexGrow: 1,
      padding: 20,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <CardDetailsInput
          cardHolderName={cardHolderName}
          cardNumber={cardNumber}
          cvv={cvv}
          expiry={expiry}
          label="Enter Card Details"
          onCardHolderNameChange={setCardHolderName}
          onCardNumberChange={setCardNumber}
          onCvvChange={setCvv}
          onExpiryChange={setExpiry}
          onValidate={handleValidate}
          successMessage="Card is valid ✅ "
        />
      </View>
    </ScrollView>
  );
};

export default TempCardDetailsScreen;
