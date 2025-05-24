import { TypographyProps } from 'boilerplate-react-native/src/types/typography';
import { Text } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { HeadingLargeStyles as styles } from './typography.styles';

const HeadingLarge: React.FC<PropsWithChildren<TypographyProps>> = ({ children, color }) => (
  <Text style={styles.heading} color={color}>
    {children}
  </Text>
);

export default HeadingLarge;
