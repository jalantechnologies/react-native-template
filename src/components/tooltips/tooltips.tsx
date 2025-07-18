import { Box, Pressable, ScrollView, Text, useTheme } from 'native-base';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

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
  pressedTextColor?: string;
  pressedTextHeight?: number;
  pressedTextWidth?: number;
  pressedTextBackground?: string;
}

const Tooltip: React.FC<TooltipProps> = props => {
  const {
    title,
    text,
    footer,
    pointer,
    position,
    triangleAlign,
    variant,
    pressedText,
    pointerColor,
    height,
    width,
  } = props;

  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const resolvedPointer = pointer ?? true;
  const resolvedPosition = position ?? 'bottom';
  const resolvedAlign = triangleAlign ?? 'middle';
  const resolvedVariant = variant ?? 'white';
  const resolvedPressedText = pressedText ?? 'pressed!';
  const resolvedPressedTextColor = props.pressedTextColor ?? 'black';
  const resolvedPressedTextHeight = props.pressedTextHeight ?? 90;
  const resolvedPressedTextWidth = props.pressedTextWidth ?? 150;
  const resolvedPressedTextBackground = props.pressedTextBackground ?? 'white';

  const isDefaultWhite = !resolvedVariant || resolvedVariant === 'white';
  const textColor = isDefaultWhite ? 'black' : 'white';

  const bgColor = isDefaultWhite
    ? theme.colors.white
    : typeof theme.colors[resolvedVariant] === 'object'
    ? (theme.colors[resolvedVariant] as any)['500']
    : theme.colors.gray?.['500'] || '#000';

  const isVertical = resolvedPosition === 'top' || resolvedPosition === 'bottom';
  const isReverse = resolvedPosition === 'top' || resolvedPosition === 'left';

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const MAX_WIDTH = width ?? screenWidth * 0.6;
  const MAX_HEIGHT = height ?? screenHeight * 0.25;

  const triangle = resolvedPointer ? (
    <View style={[styles.triangle, triangleStyles[resolvedPosition](bgColor, resolvedAlign)]} />
  ) : null;

  const renderMainBox = () => (
    <Box
      bg={bgColor}
      rounded="md"
      shadow={15}
      overflow="hidden"
      width={MAX_WIDTH}
      height={MAX_HEIGHT}
      style={styles.shadow}
    >
      <ScrollView
        persistentScrollbar
        showsVerticalScrollIndicator
        contentContainerStyle={styles.scrollContent}
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
            <Box width={2} height={2} rounded="full" bg={pointerColor || 'cyan.400'} mr={2} />
            {typeof footer === 'string' ? (
              <Text color={textColor} fontSize="xs">
                {footer}
              </Text>
            ) : (
              footer
            )}
          </Box>
        )}
      </ScrollView>
    </Box>
  );

  const renderPressedText = () => (
    <Box
      px={3}
      py={2}
      bg={resolvedPressedTextBackground}
      rounded="md"
      shadow={10}
      width={resolvedPressedTextWidth}
      height={resolvedPressedTextHeight}
      justifyContent="center"
      alignItems="center"
    >
      <Text color={resolvedPressedTextColor} fontSize="sm">
        {resolvedPressedText}
      </Text>
    </Box>
  );

  return (
    <Pressable onPress={() => setVisible(!visible)}>
      <Box alignItems="center" justifyContent="center" pointerEvents="box-none">
        {isVertical ? (
          <Box alignItems="center">
            {resolvedPosition === 'top' && visible && renderPressedText()}
            {isReverse && triangle}
            {renderMainBox()}
            {!isReverse && triangle}
            {resolvedPosition === 'bottom' && visible && renderPressedText()}
          </Box>
        ) : (
          <Box flexDirection="row" alignItems="center">
            {resolvedPosition === 'left' && visible && renderPressedText()}
            {isReverse && triangle}
            {renderMainBox()}
            {!isReverse && triangle}
            {resolvedPosition === 'right' && visible && renderPressedText()}
          </Box>
        )}
      </Box>
    </Pressable>
  );
};

Tooltip.defaultProps = {
  title: undefined,
  footer: undefined,
  pointer: true,
  position: 'bottom',
  triangleAlign: 'middle',
  variant: 'white',
  pressedText: 'pressed!',
  pointerColor: undefined,
  height: undefined,
  width: undefined,
  pressedTextColor: undefined,
  pressedTextHeight: undefined,
  pressedTextWidth: undefined,
  pressedTextBackground: undefined,
};

export default Tooltip;

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 14,
  },
});

const triangleStyles: Record<
  NonNullable<TooltipProps['position']>,
  (color: string, align?: TooltipProps['triangleAlign']) => any
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
