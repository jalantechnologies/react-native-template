import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';

const ErrorFallback: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  return (
    <SafeAreaView>
      <View style={styles.errorContainer}>
        <Text h2>{t('error:oops')}!</Text>
        <Text h3>{t('error:somethingWrong')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorFallback;
