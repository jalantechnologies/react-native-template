import React from 'react';

import { AlertActionButtonProps, ButtonKind } from '../../types';
import Button from '../button/button';

type NonLinkButtonKind = Exclude<ButtonKind, ButtonKind.LINK>;

export const AlertActionButton: React.FC<AlertActionButtonProps> = ({
  label,
  type,
  onPress,
  color,
}) => {
  return (
    <Button onClick={onPress} kind={type as NonLinkButtonKind} color={color}>
      {label}
    </Button>
  );
};
