import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

import { styles } from './flex.styles';
const alignItemsMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch',
} as const;

const justifyContentMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
} as const;

const directionMap = {
  row: 'row',
  column: 'column',
} as const;

const flexWrapMap = {
  nowrap: 'nowrap',
  wrap: 'wrap',
  wrapReverse: 'wrap-reverse',
} as const;

type AlignItems = keyof typeof alignItemsMap;
type JustifyContent = keyof typeof justifyContentMap;
type Direction = keyof typeof directionMap;
type FlexWrap = keyof typeof flexWrapMap;

interface FlexProps {
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  direction?: Direction;
  flexWrap?: FlexWrap;
  gap?: number;
}

const Flex: React.FC<PropsWithChildren<FlexProps>> = ({
  alignItems = 'start',
  justifyContent = 'start',
  direction = 'row',
  flexWrap = 'nowrap',
  gap = 0,
  children,
}) => {
  // Base flex style
  const style: ViewStyle = {
    flexDirection: directionMap[direction],
    alignItems: alignItemsMap[alignItems],
    justifyContent: justifyContentMap[justifyContent],
    flexWrap: flexWrapMap[flexWrap],
  };

  const childStyle: ViewStyle = gap ? { margin: gap / 2 } : {};

  return (
    <View style={[styles.container, style, gap ? { margin: -(gap / 2) } : undefined]}>
      {React.Children.map(children, child => (
        <View style={childStyle}>{child}</View>
      ))}
    </View>
  );
};

Flex.defaultProps = {
  alignItems: 'start',
  justifyContent: 'start',
  direction: 'row',
  flexWrap: 'nowrap',
  gap: 0,
};

export default Flex;
