import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import type { CardTitleProps } from './types';

/**
 * CardTitle Component - Displays the main title of the Card.
 */
const CardTitle: React.FC<PropsWithChildren<CardTitleProps>> = ({ children }) => {
  return <Text>{children}</Text>;
};

export default CardTitle;
