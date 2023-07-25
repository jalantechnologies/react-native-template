import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ErrorFallback: React.FC = () => {
  return (
    <SafeAreaView>
      <Text>Oops!</Text>
      <Text>Something went wrong.</Text>
    </SafeAreaView>
  );
};

export default ErrorFallback;
