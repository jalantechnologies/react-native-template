import { useTheme } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { MulticolorSpinnerProps, SpinnerSize } from '../../types';

import { styles } from './spinner.styles';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const MulticolorSpinner: React.FC<MulticolorSpinnerProps> = ({
  size = SpinnerSize.SMALL,
  colors = ['#FFFFFF', '#C4C4C4', '#000000'],
}) => {
  const theme = useTheme();

  const rotation = useRef(new Animated.Value(0)).current;
  const arc = useRef(new Animated.Value(0)).current;

  const spinnerSize = size === SpinnerSize.SMALL ? theme.sizes[5] : theme.sizes[8];
  const strokeWidth =
    size === SpinnerSize.SMALL
      ? parseInt(theme.borderWidths['2'], 10)
      : parseInt(theme.borderWidths['4'], 10);
  const radius = (spinnerSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    const animateArc = () => {
      const grow = Animated.timing(arc, {
        toValue: 0.8,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      });

      const reset = Animated.timing(arc, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      });

      Animated.loop(Animated.sequence([reset, grow, Animated.delay(500)])).start();
    };

    animateArc();
  }, [rotation, arc]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={size === SpinnerSize.SMALL ? styles.container : styles.fullScreenContainer}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg width={spinnerSize} height={spinnerSize} viewBox={`0 0 ${spinnerSize} ${spinnerSize}`}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              {colors.map((color, index) => (
                <Stop
                  key={index}
                  offset={`${(index / (colors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </LinearGradient>
          </Defs>

          <AnimatedCircle
            stroke="url(#grad)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            cx={spinnerSize / 2}
            cy={spinnerSize / 2}
            r={radius}
            strokeDasharray={arc.interpolate({
              inputRange: [0, 0.7],
              outputRange: [`0, ${circumference}`, `${circumference * 0.85}, ${circumference}`],
            })}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};
