import { Image } from 'native-base';
import React from 'react';

import { useCardStyles } from './card.styles';

export interface CardMediaProps {
  imageSrc: string;
  height?: number;
}
export const CardMedia: React.FC<CardMediaProps> = ({ imageSrc, height }) => {
  const styles = useCardStyles();

  return (
    <Image
      source={{ uri: imageSrc }}
      alt="Card media"
      style={[{ height: height ?? 150 }, styles.media]}
    />
  );
};

CardMedia.defaultProps = {
  height: 150,
};

export default CardMedia;
