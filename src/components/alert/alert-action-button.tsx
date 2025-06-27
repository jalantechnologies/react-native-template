import React from 'react';

import Button from '../button/button';
import { AlertActionButtonProps } from '../../types';

export const AlertActionButton: React.FC<AlertActionButtonProps> = ({ label, type, onPress }) => {
  return (
    <Button onClick={onPress} kind={type}>
      {label}
    </Button>
  );
};
