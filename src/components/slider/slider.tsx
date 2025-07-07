import { useTheme } from 'native-base';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, PanResponder, Animated, Dimensions } from 'react-native';

import { SliderProps, SliderOrientation } from '../../types/slider';

import { useSliderStyles } from './slider.styles';

const Slider = ({
  value = 0,
  step = 1,
  lowerLimit = 0,
  upperLimit = 100,
  orientation = SliderOrientation.HORIZONTAL,
  onValueChange,
}: SliderProps) => {
  const { sizes } = useTheme();

  const isVertical = orientation === SliderOrientation.VERTICAL;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const trackLength = isVertical ? screenHeight * 0.3 : screenWidth * 0.8;
  const handleSize = Number(sizes['5']);
  const trackThickness = Number(sizes['2']);

  const styles = useSliderStyles(isVertical);

  const calculatePositionFromValue = (val: number) => {
    if (isVertical) {
      return (
        (1 - (val - lowerLimit) / (upperLimit - lowerLimit)) * (trackLength - handleSize) -
        handleSize / 2
      );
    }
    return (
      ((val - lowerLimit) / (upperLimit - lowerLimit)) * (trackLength - handleSize) - handleSize / 2
    );
  };

  const calculateValueFromPosition = (pos: number): number => {
    if (isVertical) {
      return (
        lowerLimit +
        (upperLimit - lowerLimit) * (1 - (pos + handleSize / 2) / (trackLength - handleSize))
      );
    }
    return (
      lowerLimit + (upperLimit - lowerLimit) * ((pos + handleSize / 2) / (trackLength - handleSize))
    );
  };

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
        const SENSITIVITY = 0.3;
        const delta = (isVertical ? gestureState.dy : gestureState.dx) * SENSITIVITY;
        const newPos = Math.max(
          -handleSize / 2,
          Math.min(lastPosition.current + delta, trackLength - handleSize + handleSize / 2),
        );
        const rawValue = calculateValueFromPosition(newPos);
        const steppedValue = applyStep(rawValue);
        const steppedPosition = calculatePositionFromValue(steppedValue);

        handlePosition.setValue(steppedPosition);
        setSliderValue(steppedValue);
        onValueChange?.(steppedValue);
      },
      onPanResponderRelease: (event, gestureState) => {
        const SENSITIVITY = 0.3;
        const delta = (isVertical ? gestureState.dy : gestureState.dx) * SENSITIVITY;
        const newPos = Math.max(
          -handleSize / 2,
          Math.min(lastPosition.current + delta, trackLength - handleSize + handleSize / 2),
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
  };

  return (
    <View style={styles.container}>
      <View style={[styles.track, isVertical ? styles.verticalTrack : styles.horizontalTrack]}>
        <Animated.View
          style={[
            styles.filledTrack,
            isVertical
              ? {
                  height: Animated.add(
                    new Animated.Value(trackLength),
                    Animated.multiply(handlePosition, -1),
                  ),
                }
              : {
                  width: Animated.add(handlePosition, new Animated.Value(handleSize / 2)),
                },
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
