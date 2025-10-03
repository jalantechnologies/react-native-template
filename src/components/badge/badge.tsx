import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

import { BadgeColor, BadgeProps, BadgeSize, BadgeType } from '../../types';

import { useBadgeStyles, useColorStyles, useSizeStyles } from './badge.styles';

const Badge: React.FC<BadgeProps> = ({
  label,
  type = BadgeType.SOLID,
  color = BadgeColor.PRIMARY,
  size = BadgeSize.MEDIUM,
  startEnhancer,
  endEnhancer,
}) => {
  const colorStyles = useColorStyles(type);
  const sizeStyles = useSizeStyles();
  const styles = useBadgeStyles();

  const colorStyle = colorStyles[color];
  const sizeStyle = sizeStyles[size];

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    type === BadgeType.SOLID && colorStyle.solid,
    type === BadgeType.LIGHT && colorStyle.light,
    type === BadgeType.TEXT && { backgroundColor: 'transparent' },
  ];

  const textColorStyle: StyleProp<TextStyle> =
    type === BadgeType.LIGHT || type === BadgeType.TEXT ? colorStyle.text : { color: 'white' };

  const renderEnhancer = (enhancer?: React.ReactNode) => {
    if (!enhancer) {
      return null;
    }

    if (typeof enhancer === 'string' || typeof enhancer === 'number') {
      return <Text style={[styles.label, sizeStyle.text, textColorStyle]}>{enhancer}</Text>;
    }

    return React.cloneElement(enhancer as React.ReactElement, {
      color: (textColorStyle as TextStyle).color,
      size: sizeStyle.text.fontSize,
    });
  };

  return (
    <View style={containerStyles}>
      <View style={[styles.content, type !== BadgeType.TEXT && sizeStyle.base]}>
        {startEnhancer && <View style={styles.enhancer}>{renderEnhancer(startEnhancer)}</View>}
        <Text style={[styles.label, sizeStyle.text, colorStyle.text]}>{label}</Text>
        {endEnhancer && <View style={styles.enhancer}>{renderEnhancer(endEnhancer)}</View>}
      </View>
    </View>
  );
};

export default Badge;
