import { TypographyProps } from 'boilerplate-react-native/src/types/typography';
import { Text } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { H2Styles as styles } from './typography.styles';

const H2: React.FC<PropsWithChildren<TypographyProps>> = ({ children, color = 'primary.500' }) => (
  <Text color={color} style={styles.h2}>
    {children}
  </Text>
);

export default H2;
