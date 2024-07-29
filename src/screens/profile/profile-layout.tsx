import React, { PropsWithChildren } from 'react';
import { Box } from 'native-base';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box flex={1} bg={'white'} p={4}>
      {children}
    </Box>
  );
};

export default ProfileLayout;
