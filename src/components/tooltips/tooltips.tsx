import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Text, useTheme } from 'native-base';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: keyof ReturnType<typeof useTheme>['colors'];
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  variant = 'primary',
}) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const bgColor =
    typeof theme.colors[variant] === 'object'
      ? (theme.colors[variant] as any)['500']
      : theme.colors.primary['500'];

  const toggleTooltip = () => setVisible(!visible);

  const triangle = (
    <View
      style={[
        styles.triangle,
        triangleStyle[position](bgColor),
      ]}
    />
  );

  const renderButtonWithTriangle = () => {
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

  const renderTooltipText = () => (
    <Box mt={2} px={3} py={2} bg="coolGray.700" rounded="md" shadow={2}>
      <Text color="white" fontSize="sm">
        {text}
      </Text>
    </Box>
  );

  return (
    <Box alignItems="center" mb={5}>
      {position === 'bottom' && renderButtonWithTriangle()}
      {visible && position === 'bottom' && renderTooltipText()}

      {position === 'top' && visible && renderTooltipText()}
      {position === 'top' && renderButtonWithTriangle()}

      {(position === 'left' || position === 'right') && (
        <Box flexDirection="row" alignItems="center">
          {position === 'right' && renderButtonWithTriangle()}
          {visible && (
            <Box
              ml={position === 'right' ? 2 : 0}
              mr={position === 'left' ? 2 : 0}
              px={3}
              py={2}
              bg="coolGray.700"
              rounded="md"
              shadow={2}
            >
              <Text color="white" fontSize="sm">
                {text}
              </Text>
            </Box>
          )}
          {position === 'left' && renderButtonWithTriangle()}
        </Box>
      )}
    </Box>
  );
};

export default Tooltip;

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
