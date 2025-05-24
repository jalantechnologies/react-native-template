import { TypographyProps } from 'boilerplate-react-native/src/types/typography';
import { Text } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { LabelLargeStyles as styles } from './typography.styles';

const LabelLarge: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  color = 'primary.500',
}) => (
  <Text style={styles.label} color={color}>
    {children}
  </Text>
);

export default LabelLarge;
