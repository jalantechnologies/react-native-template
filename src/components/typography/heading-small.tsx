import { TypographyProps } from 'boilerplate-react-native/src/types/typography';
import { useThemeColor } from 'boilerplate-react-native/src/utils';
import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { HeadingSmallStyles as styles } from './typography.styles';

const HeadingSmall: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  color = 'primary.500',
}) => {
  const textColor = useThemeColor(color as string);
  return <Text style={[styles.heading, { color: textColor }]}>{children}</Text>;
};

export default HeadingSmall;
