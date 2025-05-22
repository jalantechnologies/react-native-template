import { Box } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { useCardStyles } from './card.styles';

export enum CardVariant {
  FILLED = 'filled',
  OUTLINED = 'outlined',
}
export interface CardProps {
  variant?: CardVariant;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  variant = CardVariant.FILLED,
  children,
}) => {
  const styles = useCardStyles();
  const variantStyle = variant === CardVariant.FILLED ? styles.filled : styles.outlined;
  return <Box style={[styles.cardBase, variantStyle]}>{children}</Box>;
};

Card.defaultProps = {
  variant: CardVariant.FILLED,
};

export default Card;
