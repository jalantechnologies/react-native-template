import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { ParagraphMediumStyles as styles } from './typography.styles';

const ParagraphMedium: React.FC<PropsWithChildren> = ({ children }) => (
  <Text style={styles.paragraph}>{children}</Text>
);

export default ParagraphMedium;
