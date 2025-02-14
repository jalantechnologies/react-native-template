import React, { memo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useAccordionContext } from './accordiancontext';
import AccordionHeader from './accordianheader';
import { useAnimatedHeight } from './hooks/useAnimatedHeight';
import { styles } from './styles';
import type { AccordionItemProps } from './types';

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  title,
  disabled,
  style,
}) => {
  const { expandedItems, toggleItem } = useAccordionContext();
  const isExpanded = expandedItems.includes(value);
  const { animatedStyle, onLayout } = useAnimatedHeight(isExpanded);

  return (
    <View style={[styles.itemContainer, style]}>
      <AccordionHeader
        title={title}
        isExpanded={isExpanded}
        disabled={disabled}
        onPress={() => !disabled && toggleItem(value)}
      />
      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={styles.contentInner} onLayout={onLayout}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default memo(AccordionItem);
