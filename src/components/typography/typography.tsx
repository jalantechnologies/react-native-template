import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TextProps } from 'react-native';

import { styles } from './typography.styles';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  style?: object;
}

/**
 * Typography Component
 * Provides consistent typography styles across the application.
 */
const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
  variant,
  style,
  children,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Text style={[styles[variant || 'body'], { color: colors.text }, style]} {...rest}>
      {children}
    </Text>
  );
};

Typography.defaultProps = {
  variant: 'body',
  style: {},
};

export default Typography;
