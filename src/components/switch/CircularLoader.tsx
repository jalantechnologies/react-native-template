import { useTheme } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export interface CircularLoaderProps {
  size: number;
  color?: string;
  strokeWidth?: number;
  backgroundColor?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size,
  color,
  strokeWidth = 6,
  backgroundColor,
}) => {
  const theme = useTheme();
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;

  const loaderColor = color || theme.colors.primary[500];
  const bgColor = backgroundColor || theme.colors.secondary[200];

  return (
    <Animated.View
      testID="circular-loader"
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ rotate: spin }],
        },
      ]}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={loaderColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${arcLength} ${circumference - arcLength}`}
          strokeLinecap="round"
        />
      </Svg>
    </Animated.View>
  );
};

CircularLoader.defaultProps = {
  color: undefined,
  strokeWidth: 6,
  backgroundColor: undefined,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularLoader;
