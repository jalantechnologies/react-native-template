// Tag.tsx
import { Box, Text, Pressable } from 'native-base';
import React from 'react';
import Close from 'react-native-template/assets/icons/close.svg';

import { useTagStyles } from './tag.styles';

export enum TagVariant {
  OUTLINED = 'outlined',
  FILLED = 'filled',
}

export interface TagProps {
  label: string;
  variant?: TagVariant;
  onDeleted?: () => void;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = TagVariant.FILLED,
  onDeleted,
  onClick,
}) => {
  const styles = useTagStyles();

  const variantStyle = variant === TagVariant.OUTLINED ? styles.outlined : styles.filled;
  const textStyle =
    variant === TagVariant.OUTLINED ? styles.outlinedTextColor : styles.filledTextColor;

  if (onClick) {
    return (
      <Pressable onPress={onClick} style={[styles.tag, variantStyle] as any}>
        <Text style={[styles.text, textStyle]}>{label}</Text>
        {onDeleted && (
          <Pressable onPress={onDeleted} style={styles.iconWrapper} hitSlop={8}>
            <Close width={16} height={16} fill={textStyle.color} />
          </Pressable>
        )}
      </Pressable>
    );
  }

  return (
    <Box style={[styles.tag, variantStyle] as any}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
      {onDeleted && (
        <Pressable onPress={onDeleted} style={styles.iconWrapper} hitSlop={8}>
          <Close width={16} height={16} fill={textStyle.color} />
        </Pressable>
      )}
    </Box>
  );
};

Tag.defaultProps = {
  variant: TagVariant.FILLED,
  onDeleted: undefined,
  onClick: undefined,
};

export default Tag;
