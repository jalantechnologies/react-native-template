import React, { ReactNode } from 'react';

export interface DropdownInputProps {
  // Only allows DropdownInput.Option as children
  children: React.ReactElement<DropdownOptionProps>[];
  disabled?: boolean;
  label?: string;
  onValueChange: (value: string) => void;
  selectedValue?: string;
}

export interface DropdownOptionProps {
  children: ReactNode;
  value: string;
}
