import { PropsWithChildren } from 'react';

export type DropdownInputProps = PropsWithChildren<{
  disabled?: boolean;
  label?: string;
  onValueChange: (value: string) => void;
  selectedValue?: string;
}>;

export type DropdownOptionProps = PropsWithChildren<{
  value: string;
}>;
