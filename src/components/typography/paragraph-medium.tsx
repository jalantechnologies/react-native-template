import { TypographyProps } from 'boilerplate-react-native/src/types/typography';
import { Text } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { ParagraphMediumStyles as styles } from './typography.styles';

const ParagraphMedium: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  color = 'primary.500',
}) => (
  <Text style={styles.paragraph} color={color}>
    {children}
  </Text>
);

export default ParagraphMedium;
