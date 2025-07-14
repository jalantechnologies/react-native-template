import { useTheme } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export interface ProgressBarProps {
  progress: number;
  color?: keyof typeof themeColors;
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    borderRadius: 4,
    overflow: 'hidden',
    height: 10,
  },
  fill: {
    height: '100%',
  },
  label: {
    minWidth: 35,
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
  },
});

const themeColors = {
  primary: true,
  secondary: true,
  tertiary: true,
  background: true,
  danger: true,
  warning: true,
  success: true,
  info: true,
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = 'primary' }) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const normalizedProgress = clampedProgress / 100;
  const displayLabel = Math.round(clampedProgress);

  const fillColor =
    (theme.colors as unknown as Record<string, Record<string, string>>)?.[color]?.['500'] ??
    theme.colors.primary['500'] ??
    '#007AFF';

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: normalizedProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [normalizedProgress]);

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View testID="progress-container" style={styles.wrapper}>
      <View style={styles.container}>
        <Animated.View
          testID="progress-fill"
          style={[styles.fill, { backgroundColor: fillColor, width: animatedWidth }]}
        />
      </View>
      <Text style={styles.label}>{`${displayLabel}%`}</Text>
    </View>
  );
};

ProgressBar.defaultProps = {
  color: 'primary',
};

export default ProgressBar;
