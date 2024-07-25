import React, { PropsWithChildren } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Box, Heading, ScrollView, KeyboardAvoidingView } from 'native-base';

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
          <Box flex={1} bg={'primary'}>
            <Box py={'15%'} px={'10%'} fontWeight={'bold'} alignSelf={'flex-start'}>
              <Heading size="2xl">{primaryTitle}</Heading>
              <Heading size="2xl">{secondaryTitle}</Heading>
            </Box>
            <Box py="8" px="10%" w="100%" flex={1} bg={'white'} roundedTop="lg">
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
