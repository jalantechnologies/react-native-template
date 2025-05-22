// Tag.tsx
import { Box, Text, Pressable, Icon } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTagStyles } from './tag.styles';

export enum TagVariant {
  OUTLINED = 'outlined',
  ELEVATED = 'elevated',
}

export interface TagProps {
  label: string;
  variant?: TagVariant;
  onDeleted?: () => void;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = TagVariant.ELEVATED,
  onDeleted,
  onClick,
}) => {
  const styles = useTagStyles();

  const variantStyle = variant === TagVariant.OUTLINED ? styles.outlined : styles.elevated;
  const textStyle =
    variant === TagVariant.OUTLINED ? styles.outlinedTextColor : styles.elevatedTextColor;

  const Container = onClick ? Pressable : Box;
  const containerProps = onClick ? { onPress: onClick } : {};

  return (
    <Container style={[styles.tag, variantStyle]} {...containerProps}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
      {onDeleted && (
        <Pressable onPress={onDeleted} style={styles.iconWrapper} hitSlop={8}>
          <Icon as={MaterialIcons} name="close" size={4} color={textStyle.color} />
        </Pressable>
      )}
    </Container>
  );
};

Tag.defaultProps = {
  variant: TagVariant.ELEVATED,
  onDeleted: undefined,
  onClick: undefined,
};

export default Tag;
