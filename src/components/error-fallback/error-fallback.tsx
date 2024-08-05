import { Box, Heading } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorFallback: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box safeArea h="100%" w="100%" justifyContent="center" alignItems="center">
      <Heading size={'md'}>{t('error:oops')}!</Heading>
      <Heading size={'sm'}>{t('error:somethingWrong')}</Heading>
    </Box>
  );
};

export default ErrorFallback;
