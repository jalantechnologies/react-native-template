import { TypographyProps } from 'boilerplate-react-native/src/types/typography';
import { Text } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { ParagraphSmallStyles as styles } from './typography.styles';

const ParagraphSmall: React.FC<PropsWithChildren<TypographyProps>> = ({ children, color }) => (
  <Text style={styles.paragraph} color={color}>
    {children}
  </Text>
);

export default ParagraphSmall;
