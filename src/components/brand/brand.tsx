import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const Brand = () => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.primary }]}>
        BOILERPLATE
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
  },
});

export default Brand;
