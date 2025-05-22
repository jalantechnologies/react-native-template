import { AvatarShape, AvatarSize } from 'boilerplate-react-native/src/types';
import { Box, Text, Image } from 'native-base';
import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { useAvatarStyles } from './avatar.styles';
export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  fallbackIcon?: React.ReactNode;
  testID?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = AvatarSize.medium,
  shape = AvatarShape.circle,
  fallbackIcon,
  testID,
}) => {
  const styles = useAvatarStyles();

  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const containerStyles: StyleProp<ViewStyle>[] = [
    styles.container,
    styles[`size${capitalize(size)}` as keyof typeof styles],
    shape === 'circle' ? styles[`circle${capitalize(size)}` as keyof typeof styles] : styles.square,
  ];

  return (
    <Box style={containerStyles} testID={testID}>
      {src && !hasError ? (
        <Image
          source={{ uri: src }}
          alt={alt}
          onError={handleError}
          style={styles.image}
          accessibilityLabel={alt}
          accessibilityRole="image"
        />
      ) : initials ? (
        <Text
          style={[styles.initialsText, styles[`text${capitalize(size)}` as keyof typeof styles]]}
        >
          {initials}
        </Text>
      ) : (
        <Box style={styles.iconWrapper}>{fallbackIcon}</Box>
      )}
    </Box>
  );
};

Avatar.defaultProps = {
  size: AvatarSize.medium,
  shape: AvatarShape.circle,
  fallbackIcon: <Text>?</Text>,
  src: undefined,
  alt: undefined,
  initials: undefined,
  testID: undefined,
};

export default Avatar;
