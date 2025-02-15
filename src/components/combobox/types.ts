export type ComboboxOption<T = any> = {
  value: string;
  label: string;
  data?: T;
};

export type ComboboxProps<T> = {
  options: ComboboxOption<T>[];
  value?: ComboboxOption<T>[];
  onChange?: (options: ComboboxOption<T>[]) => void;
  async?: boolean;
  multiselect?: boolean;
  debounceMs?: number;
  loadOptions?: (query: string) => Promise<ComboboxOption<T>[]>;
  placeholder?: string;
};
