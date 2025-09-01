import { TypographyProps } from '../../types/typography';
import { useThemeColor } from '../../utils';
import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { HeadingLargeStyles as styles } from './typography.styles';

const HeadingLarge: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  color = 'primary.500',
}) => {
  const textColor = useThemeColor(color as string);
  return <Text style={[styles.heading, { color: textColor }]}>{children}</Text>;
};

export default HeadingLarge;
