// src/components/Combobox/hooks/useCombobox.ts
import { useReducer, useCallback } from 'react';

import { ComboboxOption, ComboboxProps } from '../types';

type State = {
  isOpen: boolean;
  inputValue: string;
  selectedOptions: ComboboxOption[];
  options: ComboboxOption[];
  loading: boolean;
  error: Error | null;
};

type Action =
  | { type: 'SET_OPTIONS'; payload: ComboboxOption[] }
  | { type: 'SET_SELECTED'; payload: ComboboxOption[] }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'TOGGLE_OPEN' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error | null };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_OPTIONS':
      return { ...state, options: action.payload };
    case 'SET_SELECTED':
      return { ...state, selectedOptions: action.payload };
    case 'SET_INPUT':
      return { ...state, inputValue: action.payload };
    case 'TOGGLE_OPEN':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const useCombobox = <T>(props: ComboboxProps<T>) => {
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    inputValue: '',
    selectedOptions: [],
    options: props.options,
    loading: false,
    error: null,
  });

  const handleSelect = useCallback(
    (option: ComboboxOption) => {
      if (props.multiselect) {
        const exists = state.selectedOptions.some(o => o.value === option.value);
        const newSelected = exists
          ? state.selectedOptions.filter(o => o.value !== option.value)
          : [...state.selectedOptions, option];
        dispatch({ type: 'SET_SELECTED', payload: newSelected });
        props.onChange?.(newSelected);
      } else {
        dispatch({ type: 'SET_SELECTED', payload: [option] });
        dispatch({ type: 'SET_INPUT', payload: option.label });
        dispatch({ type: 'TOGGLE_OPEN' });
        props.onChange?.([option]);
      }
    },
    [props.multiselect, state.selectedOptions],
  );

  return {
    state,
    dispatch,
    handleSelect,
  };
};
