import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const ErrorFallback: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View className="justify-center items-center w-full h-full">
        <Text h2>{t('error:oops')}!</Text>
        <Text h3>{t('error:somethingWrong')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorFallback;
