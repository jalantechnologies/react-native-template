import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import type { TagProps } from './types';

/**
 * Tag Component - Displays a label-like element, typically used for categories or statuses.
 *
 * Example usage:
 * <Tag variant="primary" shape="pill" onRemove={() => console.log('Remove Tag')}>
 *   Tag Label
 * </Tag>
 */
const Tag: React.FC<TagProps> = ({ variant = 'primary', shape = 'pill', onRemove, children }) => {
  return (
    <View>
      <Text>{children}</Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove}>
          <Text>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Tag;
