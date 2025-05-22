import { Box, IPressableProps, Pressable } from 'native-base';
import React from 'react';

export const CardActionArea: React.FC<IPressableProps> = ({ children, ...rest }) => {
  return (
    <Pressable {...rest}>
      <Box>{children}</Box>
    </Pressable>
  );
};

export default CardActionArea;
