import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { ANIMATION_CONFIG } from './constants';
import { styles } from './styles';

// TODO: Replace with your actual chevron icon component
const ChevronIcon = () => <View style={styles.chevron} />;

interface AccordionHeaderProps {
  title: React.ReactNode;
  isExpanded: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  title,
  isExpanded,
  disabled,
  onPress,
}) => {
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isExpanded ? '180deg' : '0deg', ANIMATION_CONFIG),
      },
    ],
  }));
  AccordionHeader.defaultProps = {
    disabled: false,
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.header}
      activeOpacity={0.7}
      // TODO: Add accessibility props in v2
      // accessibilityRole="button"
      // accessibilityState={{ expanded: isExpanded }}
    >
      {title}
      <Animated.View style={chevronStyle}>
        <ChevronIcon />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(AccordionHeader);
