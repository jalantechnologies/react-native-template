import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { HeadingMediumStyles as styles } from './typography.styles';

const HeadingMedium: React.FC<PropsWithChildren> = ({ children }) => (
  <Text style={styles.heading}>{children}</Text>
);

export default HeadingMedium;
