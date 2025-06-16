import { useTheme } from 'native-base';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';

import { CustomSliderProps, SliderOrientation } from '../../types/slider';

import { SliderStyles } from './slider.styles';

const Slider = ({
  value = 0,
  step = 0,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  lowerLimit = 0,
  upperLimit = 200,
  orientation = SliderOrientation.HORIZONTAL,
  onValueChange,
}: CustomSliderProps) => {
  const { colors, sizes } = useTheme();

  const trackLength = Number(sizes['48']);
  const handleSize = Number(sizes['5']);
  const trackThickness = Number(sizes['2']);

  const _minimumTrackColor = minimumTrackTintColor ?? colors.primary[500];
  const _maximumTrackColor = maximumTrackTintColor ?? colors.gray[300];
  const _thumbColor = thumbTintColor ?? colors.white;
  const _borderColor = minimumTrackTintColor ?? colors.primary[500];
  const isVertical = orientation === SliderOrientation.VERTICAL;

  const styles = SliderStyles();

  const calculatePositionFromValue = (val: number) =>
    ((val - lowerLimit) / (upperLimit - lowerLimit)) * (trackLength - handleSize);

  const calculateValueFromPosition = (pos: number): number =>
    lowerLimit + (upperLimit - lowerLimit) * (pos / (trackLength - handleSize));

  const initialPosition = calculatePositionFromValue(value);
  const handlePosition = useRef(new Animated.Value(initialPosition)).current;
  const lastPosition = useRef(initialPosition);
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    const steppedValue = applyStep(value);
    const newPos = calculatePositionFromValue(steppedValue);
    handlePosition.setValue(newPos);
    lastPosition.current = newPos;
    setSliderValue(steppedValue);
  }, [value]);

  const applyStep = (val: number) => {
    if (step > 0) {
      const stepped = Math.round(val / step) * step;
      return Math.min(Math.max(stepped, lowerLimit), upperLimit);
    }
    return val;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const delta = isVertical ? gestureState.dy : gestureState.dx;
        const newPos = Math.max(
          0,
          Math.min(lastPosition.current + delta, trackLength - handleSize),
        );
        const rawValue = calculateValueFromPosition(newPos);
        const steppedValue = applyStep(rawValue);
        const steppedPosition = calculatePositionFromValue(steppedValue);

        handlePosition.setValue(steppedPosition);
        setSliderValue(steppedValue);
        onValueChange?.(steppedValue);
      },
      onPanResponderRelease: (event, gestureState) => {
        const delta = isVertical ? gestureState.dy : gestureState.dx;
        const newPos = Math.max(
          0,
          Math.min(lastPosition.current + delta, trackLength - handleSize),
        );
        const rawValue = calculateValueFromPosition(newPos);
        const steppedValue = applyStep(rawValue);
        const steppedPosition = calculatePositionFromValue(steppedValue);

        lastPosition.current = steppedPosition;
        handlePosition.setValue(steppedPosition);
        setSliderValue(steppedValue);
        onValueChange?.(steppedValue);
      },
    }),
  ).current;

  const handleStyle = {
    ...(isVertical
      ? {
          top: handlePosition,
          left: -(handleSize - trackThickness) / 2,
        }
      : {
          left: handlePosition,
          top: -(handleSize - trackThickness) / 2,
        }),
    backgroundColor: _thumbColor,
    borderColor: _borderColor,
  };

  const progressBarStyle = {
    ...(isVertical
      ? { height: Animated.add(handlePosition, new Animated.Value(handleSize / 2)) }
      : { width: Animated.add(handlePosition, new Animated.Value(handleSize / 2)) }),
    backgroundColor: _minimumTrackColor,
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.track,
          isVertical ? styles.verticalTrack : styles.horizontalTrack,
          { backgroundColor: _maximumTrackColor },
        ]}
      >
        <Animated.View
          style={[
            styles.filledTrack,
            progressBarStyle,
            isVertical ? styles.filledVertical : styles.filledHorizontal,
          ]}
        />
        <Animated.View style={[styles.handle, handleStyle]} {...panResponder.panHandlers} />
      </View>
      <Text style={styles.valueText}>{sliderValue}</Text>
    </View>
  );
};

export default Slider;
