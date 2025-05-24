import { TypographyProps } from 'boilerplate-react-native/src/types/typography';
import { Text } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { HeadingMediumStyles as styles } from './typography.styles';

const HeadingMedium: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  color = 'primary.500',
}) => (
  <Text style={styles.heading} color={color}>
    {children}
  </Text>
);

export default HeadingMedium;
