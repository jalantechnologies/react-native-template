import { Box } from 'native-base';
import React, { PropsWithChildren } from 'react';

export const CardContent: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default CardContent;
