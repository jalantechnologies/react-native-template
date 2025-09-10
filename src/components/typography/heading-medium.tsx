import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { TypographyProps } from 'react-native-template/src/types/typography';
import { useThemeColor } from 'react-native-template/src/utils';

import { HeadingMediumStyles as styles } from './typography.styles';

const HeadingMedium: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  color = 'primary.500',
}) => {
  const textColor = useThemeColor(color as string);
  return <Text style={[styles.heading, { color: textColor }]}>{children}</Text>;
};

export default HeadingMedium;
