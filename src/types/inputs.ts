import { ReactNode } from "react";

export enum InputStatus {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface DropdownInputProps {
  children: React.ReactElement<DropdownOptionProps>[];
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  onValueChange: (value: string) => void;
  status?: InputStatus;
  successMessage?: string;
  value?: ReactNode;
}

export interface DropdownOptionProps {
  children: ReactNode;
  value: string;
}
