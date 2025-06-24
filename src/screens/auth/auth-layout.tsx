import { Box, Heading, ScrollView, KeyboardAvoidingView } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import ChangeApiUrlButton from './change-api-url/change-api-url';
interface AuthLayoutProps {
  primaryTitle: string;
  secondaryTitle: string;
}

const AuthLayout: React.FC<PropsWithChildren<AuthLayoutProps>> = ({
  primaryTitle,
  secondaryTitle,
  children,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} flex={1}>
        <ScrollView _contentContainerStyle={styles.contentContainerStyle} bounces={false}>
          <Box flex={1} backgroundColor={'primary.500'}>
            <Box pt={'10%'} px={'10%'} fontWeight={'bold'} alignSelf={'flex-start'}>
              <Heading size="3xl" color={'secondary.50'}>
                {primaryTitle}
              </Heading>
              <Heading size="3xl" color={'secondary.50'}>
                {secondaryTitle}
              </Heading>
            </Box>
            <ChangeApiUrlButton />
            <Box py="8" px="10%" w="100%" flex={1} bg={'white'} roundedTop={36}>
              {children}
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  contentContainerStyle: {
    flexGrow: 1,
  },
};

export default AuthLayout;
