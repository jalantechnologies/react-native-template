import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

const alignSelfMap = {
  auto: 'auto',
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

const flexMap: Record<string, number> = {
  flexNone: 0,
  flexInitial: 0,
  flexAuto: 1,
  flexOne: 1,
};

const orderMap: Record<string, number> = {
  none: 0,
  first: 1,
  last: -1,
};

interface FlexItemProps {
  alignSelf?: keyof typeof alignSelfMap;
  flex?: keyof typeof flexMap;
  justifySelf?: string;
  order?: keyof typeof orderMap;
}

const FlexItem: React.FC<PropsWithChildren<FlexItemProps>> = ({
  alignSelf = 'auto',
  flex = 'flexAuto',
  order = 'none',
  children,
}) => {
  const style: ViewStyle = {
    alignSelf: alignSelfMap[alignSelf],
    flex: flexMap[flex],
    zIndex: orderMap[order],
  };

  return <View style={style}>{children}</View>;
};

FlexItem.defaultProps = {
  alignSelf: 'auto',
  flex: 'flexAuto',
  order: 'none',
  justifySelf: undefined,
};

export default FlexItem;
