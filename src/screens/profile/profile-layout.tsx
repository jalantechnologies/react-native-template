import { Box } from 'native-base';
import React, { PropsWithChildren } from 'react';

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box flex={1} bg={'white'} p={4}>
      {children}
    </Box>
  );
};

export default ProfileLayout;
