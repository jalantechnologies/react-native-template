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

  const clamp = useCallback(
    (val: number, min: number, max: number) => Math.min(Math.max(val, min), max),
    [],
  );

  const calculatePositionFromValue = useCallback(
    (val: number) =>
      trackLength > 0 ? ((val - lowerLimit) / (upperLimit - lowerLimit)) * trackLength : 0,
    [trackLength, lowerLimit, upperLimit],
  );

  const calculateValueFromPosition = useCallback(
    (pos: number) =>
      trackLength > 0 ? lowerLimit + ((upperLimit - lowerLimit) * pos) / trackLength : lowerLimit,
    [trackLength, lowerLimit, upperLimit],
  );

  const applyStep = useCallback(
    (val: number) =>
      step > 0 ? clamp(Math.round(val / step) * step, lowerLimit, upperLimit) : val,
    [step, lowerLimit, upperLimit, clamp],
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

  const initialValue: number = typeof value === 'number' && !isRange ? value : lowerLimit;

  const [range, setRange] = useState<[number, number]>(initialRange);
  const [sliderValue, setSliderValue] = useState(initialValue);
  const [inputMin, setInputMin] = useState(isRange ? `${initialRange[0]}` : `${initialValue}`);
  const [inputMax, setInputMax] = useState(`${initialRange[1]}`);
  const [isSliding, setIsSliding] = useState(true);
  const [bubbleValue, setBubbleValue] = useState<number | null>(null);
  const [activeHandle, setActiveHandle] = useState<SliderHandle | null>(null);

  const rangeLeftPos = useRef(
    new Animated.Value(calculatePositionFromValue(initialRange[0])),
  ).current;
  const rangeRightPos = useRef(
    new Animated.Value(calculatePositionFromValue(initialRange[1])),
  ).current;
  const handlePosition = useRef(
    new Animated.Value(calculatePositionFromValue(initialValue)),
  ).current;

  const lastLeft = useRef(0);
  const lastRight = useRef(0);
  const lastPosition = useRef(0);

  useEffect(() => {
    if (trackLength > 0) {
      const left = calculatePositionFromValue(range[0]);
      const right = calculatePositionFromValue(range[1]);
      const pos = calculatePositionFromValue(sliderValue);

      rangeLeftPos.setValue(left);
      rangeRightPos.setValue(right);
      handlePosition.setValue(pos);

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
      const [left, right] = value;
      const [currLeft, currRight] = range;

      if (left !== currLeft || right !== currRight) {
        const lPos = calculatePositionFromValue(left);
        const rPos = calculatePositionFromValue(right);
        rangeLeftPos.setValue(lPos);
        rangeRightPos.setValue(rPos);
        lastLeft.current = lPos;
        lastRight.current = rPos;
        setRange([left, right]);
        setInputMin(`${left}`);
        setInputMax(`${right}`);
      }
    } else if (!isRange && typeof value === 'number') {
      if (value !== sliderValue) {
        const stepped = applyStep(value);
        const pos = calculatePositionFromValue(stepped);
        handlePosition.setValue(pos);
        lastPosition.current = pos;
        setSliderValue(stepped);
        setInputMin(`${stepped}`);
      }
    }
  }, [trackLength, isRange, value]);

  const handleSubmit = useCallback(
    (type: InputSubmitType) => {
      const input = type === InputSubmitType.MIN ? inputMin : inputMax;
      const parsed = parseFloat(input);
      if (isNaN(parsed)) {
        return;
      }
      const stepped = applyStep(parsed);

      if (isRange) {
        const clamped =
          type === InputSubmitType.MIN
            ? clamp(stepped, lowerLimit, range[1])
            : clamp(stepped, range[0], upperLimit);
        const newRange: [number, number] =
          type === InputSubmitType.MIN ? [clamped, range[1]] : [range[0], clamped];
        const pos = calculatePositionFromValue(clamped);
        if (type === InputSubmitType.MIN) {
          rangeLeftPos.setValue(pos);
          lastLeft.current = pos;
        } else {
          rangeRightPos.setValue(pos);
          lastRight.current = pos;
        }
        setRange(newRange);
        onValueChange?.(newRange);
      } else {
        const pos = calculatePositionFromValue(stepped);
        handlePosition.setValue(pos);
        lastPosition.current = pos;
        setSliderValue(stepped);
        setInputMin(`${stepped}`);
        onValueChange?.(stepped);
      }
    },
    [applyStep, inputMin, inputMax, isRange, range, lowerLimit, upperLimit],
  );

  const gestureStartX = useRef(0);
  const createPanResponder = (
    handleType: SliderHandle,
    handleRef: Animated.Value,
    lastRef: React.MutableRefObject<number>,
    getCurrentRange?: () => [number, number],
    updateRangeOrValue?: (val: number) => void,
  ) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        gestureStartX.current = lastRef.current;
        setIsSliding(true);
        setActiveHandle(handleType);
      },
      onPanResponderMove: (_, g) => {
        if (trackLength <= 0) {
          return;
        }
        let newPos = clamp(gestureStartX.current + g.dx, 0, trackLength);
        const stepped = applyStep(calculateValueFromPosition(newPos));
        newPos = calculatePositionFromValue(stepped);

        if (handleType === SliderHandle.LEFT && getCurrentRange) {
          const [, r] = getCurrentRange();
          if (stepped > r) {
            return;
          }
        }
        if (handleType === SliderHandle.RIGHT && getCurrentRange) {
          const [l] = getCurrentRange();
          if (stepped < l) {
            return;
          }
        }

        if (handleType === SliderHandle.LEFT || handleType === SliderHandle.SINGLE) {
          setInputMin('');
        }
        if (handleType === SliderHandle.RIGHT) {
          setInputMax('');
        }

        handleRef.setValue(newPos);
        updateRangeOrValue?.(stepped);
        setBubbleValue(stepped);
      },
      onPanResponderRelease: (_, g) => {
        if (trackLength <= 0) {
          return;
        }
        const finalValue = applyStep(
          calculateValueFromPosition(clamp(gestureStartX.current + g.dx, 0, trackLength)),
        );
        const finalPos = calculatePositionFromValue(finalValue);
        handleRef.setValue(finalPos);
        lastRef.current = finalPos;
        updateRangeOrValue?.(finalValue);
        setBubbleValue(null);
        setActiveHandle(null);
        setIsSliding(false);
      },
    });

  const singlePanResponder = useMemo(
    () =>
      createPanResponder(SliderHandle.SINGLE, handlePosition, lastPosition, undefined, stepped => {
        setSliderValue(stepped);
        onValueChange?.(stepped);
      }),
    [trackLength],
  );

  const leftPanResponder = useMemo(
    () =>
      createPanResponder(
        SliderHandle.LEFT,
        rangeLeftPos,
        lastLeft,
        () => range,
        stepped => {
          const updated: [number, number] = [stepped, range[1]];
          setRange(updated);
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
        () => range,
        stepped => {
          const updated: [number, number] = [range[0], stepped];
          setRange(updated);
          onValueChange?.(updated);
        },
      ),
    [trackLength],
  );

  const renderBubble = (handle: SliderHandle, position: Animated.Value, value: number | null) => {
    if (!isSliding || typeof value !== 'number' || activeHandle !== handle) {
      return null;
    }

    return (
      <Animated.View
        pointerEvents={'none'}
        style={[
          styles.valueLabelWrapper,
          {
            left: Animated.add(position, new Animated.Value(handleSize / 2 - handleSize * 1.6)),
            bottom: sizes['8'],
          },
        ]}
      >
        <View style={styles.valueLabel}>
          <Text style={styles.valueLabelText}>{value}</Text>
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

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.sliderWithInputRow}>
        <View style={{ flex: 1 }}>
          {showValueInput && (
            <View style={isRange && styles.inputRow}>
              <View style={styles.inputBox}>
                <Input
                  value={inputMin}
                  onChangeText={text => setInputMin(text)}
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
                    value={inputMax}
                    onChangeText={text => setInputMax(text)}
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
                {
                  left: isRange ? rangeLeftPos : 0,
                  width: isRange
                    ? Animated.subtract(rangeRightPos, rangeLeftPos)
                    : Animated.add(handlePosition, new Animated.Value(handleSize / 2)),
                },
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

            {renderBubble(SliderHandle.SINGLE, handlePosition, bubbleValue)}
            {renderBubble(SliderHandle.LEFT, rangeLeftPos, bubbleValue)}
            {renderBubble(SliderHandle.RIGHT, rangeRightPos, bubbleValue)}

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
                  { left: Animated.subtract(handlePosition, handleSize / 2) },
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
