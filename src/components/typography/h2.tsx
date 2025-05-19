import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { H2Styles as styles } from './typography.styles';

const H2: React.FC<PropsWithChildren> = ({ children }) => <Text style={styles.h2}>{children}</Text>;

export default H2;
