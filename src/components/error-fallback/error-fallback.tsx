import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import tw from '../../lib/tailwind';

const ErrorFallback: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View style={tw`justify-center items-center w-full h-full`}>
        <Text h2>{t('error:oops')}!</Text>
        <Text h3>{t('error:somethingWrong')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorFallback;
