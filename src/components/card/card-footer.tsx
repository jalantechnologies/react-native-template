import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import type { CardFooterProps } from './types';

/**
 * CardFooter Component - Used for action buttons or additional footer content.
 */
const CardFooter: React.FC<PropsWithChildren<CardFooterProps>> = ({ children }) => {
  return <View>{children}</View>;
};

export default CardFooter;
