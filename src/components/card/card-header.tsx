import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import type { CardHeaderProps } from './types';

/**
 * CardHeader Component - Wraps the header section of the Card.
 */
const CardHeader: React.FC<PropsWithChildren<CardHeaderProps>> = ({ children }) => {
  return <View>{children}</View>;
};

export default CardHeader;
