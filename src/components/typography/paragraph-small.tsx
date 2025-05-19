import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { ParagraphSmallStyles as styles } from './typography.styles';

const ParagraphSmall: React.FC<PropsWithChildren> = ({ children }) => (
  <Text style={styles.paragraph}>{children}</Text>
);

export default ParagraphSmall;
