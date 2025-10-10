import { useTheme } from 'native-base';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, PanResponder, Animated, LayoutChangeEvent } from 'react-native';

import { SliderProps } from '../../types/slider';
import { Input } from '../inputs';

import { useSliderStyles } from './slider.styles';

enum SliderHandle {
  SINGLE = 'single',
  LEFT = 'left',
  RIGHT = 'right',
}

enum InputSubmitType {
  MIN = 'min',
  MAX = 'max',
}

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
  const handleSize = Number(sizes['5']);
  const [trackLength, setTrackLength] = useState(0);

  const styles = useSliderStyles();

  const clampValueWithinLimits = useCallback(
    (val: number, min: number, max: number) => Math.min(Math.max(val, min), max),
    [],
  );

  const convertValueToSliderPosition = useCallback(
    (val: number) =>
      trackLength > 0 ? ((val - lowerLimit) / (upperLimit - lowerLimit)) * trackLength : 0,
    [trackLength, lowerLimit, upperLimit],
  );

  const convertSliderPositionToValue = useCallback(
    (pos: number) =>
      trackLength > 0 ? lowerLimit + ((upperLimit - lowerLimit) * pos) / trackLength : lowerLimit,
    [trackLength, lowerLimit, upperLimit],
  );

  const applyStepAndClamp = useCallback(
    (val: number) =>
      step > 0 ? clampValueWithinLimits(Math.round(val / step) * step, lowerLimit, upperLimit) : val,
    [step, lowerLimit, upperLimit, clampValueWithinLimits],
  );

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

  const initialRange: [number, number] =
    Array.isArray(value) && isRange ? value : [lowerLimit, upperLimit];
  const initialVal: number = typeof value === 'number' && !isRange ? value : lowerLimit;

  const [rangeSliderValues, setRangeSliderValue] = useState<[number, number]>(initialRange);
  const [singleSliderValue, setSingleSliderValue] = useState(initialVal);
  const [minInputValue, setMinInputValue] = useState(isRange ? `${initialRange[0]}` : `${initialVal}`);
  const [maxInputValue, setMaxInputValue] = useState(`${initialRange[1]}`);
  const [isSliding, setIsSliding] = useState(true);
  const [activeBubbleValue, setActiveBubbleValue] = useState<number | null>(null);
  const [activeHandle, setActiveHandle] = useState<SliderHandle | null>(null);

  const rangeLeftPos = useRef(
    new Animated.Value(convertValueToSliderPosition(initialRange[0])),
  ).current;
  const rangeRightPos = useRef(
    new Animated.Value(convertValueToSliderPosition(initialRange[1])),
  ).current;
  const singleHandlePosition = useRef(new Animated.Value(convertValueToSliderPosition(initialVal))).current;

  const lastLeft = useRef(0);
  const lastRight = useRef(0);
  const lastPosition = useRef(0);

  const flexContainerStyle = { flex: 1 };

  useEffect(() => {
    if (trackLength > 0) {
      const left = convertValueToSliderPosition(rangeSliderValues[0]);
      const right = convertValueToSliderPosition(rangeSliderValues[1]);
      const pos = convertValueToSliderPosition(singleSliderValue);

      rangeLeftPos.setValue(left);
      rangeRightPos.setValue(right);
      singleHandlePosition.setValue(pos);

      lastLeft.current = left;
      lastRight.current = right;
      lastPosition.current = pos;
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
        lastLeft.current = lPos;
        lastRight.current = rPos;
        setRangeSliderValue([leftVal, rightVal]);
        setMinInputValue(`${leftVal}`);
        setMaxInputValue(`${rightVal}`);
      }
    } else if (!isRange && typeof value === 'number') {
      if (value !== singleSliderValue) {
        const stepped = applyStepAndClamp(value);
        const pos = convertValueToSliderPosition(stepped);
        singleHandlePosition.setValue(pos);
        lastPosition.current = pos;
        setSingleSliderValue(stepped);
        setMinInputValue(`${stepped}`);
      }
    }
  }, [trackLength, isRange, value]);

  const handleSubmit = useCallback(
    (type: InputSubmitType) => {
      const inputValue = type === InputSubmitType.MIN ? minInputValue : maxInputValue;
      const parsed = parseFloat(inputValue);
      if (isNaN(parsed)) {
        return;
      }

      const steppedVal = applyStepAndClamp(parsed);

      if (isRange) {
        const clamped =
          type === InputSubmitType.MIN
            ? clampValueWithinLimits(steppedVal, lowerLimit, rangeSliderValues[1])
            : clampValueWithinLimits(steppedVal, rangeSliderValues[0], upperLimit);
        const newRange: [number, number] =
          type === InputSubmitType.MIN ? [clamped, rangeSliderValues[1]] : [rangeSliderValues[0], clamped];
        const pos = convertValueToSliderPosition(clamped);
        if (type === InputSubmitType.MIN) {
          rangeLeftPos.setValue(pos);
          lastLeft.current = pos;
        } else {
          rangeRightPos.setValue(pos);
          lastRight.current = pos;
        }
        setRangeSliderValue(newRange);
        onValueChange?.(newRange);
      } else {
        const pos = convertValueToSliderPosition(steppedVal);
        singleHandlePosition.setValue(pos);
        lastPosition.current = pos;
        setSingleSliderValue(steppedVal);
        setMinInputValue(`${steppedVal}`);
        onValueChange?.(steppedVal);
      }
    },
    [applyStepAndClamp, minInputValue, maxInputValue, isRange, rangeSliderValues, lowerLimit, upperLimit],
  );

  const gestureStartPositionX = useRef(0);
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
          convertSliderPositionToValue(clampValueWithinLimits(gestureStartPositionX.current + g.dx, 0, trackLength)),
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
      createPanResponder(SliderHandle.SINGLE, singleHandlePosition, lastPosition, undefined, val => {
        setSingleSliderValue(val);
        onValueChange?.(val);
      }),
    [trackLength],
  );

  const leftPanResponder = useMemo(
    () =>
      createPanResponder(
        SliderHandle.LEFT,
        rangeLeftPos,
        lastLeft,
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
        lastRight,
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

    const bubbleLeft = Animated.add(
      position,
      new Animated.Value(handleSize / 2 - handleSize * 1.6),
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

  const filledLineLeft = isRange ? rangeLeftPos : singleHandlePosition;
  const filledLineWidth = isRange
    ? Animated.subtract(rangeRightPos, rangeLeftPos)
    : Animated.add(singleHandlePosition, new Animated.Value(handleSize / 2));

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
                    { left: Animated.subtract(rangeLeftPos, handleSize / 2) },
                  ]}
                  {...leftPanResponder.panHandlers}
                />
                <Animated.View
                  style={[
                    styles.sliderHandle,
                    disabled && styles.disabledHandle,
                    { left: Animated.subtract(rangeRightPos, handleSize / 2) },
                  ]}
                  {...rightPanResponder.panHandlers}
                />
              </>
            ) : (
              <Animated.View
                style={[
                  styles.sliderHandle,
                  disabled && styles.disabledHandle,
                  { left: Animated.subtract(singleHandlePosition, handleSize / 2) },
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
