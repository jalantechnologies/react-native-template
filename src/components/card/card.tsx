import { Box } from 'native-base';
import React, { PropsWithChildren } from 'react';

import CardActions from './card-action';
import CardActionArea from './card-action-area';
import CardContent from './card-content';
import CardHeader from './card-header';
import { useCardStyles } from './card.styles';

export enum CardVariant {
  FILLED = 'filled',
  OUTLINED = 'outlined',
}
export interface CardProps {
  variant?: CardVariant;
}

const CardComponent: React.FC<PropsWithChildren<CardProps>> = ({
  variant = CardVariant.FILLED,
  children,
}) => {
  const styles = useCardStyles();
  const variantStyle = variant === CardVariant.FILLED ? styles.filled : styles.outlined;
  return <Box style={[styles.cardBase, variantStyle]}>{children}</Box>;
};

CardComponent.defaultProps = {
  variant: CardVariant.FILLED,
};

const Card = CardComponent as typeof CardComponent & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Actions: typeof CardActions;
  ActionArea: typeof CardActionArea;
};
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Actions = CardActions;
Card.ActionArea = CardActionArea;

export default Card;
