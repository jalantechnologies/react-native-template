import React, { ReactNode } from 'react';

// Props for the reusable DropdownInput component.
export interface DropdownInputProps {
  // Dropdown options as children components (DropdownInput.Option)
  children: React.ReactElement<DropdownOptionProps>[];
  disabled?: boolean;
  label?: string; // Label displayed above the dropdown
  onValueChange: (value: string) => void;   // Called when an option is selected
  selectedValue?: ReactNode;
}

// Props for each individual dropdown option.
export interface DropdownOptionProps {
  children: ReactNode;
  value: string;
}
