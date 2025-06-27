import React from 'react';

import { AlertActionButtonProps } from '../../types';
import Button from '../button/button';

export const AlertActionButton: React.FC<AlertActionButtonProps> = ({ label, type, onPress }) => {
  return (
    <Button onClick={onPress} kind={type}>
      {label}
    </Button>
  );
};
