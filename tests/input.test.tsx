import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';

import { Input } from '../src/components/input-fields';

describe('Input Component', () => {
  test('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('renders with different sizes', () => {
    const { getByPlaceholderText, rerender } = render(
      <Input placeholder="Size Test" size="small" />,
    );
    expect(getByPlaceholderText('Size Test')).toBeTruthy();

    rerender(<Input placeholder="Size Test" size="medium" />);
    expect(getByPlaceholderText('Size Test')).toBeTruthy();

    rerender(<Input placeholder="Size Test" size="large" />);
    expect(getByPlaceholderText('Size Test')).toBeTruthy();
  });

  test('renders with different variants', () => {
    const { getByPlaceholderText, rerender } = render(
      <Input placeholder="Variant Test" variant="filled" />,
    );
    expect(getByPlaceholderText('Variant Test')).toBeTruthy();

    rerender(<Input placeholder="Variant Test" variant="outlined" />);
    expect(getByPlaceholderText('Variant Test')).toBeTruthy();

    rerender(<Input placeholder="Variant Test" variant="standard" />);
    expect(getByPlaceholderText('Variant Test')).toBeTruthy();
  });

  test('handles input text correctly', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" onChangeText={mockOnChangeText} />,
    );

    const input = getByPlaceholderText('Type here');
    fireEvent.changeText(input, 'Hello');
    expect(mockOnChangeText).toHaveBeenCalledWith('Hello');
  });

  test('disables input when isDisabled is true', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Disabled Input" isDisabled />);
    const input = getByPlaceholderText('Disabled Input');

    expect(input.props.editable).toBe(false);
  });

  test('renders with start and end icons', () => {
    const StartIcon = () => <View testID="start-icon" />;
    const EndIcon = () => <View testID="end-icon" />;

    const { getByTestId } = render(
      <Input placeholder="With Icons" startIcon={<StartIcon />} endIcon={<EndIcon />} />,
    );

    expect(getByTestId('start-icon')).toBeTruthy();
    expect(getByTestId('end-icon')).toBeTruthy();
  });
});
