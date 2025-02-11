import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

// API and logic only; styling will be integrated with NativeWind later

type TypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' 
  | 'body1' | 'body2'
  | 'caption' 
  | 'subtitle1' | 'subtitle2'
  | 'button'
  | 'overline' 
  | 'lead' | 'muted' | 'code' | 'quote'; 

type TypographyColor = 'default' | 'primary' | 'secondary' | 'muted' | 'success' | 'error' | 'warning' | 'info';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
}

/**
 * Typography Component - Ensures consistent text styles across the app.
 *
 * Example usage:
 * <Typography variant="h1" color="primary">Hello World</Typography>
 *
 * TODO: Integrate NativeWind for styling once available.
 */
const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  variant = 'body1',
  color = 'default',
  children,
}) => {
  return <Text>{children}</Text>; 
};

export default Typography;
