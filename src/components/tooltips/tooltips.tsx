import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Box, Text, useTheme, ScrollView, Pressable } from 'native-base';

interface TooltipProps {
  title?: string;
  text: string;
  footer?: string | React.ReactNode;
  pointer?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  triangleAlign?: 'middle' | 'start' | 'end';
  variant?: keyof ReturnType<typeof useTheme>['colors'];
  pressedText?: string;
  pointerColor?: string;
  height?: number;
  width?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  text,
  footer,
  pointer = true,
  position = 'bottom',
  triangleAlign = 'middle',
  variant = 'white',
  pressedText,
  pointerColor,
  height,
  width,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const isDefaultWhite = !variant || variant === 'white';
  const textColor = isDefaultWhite ? 'black' : 'white';

  const bgColor =
    isDefaultWhite
      ? theme.colors.white
      : typeof theme.colors[variant] === 'object'
        ? (theme.colors[variant] as any)['500']
        : theme.colors.gray?.['500'] || '#000';

  const isVertical = position === 'top' || position === 'bottom';
  const isReverse = position === 'top' || position === 'left';

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const MAX_WIDTH = width ?? screenWidth * 0.6;
  const MAX_HEIGHT = height ?? screenHeight * 0.25;

  const triangle = pointer ? (
    <View style={[styles.triangle, triangleStyles[position](bgColor, triangleAlign)]} />
  ) : null;

  const renderMainBox = () => (
    <Box
      bg={bgColor}
      rounded="md"
      shadow={15}
      overflow="hidden"
      maxWidth={MAX_WIDTH}
      maxHeight={MAX_HEIGHT}
      style={{
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 14,
      }}
    >
      <ScrollView
        persistentScrollbar
        showsVerticalScrollIndicator
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        scrollIndicatorInsets={{ right: -10 }}
      >
        {title && (
          <Text color={textColor} fontSize="xs" mb={1}>
            {title}
          </Text>
        )}
        <Text color={textColor} fontWeight="bold">
          {text}
        </Text>
        {footer && (
          <Box flexDirection="row" alignItems="center" mt={1}>
            <Box
              width={2}
              height={2}
              rounded="full"
              bg={pointerColor || 'cyan.400'}
              mr={2}
            />
            {typeof footer === 'string' ? (
              <Text color={textColor} fontSize="xs">{footer}</Text>
            ) : (
              footer
            )}
          </Box>
        )}
      </ScrollView>
    </Box>
  );

  const renderPressedText = () => (
    <Box px={3} py={2} bg="coolGray.700" rounded="md" shadow={10}>
      <Text color={textColor} fontSize="sm">
        {pressedText || 'pressed!'}
      </Text>
    </Box>
  );

  return (
    <Pressable onPress={() => setVisible(!visible)}>
      <Box alignItems="center" justifyContent="center" pointerEvents="box-none">
        {isVertical ? (
          <Box alignItems="center">
            {position === 'top' && visible && renderPressedText()}
            {isReverse && triangle}
            {renderMainBox()}
            {!isReverse && triangle}
            {position === 'bottom' && visible && renderPressedText()}
          </Box>
        ) : (
          <Box flexDirection="row" alignItems="center">
            {position === 'left' && visible && renderPressedText()}
            {isReverse && triangle}
            {renderMainBox()}
            {!isReverse && triangle}
            {position === 'right' && visible && renderPressedText()}
          </Box>
        )}
      </Box>
    </Pressable>
  );
};

export default Tooltip;

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
  },
});

const triangleStyles: Record<
  NonNullable<TooltipProps['position']>,
  (color: string, align: TooltipProps['triangleAlign']) => any
> = {
  top: (color, align = 'middle') => ({
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: color,
    borderStyle: 'solid',
    marginBottom: -1,
    alignSelf: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
    marginLeft: align === 'start' ? 12 : 0,
    marginRight: align === 'end' ? 12 : 0,
  }),
  bottom: (color, align = 'middle') => ({
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: color,
    borderStyle: 'solid',
    marginTop: -1,
    alignSelf: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
    marginLeft: align === 'start' ? 12 : 0,
    marginRight: align === 'end' ? 12 : 0,
  }),
  left: (color, align = 'middle') => ({
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: color,
    borderStyle: 'solid',
    marginRight: -1,
    alignSelf: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
    marginTop: align === 'start' ? 12 : 0,
    marginBottom: align === 'end' ? 12 : 0,
  }),
  right: (color, align = 'middle') => ({
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: color,
    borderStyle: 'solid',
    marginLeft: -1,
    alignSelf: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
    marginTop: align === 'start' ? 12 : 0,
    marginBottom: align === 'end' ? 12 : 0,
  }),
};
