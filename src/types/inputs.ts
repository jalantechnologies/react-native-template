import React, { ReactNode } from 'react';

export interface DropdownInputProps {
  // Children are used to pass the dropdown options using <DropdownInput.Option> components
  children: React.ReactElement<DropdownOptionProps>[];
  disabled?: boolean;
  label?: string;
  onValueChange: (value: string) => void;
  selectedValue?: ReactNode;
}

export interface DropdownOptionProps {
  children: ReactNode;
  value: string;
}
