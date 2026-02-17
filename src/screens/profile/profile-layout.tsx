import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

export default ProfileLayout;
