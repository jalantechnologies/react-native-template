import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

// TODO: Once NativeWind is integrated, add `className` prop to allow Tailwind styling
// Currently, this is a logic-only implementation. Styling will come later.
interface CardProps {
  elevated?: boolean;
  className?: string; // Placeholder for future NativeWind classes
}
/**
 * Card component that acts as a container.
 */
const Card: React.FC<PropsWithChildren<CardProps>> = ({ elevated = false, children }) => {
  return <View>{children}</View>; // No styling yet, NativeWind will be added later
};

export default Card;

/**
 * Example usage:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Project Name</CardTitle>
 *     <CardDescription>Describe the project</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Project details go here</Text>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Save</Button>
 *     <Button variant="outline">Cancel</Button>
 *   </CardFooter>
 * </Card>
 */
