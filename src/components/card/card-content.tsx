import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import type { CardContentProps } from './types';

/**
 * CardContent Component - Holds the main content of the Card.
 */
const CardContent: React.FC<PropsWithChildren<CardContentProps>> = ({ children }) => {
  return <View>{children}</View>;
};

export default CardContent;
