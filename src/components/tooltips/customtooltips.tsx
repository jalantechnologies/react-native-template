import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Text, VStack, useTheme } from 'native-base';

interface CustomTooltipProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: keyof ReturnType<typeof useTheme>['colors'];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  title = 'Title',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  children,
  position = 'bottom',
  variant = 'primary',
}) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const bgColor =
    typeof theme.colors[variant] === 'object'
      ? (theme.colors[variant] as any)['500']
      : theme.colors.primary['500'];

  const toggleTooltip = () => setVisible(!visible);
const triangleColor = '#fff';
  const triangle = (
    <View
      style={[
        styles.triangle,
        triangleStyle[position](triangleColor),
      ]}
    />
  );

  const renderTrigger = () => {
    const isVertical = position === 'top' || position === 'bottom';
    const triangleFirst = position === 'top' || position === 'left';

    return (
      <Box
        onTouchEnd={toggleTooltip}
        alignItems="center"
        flexDirection={isVertical ? 'column' : 'row'}
      >
        {triangleFirst && triangle}
        {children}
        {!triangleFirst && triangle}
      </Box>
    );
  };

  const renderTooltipCard = () => (
    <Box
      mt={2}
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

  return (
    <Box alignItems="center" mb={5}>
      {position === 'bottom' && renderTrigger()}
      {visible && position === 'bottom' && renderTooltipCard()}

      {position === 'top' && visible && renderTooltipCard()}
      {position === 'top' && renderTrigger()}

      {(position === 'left' || position === 'right') && (
        <Box flexDirection="row" alignItems="center">
          {position === 'right' && renderTrigger()}
          {visible && (
            <Box
              ml={position === 'right' ? 2 : 0}
              mr={position === 'left' ? 2 : 0}
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
          )}
          {position === 'left' && renderTrigger()}
        </Box>
      )}
    </Box>
  );
};

export default CustomTooltip;

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
