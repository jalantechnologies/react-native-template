import { Box } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { useCardStyles } from './card.styles';

export const CardActions: React.FC<PropsWithChildren> = ({ children }) => {
  const styles = useCardStyles();
  return <Box style={[styles.actions]}>{children}</Box>;
};

export default CardActions;
