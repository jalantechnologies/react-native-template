import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface CardProps {
  elevated?: boolean; // Controls shadow (will map to NativeWind later)
  className?: string; // Placeholder for future NativeWind classes
}
/**
 * Card component that acts as a container.
 */
const CardContent: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <View>{children}</View>;
};

export default CardContent;
