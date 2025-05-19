import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { HeadingLargeStyles as styles } from './typography.styles';

const HeadingLarge: React.FC<PropsWithChildren> = ({ children }) => (
  <Text style={styles.heading}>{children}</Text>
);

export default HeadingLarge;
