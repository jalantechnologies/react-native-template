import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import type { CardDescriptionProps } from './types';

/**
 * CardDescription Component - Displays a short description below the title.
 */
const CardDescription: React.FC<PropsWithChildren<CardDescriptionProps>> = ({ children }) => {
  return <Text>{children}</Text>;
};

export default CardDescription;
