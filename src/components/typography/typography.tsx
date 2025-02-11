import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

// Currently, it only defines the API and logic without styling

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

// TODO: Apply styles from the global theme once NativeWind is integrated
type TypographyColor = 'primary' | 'secondary' | 'muted';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
}

/**
 * Typography Component - Ensures consistent text styles across the app.
 *
 * Example usage:
 * <Typography variant="h1" color="primary">Hello World</Typography>
 */
const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  variant = 'body',
  color = 'primary',
  children,
}) => {
  return <Text>{children}</Text>;
};

export default Typography;
