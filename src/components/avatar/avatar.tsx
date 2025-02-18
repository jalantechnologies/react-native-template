import React, { useState } from 'react';
import { View, Image, Text, StyleProp, ViewStyle } from 'react-native';
import { AVATAR_SIZE, DEFAULT_AVATAR_SHAPE } from './constants';
import type { AvatarProps, AvatarSize, AvatarShape } from './types';

const Avatar = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'medium',
  shape = DEFAULT_AVATAR_SHAPE,
  fallbackIcon,
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);
  const showFallback = !src || hasError;
  const sizeValue = AVATAR_SIZE[size];

  const containerStyle: StyleProp<ViewStyle> = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: shape === 'circle' ? sizeValue / 2 : 8,
    backgroundColor: '#e5e7eb', // bg-gray-200 equivalent
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const textStyle = {
    fontSize: sizeValue * 0.4,
    fontWeight: '500' as const,
    color: '#374151', // text-gray-700 equivalent
  };

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <View style={containerStyle} accessible accessibilityLabel={alt}>
      {!showFallback ? (
        <Image
          source={{ uri: src }}
          style={{ width: '100%', height: '100%' }}
          onError={handleImageError}
          accessibilityRole="image"
        />
      ) : (
        <View style={{ alignItems: 'center' }}>
          {initials ? <Text style={textStyle}>{initials}</Text> : fallbackIcon}
        </View>
      )}
    </View>
  );
};

export default Avatar;
