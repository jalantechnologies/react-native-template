import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { HeadingSmallStyles as styles } from './typography.styles';

const HeadingSmall: React.FC<PropsWithChildren> = ({ children }) => (
  <Text style={styles.heading}>{children}</Text>
);

export default HeadingSmall;
