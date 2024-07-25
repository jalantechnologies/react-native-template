import React, { PropsWithChildren } from 'react';
import { Box, KeyboardAvoidingView } from 'native-base';
import { Platform } from 'react-native';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Box flex={1} bg={'white'} pt={8} px={8} pb={4} justifyContent={'space-between'}>
        {children}
      </Box>
    </KeyboardAvoidingView>
  );
};

export default ProfileLayout;
