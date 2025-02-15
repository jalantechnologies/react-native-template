import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { ComboboxInput } from '../src/components/combobox'; // Correct import path

describe('ComboboxInput Component', () => {
  const mockProps = {
    value: '',
    placeholder: 'Search...',
    isOpen: false,
    onFocus: jest.fn(),
    onChangeText: jest.fn(),
  };

  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(<ComboboxInput {...mockProps} />);
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('triggers onFocus when pressed', () => {
    const { getByPlaceholderText } = render(<ComboboxInput {...mockProps} />);
    fireEvent.press(getByPlaceholderText('Search...'));
    expect(mockProps.onFocus).toHaveBeenCalled();
  });

  it('updates input value', () => {
    const { getByDisplayValue } = render(<ComboboxInput {...mockProps} value="test" />);
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(<ComboboxInput {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
