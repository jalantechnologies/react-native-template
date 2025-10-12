// // Slider component: supports single and range modes, themed styling, step control, markers, and animated value bubbles

import { useTheme } from 'native-base';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, PanResponder, Animated, LayoutChangeEvent } from 'react-native';

import { SliderProps } from '../../types/slider';
import { Input } from '../inputs';

import { useSliderStyles } from './slider.styles';

// Enum to differentiate between handles in a range slider
enum SliderHandle {
  SINGLE = 'single',
  LEFT = 'left',
  RIGHT = 'right',
}

// Enum for input submission type (min or max value)
enum InputSubmitType {
  MIN = 'min',
  MAX = 'max',
}

// Slider component supporting both single and range modes
const Slider = ({
  value = 0,
  step = 1,
  lowerLimit = 0,
  upperLimit = 100,
  onValueChange,
  isRange = false,
  showEndMarkers = false,
  internalMarkerStep,
  showValueInput = false,
  disabled = false,
}: SliderProps) => {
  const { sizes } = useTheme();
  const HANDLE_SIZE = Number(sizes['5']); // Constant: size of slider handle
  const [trackLength, setTrackLength] = useState(0);

  const styles = useSliderStyles();

  // Ensures value stays between lower and upper limits
  const clampValueWithinLimits = useCallback(
    (val: number, min: number, max: number) => Math.min(Math.max(val, min), max),
    [],
  );

  // converts the value to the position of slider
  const convertValueToSliderPosition = useCallback(
    (val: number) =>
      trackLength > 0 ? ((val - lowerLimit) / (upperLimit - lowerLimit)) * trackLength : 0,
    [trackLength, lowerLimit, upperLimit],
  );

  // converts the position of slider to value
  const convertSliderPositionToValue = useCallback(
    (pos: number) =>
      trackLength > 0 ? lowerLimit + ((upperLimit - lowerLimit) * pos) / trackLength : lowerLimit,
    [trackLength, lowerLimit, upperLimit],
  );

  // Apply step increments and clamp value within limits
  const applyStepAndClamp = useCallback(
    (val: number) =>
      step > 0
        ? clampValueWithinLimits(Math.round(val / step) * step, lowerLimit, upperLimit)
        : val,
    [step, lowerLimit, upperLimit, clampValueWithinLimits],
  );

  // Compute internal markers if provided
  // e.g., for step=10 and range 0-100: markers=[10,20,...,90]
  const internalMarkers = useMemo(() => {
    if (!internalMarkerStep || internalMarkerStep <= 0) {
      return [];
    }
    const markers = [];
    for (let i = lowerLimit + internalMarkerStep; i < upperLimit; i += internalMarkerStep) {
      markers.push(i);
    }
    return markers;
  }, [internalMarkerStep, lowerLimit, upperLimit]);

  // Initial values
  const initialRange: [number, number] =
    Array.isArray(value) && isRange ? value : [lowerLimit, upperLimit];
  const initialVal: number = typeof value === 'number' && !isRange ? value : lowerLimit;

  // State variables
  const [rangeSliderValues, setRangeSliderValue] = useState<[number, number]>(initialRange);
  const [singleSliderValue, setSingleSliderValue] = useState(initialVal);
  const [minInputValue, setMinInputValue] = useState(
    isRange ? `${initialRange[0]}` : `${initialVal}`,
  );
  const [maxInputValue, setMaxInputValue] = useState(`${initialRange[1]}`);
  const [isSliding, setIsSliding] = useState(true);
  const [activeBubbleValue, setActiveBubbleValue] = useState<number | null>(null);
  const [activeHandle, setActiveHandle] = useState<SliderHandle | null>(null);

  // Animated values to track handle positions
  const rangeLeftPos = useRef(
    new Animated.Value(convertValueToSliderPosition(initialRange[0])),
  ).current;
  const rangeRightPos = useRef(
    new Animated.Value(convertValueToSliderPosition(initialRange[1])),
  ).current;
  const singleHandlePosition = useRef(
    new Animated.Value(convertValueToSliderPosition(initialVal)),
  ).current;

  const prevLeftPos = useRef(0);
  const prevRightPos = useRef(0);
  const prevSinglePos = useRef(0);

  const flexContainerStyle = { flex: 1 };

  // Update positions whenever track length change
  useEffect(() => {
    if (trackLength > 0) {
      const left = convertValueToSliderPosition(rangeSliderValues[0]);
      const right = convertValueToSliderPosition(rangeSliderValues[1]);
      const pos = convertValueToSliderPosition(singleSliderValue);

      rangeLeftPos.setValue(left);
      rangeRightPos.setValue(right);
      singleHandlePosition.setValue(pos);

      prevLeftPos.current = left;
      prevRightPos.current = right;
      prevSinglePos.current = pos;
    }
  }, [trackLength]);

  useEffect(() => {
    if (trackLength <= 0) {
      return;
    }

    if (isRange && Array.isArray(value)) {
      const [leftVal, rightVal] = value;
      const [currLeft, currRight] = rangeSliderValues;

      if (leftVal !== currLeft || rightVal !== currRight) {
        const lPos = convertValueToSliderPosition(leftVal);
        const rPos = convertValueToSliderPosition(rightVal);
        rangeLeftPos.setValue(lPos);
        rangeRightPos.setValue(rPos);
        prevLeftPos.current = lPos;
        prevRightPos.current = rPos;
        setRangeSliderValue([leftVal, rightVal]);
        setMinInputValue(`${leftVal}`);
        setMaxInputValue(`${rightVal}`);
      }
    } else if (!isRange && typeof value === 'number') {
      if (value !== singleSliderValue) {
        const stepped = applyStepAndClamp(value);
        const pos = convertValueToSliderPosition(stepped);
        singleHandlePosition.setValue(pos);
        prevSinglePos.current = pos;
        setSingleSliderValue(stepped);
        setMinInputValue(`${stepped}`);
      }
    }
  }, [trackLength, isRange, value]);

  const handleSubmit = useCallback(
    (type: InputSubmitType) => {
      const inputValue = type === InputSubmitType.MIN ? minInputValue : maxInputValue;
      const parsedVal = parseFloat(inputValue);
      if (isNaN(parsedVal)) {
        return;
      }

      const steppedVal = applyStepAndClamp(parsedVal);

      if (isRange) {
        const clamped =
          type === InputSubmitType.MIN
            ? clampValueWithinLimits(steppedVal, lowerLimit, rangeSliderValues[1])
            : clampValueWithinLimits(steppedVal, rangeSliderValues[0], upperLimit);
        const newRange: [number, number] =
          type === InputSubmitType.MIN
            ? [clamped, rangeSliderValues[1]]
            : [rangeSliderValues[0], clamped];
        const pos = convertValueToSliderPosition(clamped);
        if (type === InputSubmitType.MIN) {
          rangeLeftPos.setValue(pos);
          prevLeftPos.current = pos;
        } else {
          rangeRightPos.setValue(pos);
          prevRightPos.current = pos;
        }
        setRangeSliderValue(newRange);
        onValueChange?.(newRange);
      } else {
        const pos = convertValueToSliderPosition(steppedVal);
        singleHandlePosition.setValue(pos);
        prevSinglePos.current = pos;
        setSingleSliderValue(steppedVal);
        setMinInputValue(`${steppedVal}`);
        onValueChange?.(steppedVal);
      }
    },
    [
      applyStepAndClamp,
      minInputValue,
      maxInputValue,
      isRange,
      rangeSliderValues,
      lowerLimit,
      upperLimit,
    ],
  );

  // Track gesture start position
  const gestureStartPositionX = useRef(0);
  // PanResponder for slider handles 
  const createPanResponder = (
    handleType: SliderHandle,
    handleRef: Animated.Value,
    lastRef: React.MutableRefObject<number>,
    getCurrentRange?: () => [number, number],
    updateSliderValueOnDrag?: (val: number) => void,
  ) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        gestureStartPositionX.current = lastRef.current;
        setIsSliding(true);
        setActiveHandle(handleType);
      },
      onPanResponderMove: (_, g) => {
        if (trackLength <= 0) {
          return;
        }

        let newPos = clampValueWithinLimits(gestureStartPositionX.current + g.dx, 0, trackLength);
        const steppedVal = applyStepAndClamp(convertSliderPositionToValue(newPos));
        newPos = convertValueToSliderPosition(steppedVal);

        if (handleType === SliderHandle.LEFT && getCurrentRange) {
          const [, r] = getCurrentRange();
          if (steppedVal > r) {
            return;
          }
        }
        if (handleType === SliderHandle.RIGHT && getCurrentRange) {
          const [l] = getCurrentRange();
          if (steppedVal < l) {
            return;
          }
        }

        if (handleType === SliderHandle.LEFT || handleType === SliderHandle.SINGLE) {
          setMinInputValue('');
        }
        if (handleType === SliderHandle.RIGHT) {
          setMaxInputValue('');
        }

        handleRef.setValue(newPos);
        updateSliderValueOnDrag?.(steppedVal);
        setActiveBubbleValue(steppedVal);
      },
      onPanResponderRelease: (_, g) => {
        if (trackLength <= 0) {
          return;
        }

        const finalVal = applyStepAndClamp(
          convertSliderPositionToValue(
            clampValueWithinLimits(gestureStartPositionX.current + g.dx, 0, trackLength),
          ),
        );
        const finalPos = convertValueToSliderPosition(finalVal);
        handleRef.setValue(finalPos);
        lastRef.current = finalPos;
        updateSliderValueOnDrag?.(finalVal);
        setActiveBubbleValue(null);
        setActiveHandle(null);
        setIsSliding(false);
      },
    });

  const singlePanResponder = useMemo(
    () =>
      createPanResponder(
        SliderHandle.SINGLE,
        singleHandlePosition,
        prevSinglePos,
        undefined,
        val => {
          setSingleSliderValue(val);
          onValueChange?.(val);
        },
      ),
    [trackLength],
  );

  const leftPanResponder = useMemo(
    () =>
      createPanResponder(
        SliderHandle.LEFT,
        rangeLeftPos,
        prevLeftPos,
        () => rangeSliderValues,
        val => {
          const updated: [number, number] = [val, rangeSliderValues[1]];
          setRangeSliderValue(updated);
          onValueChange?.(updated);
        },
      ),
    [trackLength],
  );

  const rightPanResponder = useMemo(
    () =>
      createPanResponder(
        SliderHandle.RIGHT,
        rangeRightPos,
        prevRightPos,
        () => rangeSliderValues,
        val => {
          const updated: [number, number] = [rangeSliderValues[0], val];
          setRangeSliderValue(updated);
          onValueChange?.(updated);
        },
      ),
    [trackLength],
  );

  const renderHandleValueBubble = (
    handle: SliderHandle,
    position: Animated.Value,
    bubbleVal: number | null,
  ) => {
    if (!isSliding || typeof bubbleVal !== 'number' || activeHandle !== handle) {
      return null;
    }

    const BUBBLE_OFFSET_RATIO = 1.6;  // Multiplier to position bubble slightly above handle
    const bubbleLeft = Animated.add(
      position,
      new Animated.Value(HANDLE_SIZE / 2 - HANDLE_SIZE * BUBBLE_OFFSET_RATIO),
    );

    return (
      <Animated.View
        pointerEvents="none"
        style={[styles.valueLabelWrapper, { left: bubbleLeft, bottom: sizes['8'] }]}
      >
        <View style={styles.valueLabel}>
          <Text style={styles.valueLabelText}>{bubbleVal}</Text>
          <View style={styles.pointer} />
        </View>
      </Animated.View>
    );
  };

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const width = e.nativeEvent.layout.width;
      if (width > 0 && width !== trackLength) {
        setTrackLength(width);
      }
    },
    [trackLength],
  );

  // Offset ensures filled line ends at the handle center
  const HANDLE_CENTER_OFFSET = HANDLE_SIZE / 2;
  // For range slider: filled track spans from left to right handle
  // For single slider: filled track spans from start to handle center
  const filledLineLeft = isRange ? rangeLeftPos : singleHandlePosition;
  const filledLineWidth = isRange
    ? Animated.subtract(rangeRightPos, rangeLeftPos)
    : Animated.add(singleHandlePosition, new Animated.Value(HANDLE_CENTER_OFFSET));

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.sliderWithInputRow}>
        <View style={flexContainerStyle}>
          {showValueInput && (
            <View style={isRange ? styles.inputRow : undefined}>
              <View style={styles.inputBox}>
                <Input
                  value={minInputValue}
                  onChangeText={setMinInputValue}
                  onSubmitEditing={() => handleSubmit(InputSubmitType.MIN)}
                  placeholder={`${lowerLimit}`}
                  keyboardType="numeric"
                  disabled={disabled}
                  textAlign="center"
                  numberOfLines={1}
                  multiline={false}
                />
              </View>
              {isRange && (
                <View style={styles.inputBox}>
                  <Input
                    value={maxInputValue}
                    onChangeText={setMaxInputValue}
                    onSubmitEditing={() => handleSubmit(InputSubmitType.MAX)}
                    placeholder={`${upperLimit}`}
                    keyboardType="numeric"
                    disabled={disabled}
                    textAlign="center"
                    numberOfLines={1}
                    multiline={false}
                  />
                </View>
              )}
            </View>
          )}

          <View style={[styles.sliderLine, disabled && styles.disabledTrack]}>
            <Animated.View
              style={[
                styles.sliderFilledLine,
                { left: filledLineLeft, width: filledLineWidth },
                disabled && styles.disabledTrack,
              ]}
            />

            {internalMarkers.map((mark, index) => {
              const markerLeft = ((mark - lowerLimit) / (upperLimit - lowerLimit)) * trackLength;
              return (
                <View key={index} style={[styles.internalMarker, { left: markerLeft }]}>
                  <Text style={[styles.markerText, disabled && styles.disabledMarkers]}>
                    {mark}
                  </Text>
                </View>
              );
            })}

            {renderHandleValueBubble(SliderHandle.SINGLE, singleHandlePosition, activeBubbleValue)}
            {renderHandleValueBubble(SliderHandle.LEFT, rangeLeftPos, activeBubbleValue)}
            {renderHandleValueBubble(SliderHandle.RIGHT, rangeRightPos, activeBubbleValue)}

            {isRange ? (
              <>
                <Animated.View
                  style={[
                    styles.sliderHandle,
                    disabled && styles.disabledHandle,
                    { left: Animated.subtract(rangeLeftPos, HANDLE_CENTER_OFFSET) },
                  ]}
                  {...leftPanResponder.panHandlers}
                />
                <Animated.View
                  style={[
                    styles.sliderHandle,
                    disabled && styles.disabledHandle,
                    { left: Animated.subtract(rangeRightPos, HANDLE_CENTER_OFFSET) },
                  ]}
                  {...rightPanResponder.panHandlers}
                />
              </>
            ) : (
              <Animated.View
                style={[
                  styles.sliderHandle,
                  disabled && styles.disabledHandle,
                  { left: Animated.subtract(singleHandlePosition, HANDLE_CENTER_OFFSET) },
                ]}
                {...singlePanResponder.panHandlers}
              />
            )}
          </View>

          {showEndMarkers && (
            <View style={styles.endMarkersRow}>
              <Text style={[styles.markerText, disabled && styles.disabledMarkers]}>
                {lowerLimit}
              </Text>
              <Text style={[styles.markerText, disabled && styles.disabledMarkers]}>
                {upperLimit}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Slider;
