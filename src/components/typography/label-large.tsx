import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { LabelLargeStyles as styles } from './typography.styles';

const LabelLarge: React.FC<PropsWithChildren> = ({ children }) => (
  <Text style={styles.label}>{children}</Text>
);

export default LabelLarge;
