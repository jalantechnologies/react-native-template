import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { Brand } from '../../components';

const Startup: React.FC<ApplicationScreenProps> = ({ navigation }: ApplicationScreenProps) => {
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Brand />
      <ActivityIndicator size="large" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loader: {
    marginTop: 20,
  },
});

export default Startup;
