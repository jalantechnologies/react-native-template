import { useTheme } from 'native-base';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, PanResponder, Animated, Dimensions } from 'react-native';

import { SliderProps } from '../../types/slider';
import { Input } from '../inputs';

import { useSliderStyles } from './slider.styles';

enum BubbleHandle {
  SINGLE = 'single',
  LEFT = 'left',
  RIGHT = 'right',
}

enum SubmitType {
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
  const screenWidth = Dimensions.get('window').width;
  const handleSize = Number(sizes['5']);
  const trackLength = screenWidth * 0.8 - handleSize / 2;

  const styles = useSliderStyles(trackLength);

  const calculatePositionFromValue = (val: number) =>
    ((val - lowerLimit) / (upperLimit - lowerLimit)) * trackLength;

  const calculateValueFromPosition = (pos: number) =>
    lowerLimit + ((upperLimit - lowerLimit) * pos) / trackLength;

  const applyStep = (val: number) => {
    if (step > 0) {
      const stepped = Math.round(val / step) * step;
      return Math.min(Math.max(stepped, lowerLimit), upperLimit);
    }
    return val;
  };

  const internalMarkers = (() => {
    if (!internalMarkerStep || internalMarkerStep <= 0) return [];
    const markers = [];
    for (let i = lowerLimit + internalMarkerStep; i < upperLimit; i += internalMarkerStep) {
      markers.push(i);
    }
    return markers;
  })();

  const initialRange: [number, number] =
    Array.isArray(value) && isRange ? value : [lowerLimit, upperLimit];

  const initialValue: number = typeof value === 'number' && !isRange ? value : lowerLimit;

  const [range, setRange] = useState<[number, number]>(initialRange);
  const [sliderValue, setSliderValue] = useState(initialValue);
  const [inputMin, setInputMin] = useState(isRange ? `${initialRange[0]}` : `${initialValue}`);
  const [inputMax, setInputMax] = useState(`${initialRange[1]}`);

  const [isSliding, setIsSliding] = useState(true);

  const [bubbleValue, setBubbleValue] = useState<number | null>(null);
  const [activeHandle, setActiveHandle] = useState<BubbleHandle | null>(null);

  const rangeLeftPos = useRef(
    new Animated.Value(calculatePositionFromValue(initialRange[0])),
  ).current;
  const rangeRightPos = useRef(
    new Animated.Value(calculatePositionFromValue(initialRange[1])),
  ).current;
  const lastLeft = useRef(calculatePositionFromValue(initialRange[0]));
  const lastRight = useRef(calculatePositionFromValue(initialRange[1]));

  const handlePosition = useRef(
    new Animated.Value(calculatePositionFromValue(initialValue)),
  ).current;
  const lastPosition = useRef(calculatePositionFromValue(initialValue));

  useEffect(() => {
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
  }, [isRange, value]);

  const handleSubmit = (type: SubmitType) => {
    const input = type === SubmitType.MIN ? inputMin : inputMax;
    const parsed = parseFloat(input);

    if (isNaN(parsed)) return;

    const stepped = applyStep(parsed);

    if (isRange) {
      const clamped =
        type === SubmitType.MIN
          ? Math.min(Math.max(stepped, lowerLimit), range[1])
          : Math.max(Math.min(stepped, upperLimit), range[0]);

      const newRange: [number, number] =
        type === SubmitType.MIN ? [clamped, range[1]] : [range[0], clamped];

      const pos = calculatePositionFromValue(clamped);

      if (type === SubmitType.MIN) {
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
  };

  const createPanResponder = (
    handleType: BubbleHandle,
    handleRef: Animated.Value,
    lastRef: React.MutableRefObject<number>,
    getCurrentRange?: () => [number, number],
    updateRangeOrValue?: (val: number) => void,
  ) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        setIsSliding(true);
        setActiveHandle(handleType);
      },
      onPanResponderMove: (_, gestureState) => {
        const delta = gestureState.dx * 0.3;
        let newPos = Math.max(0, Math.min(lastRef.current + delta, trackLength));
        const rawValue = calculateValueFromPosition(newPos);
        const stepped = applyStep(rawValue);
        newPos = calculatePositionFromValue(stepped);

        if (handleType === BubbleHandle.LEFT && getCurrentRange) {
          const [, right] = getCurrentRange();
          if (stepped > right) return;
        }
        if (handleType === BubbleHandle.RIGHT && getCurrentRange) {
          const [left] = getCurrentRange();
          if (stepped < left) return;
        }

        if ((handleType === BubbleHandle.LEFT || handleType === BubbleHandle.SINGLE) && inputMin) {
          setInputMin('');
        }
        if (handleType === BubbleHandle.RIGHT && inputMax) {
          setInputMax('');
        }

        handleRef.setValue(newPos);
        lastRef.current = newPos;
        updateRangeOrValue?.(stepped);
        setBubbleValue(stepped);
      },
      onPanResponderRelease: () => {
        setIsSliding(false);
        setActiveHandle(null);
        setBubbleValue(null);
      },
    });

  const singlePanResponder = useRef(
    createPanResponder(BubbleHandle.SINGLE, handlePosition, lastPosition, undefined, stepped => {
      setSliderValue(stepped);
      onValueChange?.(stepped);
    }),
  ).current;

  const leftPanResponder = useRef(
    createPanResponder(
      BubbleHandle.LEFT,
      rangeLeftPos,
      lastLeft,
      () => range,
      stepped => {
        const updated: [number, number] = [stepped, range[1]];
        setRange(updated);
        onValueChange?.(updated);
      },
    ),
  ).current;

  const rightPanResponder = useRef(
    createPanResponder(
      BubbleHandle.RIGHT,
      rangeRightPos,
      lastRight,
      () => range,
      stepped => {
        const updated: [number, number] = [range[0], stepped];
        setRange(updated);
        onValueChange?.(updated);
      },
    ),
  ).current;

  const renderBubble = (handle: BubbleHandle, position: Animated.Value, value: number | null) => {
    if (!isSliding || typeof value !== 'number' || activeHandle !== handle) return null;

    return (
      <Animated.View
        style={[
          styles.valueBubbleWrapper,
          {
            left: Animated.add(position, new Animated.Value(handleSize / 2 - handleSize * 1.6)),
            bottom: sizes['8'],
          },
        ]}
      >
        <View style={styles.valueBubble}>
          <Text style={styles.bubbleText}>{value}</Text>
          <View style={styles.pointer} />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderWithInputRow}>
        <View style={{ flex: 1 }}>
          {showValueInput && (
            <View style={isRange && styles.inputRow}>
              <View style={[styles.inputBox, { minWidth: trackLength * 0.2 }]}>
                <Input
                  value={inputMin}
                  onChangeText={text => setInputMin(text)}
                  onSubmitEditing={() => handleSubmit(SubmitType.MIN)}
                  placeholder={`${lowerLimit}`}
                  keyboardType="numeric"
                  disabled={disabled}
                  textAlign='center'
                  numberOfLines={1}
                  multiline={true}
                />
              </View>
              {isRange && (
                <View style={{ minWidth: trackLength * 0.2 }}>
                  <Input
                    value={inputMax}
                    onChangeText={text => setInputMax(text)}
                    onSubmitEditing={() => handleSubmit(SubmitType.MAX)}
                    placeholder={`${upperLimit}`}
                    keyboardType="numeric"
                    disabled={disabled}
                    textAlign='center'
                  />
                </View>
              )}
            </View>
          )}

          <View style={[styles.horizontalTrack, disabled && styles.disabledTrack]}>
            <Animated.View
              style={[
                styles.filledTrack,
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

            {renderBubble(BubbleHandle.SINGLE, handlePosition, bubbleValue)}
            {renderBubble(BubbleHandle.LEFT, rangeLeftPos, bubbleValue)}
            {renderBubble(BubbleHandle.RIGHT, rangeRightPos, bubbleValue)}

            {isRange ? (
              <>
                <Animated.View
                  style={[
                    styles.handle,
                    disabled && styles.disabledHandle,
                    { left: Animated.subtract(rangeLeftPos, handleSize / 2) },
                  ]}
                  {...leftPanResponder.panHandlers}
                />
                <Animated.View
                  style={[
                    styles.handle,
                    disabled && styles.disabledHandle,
                    { left: Animated.subtract(rangeRightPos, handleSize / 2) },
                  ]}
                  {...rightPanResponder.panHandlers}
                />
              </>
            ) : (
              <Animated.View
                style={[
                  styles.handle,
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
