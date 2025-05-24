import React, { useEffect } from 'react';
import { View } from 'react-native';

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
    <View>
      <Brand />
    </View>
  );
};

export default Startup;
