import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from './styles';

const ErrorFallback: React.FC = () => {
  const styles = useStyles();
  return (
    <SafeAreaView>
      <View style={styles.errorContainer}>
        <Text h2>Oops!</Text>
        <Text h3>Something went wrong.</Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorFallback;
