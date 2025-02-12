import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import type { CardProps } from './types';

/**
 * Card Component - A container for displaying grouped content.
 *
 * Example usage:
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Project Name</CardTitle>
 *     <CardDescription>Short project description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Project details go here</Text>
 *   </CardContent>
 *   <CardFooter>
 *     <Button title="Save" />
 *     <Button title="Cancel" />
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card: React.FC<PropsWithChildren<CardProps>> = ({
  // size = 'medium',
  // elevated = false, // TODO: Will be used once NativeWind is integrated
  children,
}) => {
  return <View>{children}</View>;
};

export default Card;
