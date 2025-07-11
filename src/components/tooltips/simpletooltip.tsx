import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Text, VStack, useTheme } from 'native-base';

interface SimpleTooltipProps {
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: keyof ReturnType<typeof useTheme>['colors'];
}

const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  title,
  description,
  position = 'top',
  variant = 'primary',
}) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const toggleTooltip = () => setVisible(!visible);

  const triangleColor = '#fff';

  const triangle = (
    <View
      style={[styles.triangle, triangleStyle[position](triangleColor)]}
    />
  );

  const isVertical = position === 'top' || position === 'bottom';
  const triangleFirst = position === 'top' || position === 'left';

  const content = (
    <Box
      px={4}
      py={3}
      bg="white"
      borderRadius="md"
      shadow={3}
      maxW="80"
    >
      <VStack space={1}>
        <Text fontWeight="bold" fontSize="md">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {description}
        </Text>
      </VStack>
    </Box>
  );

  const layout = (
    <Box
      onTouchEnd={toggleTooltip}
      alignItems="center"
      flexDirection={isVertical ? 'column' : 'row'}
    >
      {triangleFirst && triangle}
      {content}
      {!triangleFirst && triangle}
    </Box>
  );

  return (
    <Box mb={4}>
      {position === 'left' || position === 'right' ? (
        <Box flexDirection="row" alignItems="center">{layout}</Box>
      ) : (
        layout
      )}
    </Box>
  );
};

export default SimpleTooltip;

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
  },
});

const triangleStyle: Record<'top' | 'bottom' | 'left' | 'right', (color: string) => any> = {
  top: (color) => ({
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: color,
  }),
  bottom: (color) => ({
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: color,
  }),
  left: (color) => ({
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: color,
  }),
  right: (color) => ({
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: color,
  }),
};
