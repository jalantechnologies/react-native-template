import React, { PropsWithChildren } from 'react';
import { Box, Heading } from 'native-base';

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
    <Box safeArea flex={1} bg={'primary'}>
      <Box py={'15%'} px={'10%'} fontWeight={'bold'} alignSelf={'flex-start'}>
        <Heading size="2xl" color={'white'}>
          {primaryTitle}
        </Heading>
        <Heading size="2xl" color={'white'}>
          {secondaryTitle}
        </Heading>
      </Box>
      <Box py="8" px="10%" w="100%" flex={1} bg={'white'} roundedTop="lg">
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
