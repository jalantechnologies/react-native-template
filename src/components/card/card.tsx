import { Box } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { useCardStyles } from './card.styles';

export enum CardVariant {
  Elevated = 'elevated',
  Outlined = 'outlined',
}
export interface CardProps {
  variant?: CardVariant;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  variant = CardVariant.Elevated,
  children,
}) => {
  const styles = useCardStyles();
  const variantStyle = variant === CardVariant.Elevated ? styles.elevated : styles.outlined;
  return <Box style={[styles.cardBase, variantStyle]}>{children}</Box>;
};

Card.defaultProps = {
  variant: CardVariant.Elevated,
};

export default Card;
